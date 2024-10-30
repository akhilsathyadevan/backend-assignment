import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class AssignRequestDto {
  @IsMongoId()
  @IsNotEmpty()
  requestId: string;

  @IsMongoId()
  @IsNotEmpty()
  assignToId: string;
}