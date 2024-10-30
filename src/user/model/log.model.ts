// log.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Log extends Document {
  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  statusCode: number;

  @Prop({ type: Object }) 
  requestBody?: Record<string, any>;

  @Prop({ type: Object }) 
  responseBody?: Record<string, any>;

  @Prop({ type: String })
  user: string; 
}

export const LogSchema = SchemaFactory.createForClass(Log);
