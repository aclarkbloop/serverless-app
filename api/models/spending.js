const AWS = require('aws-sdk')
const shortid = require('shortid')
const utils = require('../utils')

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION
})

const saveSpendData = async(user = {}) => {

    // Validate
  
    // Check if user is already registered
    const existingUser = await getByEmail(user.email)
    if (existingUser) {
      throw new Error(`A user with email "${user.email}" is already registered`)
    }
  
    user.password = utils.hashPassword(user.password)
  
    // Save
    const params = {
      TableName: process.env.db,
      Item: {
        hk: user.email,
        sk: 'user',
        sk2: shortid.generate(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        password: user.password,
      }
    }
  
    await dynamodb.put(params).promise()
  }