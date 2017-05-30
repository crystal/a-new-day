import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1'
});

export default function listUsers(event, context, callback) {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const table = 'Users';

  const params = {
    TableName: table
  };

  console.log('Scanning users table...');
  docClient.scan(params, (err, data) => {
    if (err) {
      console.error('Unable to scan table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log(data);
      const response = {
        version: '1.0',
        response: {
          outputSpeech: {
            type: 'PlainText',
            text: `You current users are ${data.Items.map(item => item.firstName).join(' and ')}`
          },
          shouldEndSession: true,
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
      console.log(response, JSON.stringify(response, null, 2));
      callback(null, response);
    }
  });
}
