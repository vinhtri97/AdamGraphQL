/* eslint-disable require-atomic-updates */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Team from "../schema/Team.schema";
import Coach from "../../../Users/Coach/schema/Coach.schema";
import Player from "../../../Users/Player/schema/Player.schema";
import {
    updateDocument,
    addToStringArray,
    addToObjArray,
    removeFromStringArray
} from "../../../MongooseFunctions";
import { handleTeamChatsForParents } from "../../../Functions";
import Chat from "../../Chat/schema/Chat.schema";
import { CreateTeamInput, UpdateTeamInput } from "../dto/classes/index";

import * as mongoose from "mongoose";
const {
    Types: { ObjectId }
} = mongoose;

export class TeamMutationService {
    async createTeam(input: CreateTeamInput): Promise<boolean | Error> {
        const { coaches } = input;
        if (coaches.length < 1)
            throw new Error(
                "Invalid coaches array: There must be at least 1 coach."
            );
        const foundCoaches: any[] = await Coach.find({ _id: { $in: coaches } });

        if (foundCoaches.length > 0 && foundCoaches.length == coaches.length) {
            // Create the team
            const createdTeam: any = await Team.create(input);
            // Reformat the coach obj and save the team to each coach
            const coaches = await Promise.all(
                foundCoaches.map(async foundCoach => {
                    const coachID = foundCoach._id;
                    const coachObj = {
                        id: ObjectId(coachID),
                        muted: false,
                        type: "Coach"
                    };
                    foundCoach.teams.push(ObjectId(createdTeam._id));
                    await foundCoach.save();
                    return coachObj;
                })
            );
            const playerChat = await Chat.create({
                name: "All Players",
                team_id: ObjectId(createdTeam._id),
                users: coaches,
                isPremade: true
            });
            const playerAndParentChat = await Chat.create({
                name: "All Players & Parents",
                team_id: ObjectId(createdTeam._id),
                users: coaches,
                isPremade: true
            });
            createdTeam.fullPlayerChat = ObjectId(playerChat._id);
            createdTeam.fullPlayerAndParentChat = ObjectId(
                playerAndParentChat._id
            );
            createdTeam.save();
            return true;
        } else
            throw new Error("Cannot create team because a coachID was invalid");
    }

    async updateTeam(input: UpdateTeamInput): Promise<boolean | Error> {
        return await updateDocument(Team, input);
    }

    async addPlayer(
        teamID: string,
        playerID: string
    ): Promise<boolean | Error> {
        // TODO change auto-accept
        const res = await addToObjArray(
            Team,
            "players",
            teamID,
            { accepted: false },
            Player,
            "teams",
            playerID,
            { accepted: false }
        );
        return res;
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
        return await handleTeamChatsForParents(teamID, playerID, false);
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
