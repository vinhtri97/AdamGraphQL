import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType('CreateSportInfo')
export class PlayerSportInfo {
    @Field()
    position: string;

    @Field({ nullable: true })
    secondary_position: string;

    @Field({ nullable: true })
    throwing: string;

    @Field({ nullable: true })
    batting: string;

    @Field()
    sport: string;

    @Field({ nullable: true })
    committed: string;

    @Field({ nullable: true })
    committed_date: string;
}

// @ObjectType()
@InputType('SportInfoInput')
export class PlayerSportInfoInput implements PlayerSportInfo {
    @Field({ nullable: true })
    position: string;

    @Field({ nullable: true })
    secondary_position: string;

    @Field({ nullable: true })
    throwing: string;

    @Field({ nullable: true })
    batting: string;

    @Field({ nullable: true })
    sport: string;

    @Field({ nullable: true })
    committed: string;

    @Field({ nullable: true })
    committed_date: string;
}
