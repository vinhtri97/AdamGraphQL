import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";
import * as mongoose from "mongoose";
import * as path from "path";
import { CreatePlayerResolver } from "./Player/resolvers/index";

@Resolver()
class HelloResolver {
    @Query(() => String)
    async helloWorld(): Promise<string> {
        return "Hello World!";
    }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const main = async () => {
    await mongoose.connect(
        "mongodb+srv://Adam:YBL1IqHy2pahKlnm@cluster0-ktt9i.gcp.mongodb.net/test?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );
    const schema = await buildSchema({
        resolvers: [HelloResolver, CreatePlayerResolver],
        // eslint-disable-next-line no-undef
        emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    });

    const apolloServer = new ApolloServer({ schema, playground: true });

    const app = Express();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("server started on http://localhost:4000/graphql");
    });
};

main();
