import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Request extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  requestFrom: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Department', required: true })
  requestingDepartment: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  assignedTo?: Types.ObjectId;

  @Prop({ type: Date, required: true })
  assignedTime?: Date;

  @Prop({ type: String })
  timeTaken?: string;

  @Prop({ type: String, enum: ['Forwarded', 'Returned', 'Completed', 'Pending'], default: 'Pending' })
  requestStatus?: string;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
