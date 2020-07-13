const AWS = require('aws-sdk')

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION
})

const saveSpendData = async() => {

  const params = {
    TableName: process.env.db2,
    Item: {
        hk: 'email',
        sk: 'spend',
        sk2: 50,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        type: 'food',
      }
    }

  await dynamodb.put(params).promise()
}

module.exports = {
  saveSpendData,
}