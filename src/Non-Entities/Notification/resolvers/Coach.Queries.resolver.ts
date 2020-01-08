import { Query, Resolver } from 'type-graphql';

import CoachDto from '../dto/Coach.dto';

@Resolver()
export class CoachQueryResolver {
    @Query(() => [CoachDto])
    async getCoaches(): Promise<Array<CoachDto>> {
        return await this.coachQueryService.getCoaches();
    }
}
