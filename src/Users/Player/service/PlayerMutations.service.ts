import Player from "../schema/player.schema";
// import PlayerDto from "../dto/player.dto";
import { PatchPlayerInput } from "../inputs/index";
export class PlayerMutationService {
    async patchPlayer(input: PatchPlayerInput): Promise<boolean | Error> {
        const inputWithoutID = { ...input };
        delete inputWithoutID.id;
        try {
            // await Player.findByIdAndUpdate(input.id, { $set: inputWithoutID });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const player: any = await Player.findById(input.id).limit(1);
            // For each entry...
            // thumbnail, email, personal...
            if (player) {
                Object.entries(inputWithoutID).forEach(entry => {
                    const value = entry[1];
                    const key = entry[0];
                    // This means that there is nesting! Example: (personal { first_name })
                    if (typeof value === "object" && value !== null) {
                        Object.entries(value).forEach(subEntry => {
                            const subValue = subEntry[1];
                            const subKey = subEntry[0];
                            player[key][subKey] = subValue;
                        });
                    } else {
                        player[key] = value;
                    }
                });
                player.save();
                return true;
            } else return new Error("Player not found.");
        } catch (err) {
            if (err.kind === "ObjectId") return new Error("Invalid ObjectID.");
            else return err;
        }
    }
}
