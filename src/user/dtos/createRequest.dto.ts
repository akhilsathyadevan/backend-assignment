import { IsMongoId, IsNotEmpty, IsDateString, IsEnum, IsOptional } from 'class-validator';

export class CreateRequestDto {
  @IsMongoId()
  @IsNotEmpty()
  requestFrom: string;

  @IsMongoId()
  @IsNotEmpty()
  requestingDepartment: string;

  @IsMongoId()
  @IsOptional()
  assignedTo?: string;

  @IsDateString()
  @IsOptional()
  assignedTime?: string;

  @IsEnum(['Forwarded', 'returned', 'Completed', 'Pending'])
  @IsOptional()
  requestStatus?: string;
}
