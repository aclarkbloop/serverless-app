const AWS = require('aws-sdk')

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION
})

const saveSpendData = async(spend = {}) => {

  const params = {
    TableName: process.env.db2,
    Item: {
        hk: spend.email,
        sk: 'spend',
        sk2: spend.amount,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        type: spend.type,
      }
    }

  await dynamodb.put(params).promise()
}

module.exports = {
  saveSpendData,
}