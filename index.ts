import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import * as mongoose from "mongoose";
import * as path from "path";
import {
    PlayerQueryResolver,
    PlayerMutationResolver,
    CoachMutationResolver,
    CoachQueryResolver,
    DirectorMutationResolver,
    DirectorQueryResolver,
    SpectatorMutationResolver,
    SpectatorQueryResolver
} from "./src/Users/Users.resolvers.index";
import {
    TeamQueryResolver,
    TeamMutationResolver,
    TournamentQueryResolver,
    TournamentMutationResolver,
    ChatQueryResolver,
    ChatMutationResolver,
    BugQueryResolver,
    BugMutationResolver,
    VideoMutationResolver,
    VideoQueryResolver,
    ParkQueryResolver,
    ParkMutationResolver
} from "./src/Non-Users/Entity.resolvers.index";

require("dotenv").config();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const main = async () => {
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.MONGODB_PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const schema = await buildSchema({
        resolvers: [
            PlayerQueryResolver,
            PlayerMutationResolver,
            CoachMutationResolver,
            CoachQueryResolver,
            DirectorMutationResolver,
            DirectorQueryResolver,
            TeamQueryResolver,
            TeamMutationResolver,
            TournamentQueryResolver,
            TournamentMutationResolver,
            ChatMutationResolver,
            ChatQueryResolver,
            BugQueryResolver,
            BugMutationResolver,
            SpectatorMutationResolver,
            SpectatorQueryResolver,
            ParkQueryResolver,
            ParkMutationResolver,
            VideoMutationResolver,
            VideoQueryResolver
        ],
        // eslint-disable-next-line no-undef
        emitSchemaFile: path.resolve(__dirname, "schema.gql")
    });

    const apolloServer = new ApolloServer({ schema, playground: true });

    const app = Express();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("server started on http://localhost:4000/graphql");
    });
};

main();
