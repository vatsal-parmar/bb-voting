import handler from '../util/handler';
import dynamoDb from '../util/dynamodb';

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.EVENTS_TABLE_NAME,
  };
  const result = await dynamoDb.getAll(params);
  if (!result.Items) {
    throw new Error('Item not found.');
  }
  // Return the retrieved item
  return result.Items;
});
