// eslint-disable-next-line prettier/prettier
import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';
import { buildSchema } from 'type-graphql';

import {
    BugMutationResolver,
    BugQueryResolver,
    ChatMutationResolver,
    ChatQueryResolver,
    FieldMutationResolver,
    FieldQueryResolver,
    ParkMutationResolver,
    ParkQueryResolver,
    TeamMutationResolver,
    TeamQueryResolver,
    TournamentMutationResolver,
    TournamentQueryResolver,
    VideoMutationResolver,
    VideoQueryResolver,
} from './src/Entities/Non-Users/Entity.resolvers.index';
import {
    CoachMutationResolver,
    CoachQueryResolver,
    DirectorMutationResolver,
    DirectorQueryResolver,
    PlayerMutationResolver,
    PlayerQueryResolver,
    SpectatorMutationResolver,
    SpectatorQueryResolver,
} from './src/Entities/Users/Users.resolvers.index';
import { NotificationQueryResolver } from './src/Non-Entities/Notification/resolvers/Notification.Queries.resolver';

require('dotenv').config();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const main = async () => {
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.MONGODB_PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const schema = await buildSchema({
        resolvers: [
            NotificationQueryResolver,
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
            VideoQueryResolver,
            FieldMutationResolver,
            FieldQueryResolver,
        ],
        // eslint-disable-next-line no-undef
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    });

    const apolloServer = new ApolloServer({ schema, playground: true });

    const app = Express();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('server started on http://localhost:4000/graphql');
    });
};

main();
