import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Team, TeamDocument } from 'src/app/team/entity/team.shema';

export type PlayerDocument = Player & Document;

@Schema()
export class Player {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Team.name,
  })
  team: mongoose.Types.ObjectId | string | TeamDocument;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  position: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
