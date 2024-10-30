import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  departmentName: string;

  @IsMongoId()
  @IsNotEmpty()
  departmentHeadId: string;
}
