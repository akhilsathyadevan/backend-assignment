import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Designation extends Document {
  @Prop({ required: true, unique: true })
  designationName: string;
}

export const DesignationSchema = SchemaFactory.createForClass(Designation);
