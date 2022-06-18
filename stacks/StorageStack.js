import { Bucket, Table } from '@serverless-stack/resources';
export function StorageStack({ stack, app }) {
  // Create an S3 bucket
  const bucket = new Bucket(stack, 'Uploads');

  // Create the DynamoDB table
  const contestantsTable = new Table(stack, 'Contestants', {
    fields: {
      id: 'string',
      name: 'string',
      image: 'number',
    },
    primaryIndex: { partitionKey: 'id' },
  });

  const eventsTable = new Table(stack, 'Events', {
    fields: {
      id: 'string',
      name: 'string',
      contestants: ['string'],
      expiryDate: 'number',
    },
    primaryIndex: { partitionKey: 'id' },
  });

  const votesTable = new Table(stack, 'Votes', {
    fields: {
      id: 'string',
      voterId: 'string',
      contestantId: 'string',
      eventId: 'string',
    },
    primaryIndex: { partitionKey: 'id' },
  });

  return {
    contestantsTable,
    eventsTable,
    votesTable,
    bucket,
  };
}
