import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class PlayerVideos {
    @Field()
    id: string;

    @Field()
    accepted: boolean;
}
