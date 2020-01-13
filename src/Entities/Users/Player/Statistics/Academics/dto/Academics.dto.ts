import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType('AcademicsInput')
export class AcademicsDto {
    @Field()
    ACT_Score: number;

    @Field()
    SAT_Score: number;

    @Field()
    GPA: number;
}
