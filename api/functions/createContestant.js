import * as uuid from 'uuid';
import handler from '../util/handler';
import dynamoDb from '../util/dynamodb';

export const main = handler(async (event) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.CONTESTANTS_TABLE_NAME,
    Item: {
      // The attributes of the item to be created
      id: uuid.v1(), // The id of the contestant
      name: data.name, // The name of the contestant
      image: data.image, // Parsed from request body
    },
  };

  await dynamoDb.put(params);
  return params.Item;
});
