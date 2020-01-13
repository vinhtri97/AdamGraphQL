import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType('CreatePlayerSchoolInfo')
export class PlayerSchoolInfo {
    @Field({ nullable: true })
    grad_year: string;

    @Field({ nullable: true })
    school_district: string;

    @Field({ nullable: true })
    school: string;

    @Field({ nullable: true })
    school_type: string;
}

@InputType('PlayerSchoolInfoInput')
export class PlayerSchoolInfoInput implements PlayerSchoolInfo {
    @Field({ nullable: true })
    grad_year: string;

    @Field({ nullable: true })
    school_district: string;

    @Field({ nullable: true })
    school: string;

    @Field({ nullable: true })
    school_type: string;
}
