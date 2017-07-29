import AWS from 'aws-sdk';

AWS.config.update({
  region: 'eu-west-1'
});

export default function deleteEvent(event, context, callback) {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const table = 'Events';

  const params = {
    TableName: table,
    Item: {
      id: event.request.intent.slots.id,
      name: event.request.intent.slots.name
    }
  };

  console.log('Deleting an item...');
  docClient.delete(params.value, (err, data) => {
    if (err) {
      console.error('Unable to delete task. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('Deleted item:', JSON.stringify(data, null, 2));
      const response = {
        version: '1.0',
        response: {
          outputSpeech: {
            type: 'PlainText',
            text: `Great! I've deleted ${params.Item.name}! What else?`
          },
          shouldEndSession: false,
          card: {
            type: 'Simple',
            title: 'Test',
            content: 'Test'
          },
          reprompt: {
            outputSpeech: {
              type: 'PlainText',
              text: 'Hello?'
            }
          }
        }
      };
      callback(null, response);
    }
  });
}
