import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";
import * as mongoose from "mongoose";
import * as path from "path";
import {
    PlayerMutationResolver,
    PlayerQueryResolver
} from "./Player/resolvers/index";
import {
    CoachMutationResolver,
    CoachQueryResolver
} from "./Coach/resolvers/index";
require("dotenv").config();

@Resolver()
class HelloResolver {
    @Query(() => String)
    async helloWorld(): Promise<string> {
        return "Hello World!";
    }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const main = async () => {
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.MONGODB_PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const schema = await buildSchema({
        resolvers: [
            HelloResolver,
            PlayerQueryResolver,
            PlayerMutationResolver,
            CoachMutationResolver,
            CoachQueryResolver
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
