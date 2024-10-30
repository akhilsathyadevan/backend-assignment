import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Department extends Document {
  @Prop({ required: true, unique: true })
  departmentName: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  departmentHeadId: Types.ObjectId;

}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
