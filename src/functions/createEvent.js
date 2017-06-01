import AWS from 'aws-sdk';
import uuid from 'uuid';

AWS.config.update({
  region: 'us-east-1'
  // endpoint: 'http://localhost:8000'
});

export default function createUser(event, context, callback) {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const table = 'Events';

  const params = {
    TableName: table,
    Item: {
      id: uuid.v4(),
      time: event.request.intent.slots.time.value,
      name: event.request.intent.slots.name.value
    }
  };

  docClient.put(params, (err, data) => {
    if (err) {
      console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('Added item:', JSON.stringify(data, null, 2));
      const response = {
        version: '1.0',
        response: {
          outputSpeech: {
            type: 'SSML',
            ssml: `<speak>Great! I've added ${params.Item.name} at ${params.Item.time}! What else?</speak>`
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
