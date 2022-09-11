import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Team } from '../../teams/team.schema';

export type PlayerDocument = Player & Document;

@Schema()
export class Player {
  @Prop({ required: true })
  _id: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
    ref: Team.name,
  })
  team: Team;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  position: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
