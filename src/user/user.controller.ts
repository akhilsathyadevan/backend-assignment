import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { CreateDesignationDto } from './dtos/createDesignation.dto';
import { CreateRequestDto } from './dtos/createRequest.dto';
import { AssignRequestDto } from './dtos/assign-request.dto';
import { ReturnRequestDto } from './dtos/return-request.dto';
import { GetRequestDto } from './dtos/getRequestDto';
import { CreateDepartmentDto } from './dtos/createDepartment.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    @Post('/create-department')
    async createDepartment(@Body() departmentData: CreateDepartmentDto){
        return this.userService.createDepartment(departmentData);
    }

    @Post('/create-user')
    async createUser(@Body() userData: CreateUserDto){
        return this.userService.createUserData(userData);
    }

    @Post('/create-request')
    async createRequest(@Body() requestData: CreateRequestDto){
        return this.userService.createRequest(requestData);
    }

    @Post('/create-designation')
    async createDesignation(@Body() designationData: CreateDesignationDto){
        return this.userService.createDesignation(designationData);
    }

    @Post('/assign-request')
    async assignRequest(@Body() reqData: AssignRequestDto){
        return this.userService.assignRequestbyDptHead(reqData.requestId, reqData.assignToId);
    }

    @Post('/return-request')
    async returnRequest(@Body() requesData: ReturnRequestDto){
        return this.userService.returnRequestToHead(requesData.requestId);
    }

    @Post('/list-all')
    async getRequestByRole(@Body() reqData: GetRequestDto){
        return this.userService.listAllRequests(reqData.userId, reqData.userRole)
       
    }

}
