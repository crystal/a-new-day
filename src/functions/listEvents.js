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
    } else {
      console.log(data);
      const response = {
        version: '1.0',
        response: {
          outputSpeech: {
            type: 'SSML',
            ssml: `<speak><prosody rate="slow">Your tasks for this morning are </prosody><break time="1s"/>${data.Items.map(item => item.name + ' at ' + item.time).join('<break time="1s"/> and ')}</speak>`
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
