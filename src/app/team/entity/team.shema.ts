import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeamDocument = Team & Document;

@Schema()
export class Team {
  @Prop({ required: true })
  city: string;

  @Prop()
  nickname: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  confName: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
