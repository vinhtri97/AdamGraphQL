import Tournament from "../schema/Tournament.schema";
// import TournamentDto from "../dto/Tournament.dto";
import {
    CreateTournamentInput,
    UpdateTournamentInput
} from "../dto/classes/index";

import { updateDocument } from "../../../Functions";

export class TournamentMutationService {
    async createTournament(
        input: CreateTournamentInput
    ): Promise<boolean | Error> {
        await Tournament.create(input);
        return true;
    }

    async updateTournament(
        input: UpdateTournamentInput
    ): Promise<boolean | Error> {
        return await updateDocument(Tournament, input);
    }
}
