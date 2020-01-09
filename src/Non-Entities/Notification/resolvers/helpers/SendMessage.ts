/* eslint-disable prefer-spread */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Expo } from 'expo-server-sdk';

import { PushMessage } from '../../dto/Message';

export default async function SendMessage(messages: Array<PushMessage>): Promise<boolean> {
    const expo = new Expo();
    async function sendNotifications(messages): Promise<Array<any>> {
        const chunks = expo.chunkPushNotifications(messages);
        return await Promise.all(chunks.map(async chunk => await expo.sendPushNotificationsAsync(chunk)));
    }
    async function handleReceipts(receipts): Promise<any> {
        receipts.forEach(receipt => {
            if (receipt.status === 'error') {
                console.error(`There was an error sending a notification: ${receipt.message}`);
                if (receipt.details && receipt.details.error) {
                    // TODO handle errors
                    // The error codes are listed in the Expo documentation:
                    // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
                    // You must handle the errors appropriately.
                    console.error(`The error code is ${receipt.details.error}`);
                }
            }
        });
    }
    const receipts = [].concat.apply([], await sendNotifications(messages));
    await handleReceipts(receipts);
    return true;
}
