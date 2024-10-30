import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Department } from './model/depratment.model';
import { Model, Types } from 'mongoose';
import { User } from './model/user.model';
import { CreateUserDto } from './dtos/createUser.dto';
import { Designation } from './model/designation.model';
import { CreateDesignationDto } from './dtos/createDesignation.dto';
import { CreateRequestDto } from './dtos/createRequest.dto';
import { Status } from './enums/status.enum';
import { CreateDepartmentDto } from './dtos/createDepartment.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Department.name) private departmentModel: Model<Department>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Request.name) private requestModel: Model<Request>,
    @InjectModel(Designation.name) private designationModel: Model<Designation>
  ) { }

  async createDepartment(departmentData: CreateDepartmentDto) {
    return await this.departmentModel.create(departmentData);
  }

  async createUserData(createUserData: CreateUserDto) {
    return await this.userModel.create(createUserData);
  }

  async createRequest(requestData: CreateRequestDto) {
    const departmentHead = await this.departmentModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(requestData.requestingDepartment) },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'departmentHeadId',
          foreignField: '_id',
          as: 'departmentHeadInfo',
        },
      },
      {
        $unwind: '$departmentHeadInfo',
      },
      {
        $project: {
          _id: 0,
          departmentHeadId: '$departmentHeadInfo._id',
        },
      },
    ]);

    if (!departmentHead.length) {
      throw new Error('Department head not found for the specified department');
    }

    const request = await this.requestModel.create({
      ...requestData,
      requestFrom: new Types.ObjectId(requestData.requestFrom),
      requestingDepartment: new Types.ObjectId(requestData.requestingDepartment),
      assignedTo: departmentHead[0].departmentHeadId,
      assignedTime: new Date(),
    });

    return request;
  }

  async createDesignation(createDesignationData: CreateDesignationDto) {
    return await this.designationModel.create(createDesignationData);
  }

  async assignRequestbyDptHead(requestId: string, assignToId: string) {
    console.log(requestId, assignToId);

    const requestData = await this.requestModel.updateOne(
      { _id: new Types.ObjectId(requestId) },
      { $set: { assignTo: new Types.ObjectId(assignToId) }, assignedTime: new Date(), requestStatus: Status.Forwarded }
    )
    console.log(requestData);

    return requestData ?
      await this.requestModel.find({ _id: new Types.ObjectId(requestId) }) : 'assigning failed';


  }

  async returnRequestToHead(requestId: string) {
    if (!Types.ObjectId.isValid(requestId)) {
      throw new Error('Invalid requestId format');
    }
    const request = await this.requestModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(requestId) },
      },
      {
        $lookup: {
          from: 'departments',
          localField: 'requestingDepartment',
          foreignField: '_id',
          as: 'departmentInfo',
        },
      },
      { $unwind: '$departmentInfo' },
      {
        $project: {
          _id: 0,
          assignedTime: 1,
          departmentHeadId: '$departmentInfo.departmentHeadId',
        },
      },
    ]);

    if (!request.length) {
      throw new Error('Department head not found for the specified department');
    }
    const updatedTime = new Date();

    const timeTaken = request[0].assignedTime ? (updatedTime.getTime() - new Date(request[0].assignedTime).getTime()) / (1000 * 60) : null;
    console.log(timeTaken.toFixed(2));

    const departmentHeadId = request[0].departmentHeadId;
    const updatedRequest = await this.requestModel.updateOne(
      { _id: new Types.ObjectId(requestId) },
      {
        $set: {
          requestStatus: 'Returned',
          assignedTo: departmentHeadId,
          timeTaken: `${timeTaken.toFixed(2)}-minutes`
        }
      },
      { new: true },
    );

    return updatedRequest;
  }


  async listAllRequests(userId: string, userRole: string) {
    const matchStage = userRole === 'Admin'
      ? {} 
      : { assignedTo: new Types.ObjectId(userId) }; 

    const requests = await this.requestModel.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: 'departments',
          localField: 'requestingDepartment',
          foreignField: '_id',
          as: 'departmentInfo',
        },
      },
      { $unwind: '$departmentInfo' },
      {
        $lookup: {
          from: 'users',
          localField: 'assignedTo',
          foreignField: '_id',
          as: 'assignedUserInfo',
        },
      },
      { $unwind: '$assignedUserInfo' },
      {
        $project: {
          requestFrom: 1,
          requestingDepartment: 1,
          assignedTo: 1,
          assignedTime: 1,
          requestStatus: 1,
          'departmentInfo.departmentName': 1,
          'assignedUserInfo.username': 1,
        },
      },
    ]).exec();

    return requests;
  }


}
