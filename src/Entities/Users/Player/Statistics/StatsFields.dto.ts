import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType('StatsFieldsInput')
export class StatsFields {
    @Field()
    value: number;

    @Field({ nullable: true })
    certified: boolean;

    @Field({ nullable: true })
    certifying_entity: string;
}
