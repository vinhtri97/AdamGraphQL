/* eslint-disable @typescript-eslint/no-explicit-any */
import Team from "../schema/Team.schema";
import Coach from "../../../Users/Coach/schema/Coach.schema";
import Player from "../../../Users/Player/schema/Player.schema";
import {
    updateDocument,
    addToStringArray,
    addToObjArray,
    removeFromObjArray,
    removeFromStringArray
} from "../../../MongooseFunctions";
import { CreateTeamInput, UpdateTeamInput } from "../dto/classes/index";
export class TeamMutationService {
    async createTeam(input: CreateTeamInput): Promise<boolean | Error> {
        const { coaches } = input;
        const foundCoach: any = await Coach.findById(coaches[0]).limit(1);
        if (foundCoach) {
            const createdTeam = await Team.create(input);
            foundCoach.teams.push(createdTeam._id);
            foundCoach.save();
            return true;
        } else
            return new Error(
                "Cannot create team because the coachID was invalid"
            );
    }

    async updateTeam(input: UpdateTeamInput): Promise<boolean | Error> {
        return await updateDocument(Team, input);
    }

    async addPlayer(
        teamID: string,
        playerID: string
    ): Promise<boolean | Error> {
        // TODO change auto-accept
        return await addToObjArray(
            Team,
            "players",
            teamID,
            { accepted: false },
            Player,
            "teams",
            playerID,
            { accepted: false }
        );
    }

    async addCoach(teamID: string, coachID: string): Promise<boolean | Error> {
        return await addToStringArray(
            Team,
            "coaches",
            teamID,
            Coach,
            "teams",
            coachID
        );
    }

    async removePlayer(
        teamID: string,
        playerID: string
    ): Promise<boolean | Error> {
        return await removeFromObjArray(
            Team,
            "players",
            teamID,
            Player,
            "teams",
            playerID
        );
    }

    async removeCoach(
        teamID: string,
        coachID: string
    ): Promise<boolean | Error> {
        return await removeFromStringArray(
            Team,
            "coaches",
            teamID,
            Coach,
            "teams",
            coachID
        );
    }
}
