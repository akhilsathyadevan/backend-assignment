import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ReturnRequestDto {
  @IsMongoId()
  @IsNotEmpty()
  requestId: string;
}