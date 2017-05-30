import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1'
});

export default function getUser(event, context, callback) {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const table = 'Users';

  const params = {
    TableName: table,
    Key: {
      id: event.id,
      firstName: event.firstName
    }
  };

  console.log('Reading a new item...');
  docClient.get(params, (err, data) => {
    if (err) {
      console.error('Unable to get item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('Get item:', JSON.stringify(data, null, 2));
    }
  });
}
