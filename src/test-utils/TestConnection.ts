/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as mongoose from "mongoose";
import "reflect-metadata";
export const testConn = async () => {
    // eslint-disable-next-line no-undef
    return await mongoose.connect(
        "mongodb+srv://Adam:YBL1IqHy2pahKlnm@cluster0-ktt9i.gcp.mongodb.net/what?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
};
