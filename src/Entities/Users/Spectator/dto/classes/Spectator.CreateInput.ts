import { ArgsType } from 'type-graphql';

import { CreateUserInput } from '../../../Generic/dto/classes';

// import { ChatObj, SpectacleObj } from "./types/index";

@ArgsType()
export class CreateSpectatorInput extends CreateUserInput {}
