const AWS = require('aws-sdk')

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION
})

const saveSpendData = async(spend = {}) => {

  const user = await getByEmail(spend.email)
  const map = user.purchases
  if (spend.type === 'food') {
    map.food = Math.round((map.food + spend.amount) * 100) / 100
  } else if (spend.type === 'personal') {
    map.personal = Math.round((map.personal + spend.amount) * 100) / 100
  } else {
    map.rent = Math.round((map.rent + spend.amount) * 100) / 100
  }
  

  const params = {
    TableName: process.env.db,
    Item: {
      hk: user.email,
      sk: 'user',
      sk2: user.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      password: user.password,
      purchases: map,
      }
    }

  await dynamodb.put(params).promise()
}

const getByEmail = async(email) => {

  const params = {
    TableName: process.env.db,
    KeyConditionExpression: 'hk = :hk',
    ExpressionAttributeValues: { ':hk': email }
  }

  let user = await dynamodb.query(params).promise()
  user = user.Items && user.Items[0] ? user.Items[0] : null
  if (user) {
    user.id = user.sk2
    user.email = user.hk
  }
  return user
}

const getData = async(info = {}) => {
  const user = await getByEmail(info.email)
  const map = user.purchases
  return map
}

module.exports = {
  saveSpendData,
  getByEmail,
  getData,
}