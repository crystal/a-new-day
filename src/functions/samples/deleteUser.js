import AWS from 'aws-sdk';
import uuid from 'uuid';

AWS.config.update({
  region: 'us-east-1'
  // endpoint: 'http://localhost:8000'
});

export default function deleteUser(event, context, callback) {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const table = 'Users';

  const params = {
    TableName: table,
    Key: {
      id: '35db2a5d-9074-4b18-a349-5a3c257f8f92',
      firstName: 'crystal'
    }
  };

  console.log('Deleting a new item...');
  docClient.delete(params, (err, data) => {
    if (err) {
      console.error('Unable to delete item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('Delete item:', JSON.stringify(data, null, 2));
    }
  });
}
