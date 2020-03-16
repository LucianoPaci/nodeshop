const express = require('express')
const bodyParser = require('body-parser')

const AWS = require('aws-sdk')

// Configure the region
AWS.config.update({ region: 'us-east-1' })

// Create a SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' })
const queueUrl =
  'https://sqs.us-east-1.amazonaws.com/520763495267/nodeshop.fifo'

const port = process.argv.slice(2)[0]
const app = express()

app.use(bodyParser.json())

app.get('/index', (req, res) => {
  res.send('Welcome to NodeShop Orders.')
})

app.post('/order', (req, res) => {
  let orderData = {
    userEmail: req.body['userEmail'],
    itemName: req.body['itemName'],
    itemPrice: req.body['itemPrice'],
    itemsQuantity: req.body['itemsQuantity']
  }

  let sqsOrderData = {
    MessageAttributes: {
      userEmail: {
        DataType: 'String',
        StringValue: orderData.userEmail
      },
      itemName: {
        DataType: 'String',
        StringValue: orderData.itemName
      },
      itemPrice: {
        DataType: 'Number',
        StringValue: orderData.itemPrice
      },
      itemsQuantity: {
        DataType: 'Number',
        StringValue: orderData.itemsQuantity
      }
    },
    MessageBody: JSON.stringify(orderData),
    MessageDeduplicationId: req.body['userEmail'],
    MessageGroupId: 'UserOrders',
    QueueUrl: queueUrl
  }

  // Send the order data to the SQS queue
  let sendSqsMessage = sqs.sendMessage(sqsOrderData).promise()

  sendSqsMessage
    .then(data => {
      console.log(`OrdersService | SUCCESS: ${data.MessageId}`)
      res.send(
        `Thank you for your order. Check your inbox for the confirmation email`
      )
    })
    .catch(err => {
      console.log(`OrdersService | ERROR: ${err}`)
      // Send email to emails API
      res.send(`We ran into an error. Please try again`)
    })
})

console.log(`Orders service listening on port ${port}`)
app.listen(port)
