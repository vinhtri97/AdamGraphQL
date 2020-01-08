import * as mongoose from 'mongoose';

import { getCollection, updateDocument } from '../../../../MongooseFunctions';
import Team from '../../Team/schema/Team.schema';
import { CreateTournamentInput, UpdateTournamentInput } from '../dto/classes';
import Tournament from '../schema/Tournament.schema';

// import TournamentDto from "../dto/Tournament.dto";
const {
    Types: { ObjectId }
} = mongoose;
export class TournamentMutationService {
    async createTournament(input: CreateTournamentInput): Promise<boolean | Error> {
        await Tournament.create(input);
        return true;
    }

    async updateTournament(input: UpdateTournamentInput): Promise<boolean | Error> {
        return await updateDocument(Tournament, input);
    }

    async addTeam(tournamentID: string, teamID: string, ageGroup: string): Promise<boolean | Error> {
        // const tournament: any = await Tournament.findById(tournamentID);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tournament: any = await getCollection(Tournament, tournamentID);
        if (`${ageGroup}` in tournament.age_groups) {
            if (!tournament.age_groups[`${ageGroup}`].teams.includes(ObjectId(teamID)))
                tournament.age_groups[`${ageGroup}`].teams.push(ObjectId(teamID));
            // Add Tournament to team
            await Team.findByIdAndUpdate(teamID, {
                $addToSet: { tournaments: ObjectId(tournamentID) }
            });
            tournament.markModified('age_groups');
            tournament.save();
            return true;
        } else throw new Error('Age group is not in the tournament');
    }

    async removeTeam(tournamentID: string, teamID: string, ageGroup: string): Promise<boolean | Error> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tournament: any = await getCollection(Tournament, tournamentID);
        if (`${ageGroup}` in tournament.age_groups) {
            tournament.age_groups[`${ageGroup}`].teams = tournament.age_groups[`${ageGroup}`].teams.filter(
                (nestedTeamID: { toString: () => string }) => nestedTeamID.toString() !== teamID
            );
            await Team.findByIdAndUpdate(teamID, {
                $pull: { tournaments: ObjectId(tournamentID) }
            });
            tournament.markModified('age_groups');
            tournament.save();
            return true;
        } else throw new Error('Age group is not in the tournament');
    }

    async removeTeamsForAgeGroup(tournamentID: string, ageGroup: string): Promise<boolean | Error> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tournament: any = await getCollection(Tournament, tournamentID);
        if (`${ageGroup}` in tournament.age_groups) {
            const teamsToRemove = tournament.age_groups[`${ageGroup}`].teams;
            tournament.age_groups[`${ageGroup}`].teams = [];
            // Remove tournament from all teams
            await Team.update({ _id: { $in: teamsToRemove } }, { $pull: { tournaments: tournamentID } });
            tournament.markModified('age_groups');
            tournament.save();
            return true;
        } else throw new Error('Age group is not in the tournament');
    }
}
