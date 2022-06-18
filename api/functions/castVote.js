import * as uuid from 'uuid';
import handler from '../util/handler';
import dynamoDb from '../util/dynamodb';

export const main = handler(async (event) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.VOTES_TABLE_NAME,
    Item: {
      // The attributes of the item to be created
      id: uuid.v1(), // The id of the contestant
      userId: data.userId, // The id of voter
      contestantId: data.contestantId, // The id of contest
      eventId: data.eventId, // The id of event
    },
  };

  await dynamoDb.put(params);
  return params.Item;
});
