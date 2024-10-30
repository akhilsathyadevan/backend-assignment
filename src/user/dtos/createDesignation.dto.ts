import { IsMongoId, IsNotEmpty, IsDateString, IsEnum, IsString } from 'class-validator';

export class CreateDesignationDto {
  @IsString()
  @IsNotEmpty()
  designationName: string;
}
