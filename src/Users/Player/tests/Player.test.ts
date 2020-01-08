/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { testConn } from "../../../test-utils/TestConnection";
import { gCall } from "../../../test-utils/gCall";
import Player from "../schema/Player.schema";

const userInfo = {
    firebase_id: "firebaseID",
    email: "someplayeremail@gmail.com",
    personal: {
        first_name: "TestPlayer",
        last_name: "TestPlayer"
    },
    school_info: {
        grad_year: "2020",
        school_district: "Flour Bluff ISD",
        school: "Flour Bluff",
        school_type: "High School"
    },
    sport_info: {
        position: "Quarterback",
        secondary_position: "Runningback",
        throwing: "what is this",
        batting: "what is this",
        sport: "Football",
        committed: "Why is this a string",
        committed_date: "Today"
    }
};

let conn: any;
beforeAll(async () => {
    conn = await testConn();
});
afterAll(async () => {
    // await conn.connection.db.dropDatabase();
    await conn.connection.close();
});

const createPlayer = `
mutation{
    createPlayer(
        firebase_id: "${userInfo.firebase_id}"
        email: "${userInfo.email}"
        personal: {
            first_name: "${userInfo.personal.first_name}"
            last_name: "${userInfo.personal.last_name}"
        }
        school_info: {
            grad_year: "${userInfo.school_info.grad_year}"
            school_district: "${userInfo.school_info.school_district}"
            school: "${userInfo.school_info.school}"
            school_type: "${userInfo.school_info.school_type}"
        }
        sport_info: {
            position: "${userInfo.sport_info.position}"
            secondary_position: "${userInfo.sport_info.secondary_position}"
            throwing: "${userInfo.sport_info.throwing}"
            batting: "${userInfo.sport_info.batting}"
            sport: "${userInfo.sport_info.sport}"
            committed: "${userInfo.sport_info.committed}"
            committed_date: "${userInfo.sport_info.committed_date}"
        }
    )
  }
`;

/*

*/

describe("CreatePlayer", () => {
    it("create user", async () => {
        const res: any = await gCall({
            source: createPlayer
        });
        expect(JSON.stringify(res)).toContain("true");
        const dbUser = await Player.findOne({ email: userInfo.email });
        expect(JSON.stringify(dbUser)).toContain("user_type");
    });
});
