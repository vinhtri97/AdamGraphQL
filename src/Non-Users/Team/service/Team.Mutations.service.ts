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
        const foundCoach: any = await Coach.findById(coaches[0]).limit(1);

        if (foundCoach) {
            const createdTeam: any = await Team.create(input);
            const coachID = foundCoach._id;
            const coaches = [
                { id: ObjectId(coachID), muted: false, type: "Coach" }
            ];

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
            // eslint-disable-next-line prettier/prettier
            createdTeam.fullPlayerAndParentChat = ObjectId(playerAndParentChat._id);
            createdTeam.save();
            foundCoach.teams.push(ObjectId(createdTeam._id));
            foundCoach.save();
            return true;

            // const createdTeam: any = await Team.create(input);
            // console.log("createdTeam", createdTeam);
            // const coachID = foundCoach._id;
            // // await addToStringArray(Coach, coachID, createdTeam._id, 'teams');
            // const coaches = [
            //     { id: ObjectId(coachID), muted: false, type: "Coach" }
            // ];
            // console.log("coaches", coaches);
            // const acceptedPlayers = createdTeam.players
            //     .filter((player: any) => player.accepted)
            //     .map(({ id }: { [key: string]: string }) => ({
            //         id: ObjectId(id),
            //         hasMuted: false,
            //         type: "Player"
            //     }));
            // console.log("acceptedPlayers", acceptedPlayers);
            // const playerChat = await Chat.create({
            //     name: "All Players",
            //     team_id: ObjectId(createdTeam._id),
            //     users: coaches.concat(acceptedPlayers),
            //     isPremade: true
            // });
            // console.log("playerChat", playerChat);
            // const parentsArrays = await Promise.all(
            //     createdTeam.players.map(async (player: { _id: any }) => {
            //         try {
            //             const result = await getNestedSpectatorObjects(
            //                 Player,
            //                 player._id.toString(),
            //                 "spectators",
            //                 "spectators"
            //             );
            //             const parents = result.Mom.concat(
            //                 result.Dad,
            //                 result.Guardian
            //             );
            //             return parents;
            //         } catch (e) {
            //             console.log("error:", e);
            //             return [];
            //         }
            //     })
            // );

            // console.log("parentsArrays", parentsArrays);

            // // Turns parents into 1 array of objects
            // // eslint-disable-next-line prefer-spread
            // const parentsOnTeam = [].concat.apply([], parentsArrays);
            // console.log("parentsOnTeam", parentsOnTeam);
            // //
            // let parentsOnTeamIDs = parentsOnTeam.map(
            //     ({ id }: { [key: string]: string }) => id
            // );
            // const mySet = new Set(parentsOnTeamIDs);
            // parentsOnTeamIDs = [...mySet];
            // console.log("parentsOnTeamIDs", parentsOnTeamIDs);
            // const formattedParents = parentsOnTeamIDs.map((id: any) => ({
            //     id: ObjectId(id),
            //     hasMuted: false,
            //     type: "Spectator"
            // }));
            // console.log("formattedParents", formattedParents);

            // const playerAndParentChat = await Chat.create({
            //     name: "All Players & Parents",
            //     team_id: ObjectId(createdTeam._id),
            //     users: coaches.concat(acceptedPlayers, formattedParents),
            //     isPremade: true
            // });
            // console.log("formattedParents", formattedParents);
        } else
            throw new Error(
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
