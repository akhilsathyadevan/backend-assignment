import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class GetRequestDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsOptional()
  userRole: string;
}