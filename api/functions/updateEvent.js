import handler from '../util/handler';
import dynamoDb from '../util/dynamodb';

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.EVENTS_TABLE_NAME,
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      id: event.pathParameters.id, // The id of the event from the path
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression:
      'SET #en = :name, contestants = :contestants, expiryDate = :expiryDate',
    ExpressionAttributeValues: {
      ':name': data.name || null,
      ':contestants': data.contestants || null,
      ':expiryDate': data.expiryDate || null,
    },
    ExpressionAttributeNames: {
      '#en': 'name',
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: 'ALL_NEW',
  };
  await dynamoDb.update(params);
  return { status: true };
});
