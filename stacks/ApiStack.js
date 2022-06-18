import { Api, use } from '@serverless-stack/resources';
import { StorageStack } from './StorageStack';

export function ApiStack({ stack, app }) {
  const { contestantsTable, votesTable, eventsTable } = use(StorageStack);
  // Create the API
  const api = new Api(stack, 'Api', {
    defaults: {
      function: {
        permissions: [contestantsTable, votesTable, eventsTable],
        environment: {
          CONTESTANTS_TABLE_NAME: contestantsTable.tableName,
          VOTES_TABLE_NAME: votesTable.tableName,
          EVENTS_TABLE_NAME: eventsTable.tableName,
        },
      },
    },
    routes: {
      'POST /contenstants': 'functions/createContestant.main',
      'POST /events': 'functions/createEvent.main',
      'POST /votes': 'functions/castVote.main',
      'GET /events': 'functions/getAllEvents.main',
      'GET /contenstants/{id}': 'functions/getContestant.main',
      'PUT /events/{id}': 'functions/updateEvent.main',
      'DELETE /events/{id}': 'functions/deleteEvent.main',
    },
  });
  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
  // Return the API resource
  return {
    api,
  };
}
