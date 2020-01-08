import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class PlayerTeams {
    @Field()
    id: string;

    @Field()
    accepted: boolean;
}
