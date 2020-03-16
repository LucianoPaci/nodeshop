const AWS = require('aws-sdk')
const { Consumer } = require('sqs-consumer')
const nodemailer = require('nodemailer')

AWS.config.update({ region: 'us-east-1' })

const queueUrl =
  'https://sqs.us-east-1.amazonaws.com/520763495267/nodeshop.fifo'

let transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '53906d70b9f16b',
    pass: '4fa3a411c1de92'
  }
})

function sendMail(message) {
  let sqsMessage = JSON.parse(message.Body)
  const emailMessage = {
    from: 'pepetest@gmail.com',
    to: sqsMessage.userEmail,
    subject: `Order Received | NodeShop`,
    html: `<p>Hi ${sqsMessage.userEmail}.</p. <p>Your order of ${sqsMessage.itemsQuantity} ${sqsMessage.itemName} has been received and is being processed.</p> <p> Thank you for shopping with us! </p>`
  }

  transport.sendMail(emailMessage, (err, info) => {
    if (err) {
      console.log(`EmailService | ERROR: ${err}`)
    } else {
      console.log(`EmailsService | INFO: ${info}`)
    }
  })
}

const app = Consumer.create({
  queueUrl: queueUrl,
  handleMessage: async message => {
    sendMail(message)
  },
  sqs: new AWS.SQS()
})

app.on('error', err => {
  console.log(err.message)
})
app.on('processing_error', err => {
  console.log(err.message)
})

console.log('Emails service is running')
app.start()
