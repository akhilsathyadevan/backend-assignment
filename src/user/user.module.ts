import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.model';
import { RequestSchema } from './model/request.model';
import { Department, DepartmentSchema } from './model/depratment.model';
import { Designation, DesignationSchema } from './model/designation.model';

@Module({
  imports:[MongooseModule.forFeature(
    [
      {name: User.name, schema:UserSchema},
      {name: Request.name, schema:RequestSchema},
      {name: Department.name, schema:DepartmentSchema},
      {name: Designation.name, schema:DesignationSchema}
    ]
  )],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
