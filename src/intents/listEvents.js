import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1'
  // endpoint: 'http://localhost:8000'
});

export default function createUser(event, context, callback) {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const table = 'Events';

  const params = {
    TableName: table
  };

  console.log('Scanning events table...');
  docClient.scan(params, (err, data) => {
    if (err) {
      console.error('Unable to scan events table. Error JSON:', JSON.stringify(err, null, 2));
    } else if (!data.Items.length) {
      const response = {
        version: '1.0',
        response: {
          outputSpeech: {
            type: 'SSML',
            ssml: `
              <speak>
                You don't have any events added to your morning! To add events, say "add".
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
    } else {
      console.log(data);
      const tasks = data.Items
        .sort((a, b) => {
          if (a.time === b.time) {
            return 0;
          }
          return a.time < b.time ? -1 : 1;
        })
        .map((item, i) => {
          let text = `${item.name} at ${item.time}`;
          if (i === data.Items.length - 1) {
            text += '.';
          } else if (i === data.Items.length - 2) {
            text += '<break time="1s"/> and ';
          } else {
            text += '<break time="1s"/>, ';
          }
          return text;
        })
        .join();
      const response = {
        version: '1.0',
        response: {
          outputSpeech: {
            type: 'SSML',
            ssml: `<speak><prosody rate="slow">Your tasks for this morning are </prosody><break time="1s"/>${tasks}</speak>`
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
