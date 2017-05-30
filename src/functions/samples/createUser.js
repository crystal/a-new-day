import AWS from 'aws-sdk';
import uuid from 'uuid';

AWS.config.update({
  region: 'us-east-1'
  // endpoint: 'http://localhost:8000'
});

export default function createUser(event, context, callback) {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const table = 'Users';

  const params = {
    TableName: table,
    Item: {
      id: uuid.v4(),
      firstName: 'amanda'
    }
  };

  console.log('Adding a new item...');
  docClient.put(params, (err, data) => {
    if (err) {
      console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('Added item:', JSON.stringify(data, null, 2));
    }
  });
}
