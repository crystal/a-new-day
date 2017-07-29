import _ from 'lodash';
import AWS from 'aws-sdk';
import uuid from 'uuid';

AWS.config.update({
  region: 'eu-west-1'
  // endpoint: 'http://localhost:8000'
});

export default function createEvent(event, context, callback) {
  if (!event.request.intent.slots.time.value || !event.request.intent.slots.name.value) {
    const response = {
      version: '1.0',
      response: {
        outputSpeech: {
          type: 'SSML',
          ssml: `
            <speak>
              To add an event to your routine, you can say
              <prosody rate="slow">
                "add brew coffee at 7:30",
              </prosody>
              or
              <prosody rate="slow">
                "add get dressed at 8:00".
              </prosody>
              I'll confirm once each item has been added.
            </speak>
          `
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
    return;
  }

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
      const confirmations = [
        'Perfect',
        'Great',
        'Sure thing'
      ];
      const confirmation = confirmations[_.random(0, confirmations.length - 1)];
      const questions = [
        'What else',
        'Anything else'
      ];
      const question = questions[_.random(0, questions.length - 1)];
      const response = {
        version: '1.0',
        response: {
          outputSpeech: {
            type: 'SSML',
            ssml: `
              <speak>
                <audio src="https://s3.amazonaws.com/a-new-day/confirm.mp3" />
                ${confirmation}! I've added ${params.Item.name} at ${params.Item.time}! ${question}?
              </speak>
            `
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
