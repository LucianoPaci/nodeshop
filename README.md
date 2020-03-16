## AWS-SQS Tutorial

https://stackabuse.com/message-queueing-in-node-js-with-aws-sqs/

---

### How to run it?

```javascript
npm start
```

This will start 2 services (`Orders` and `Emails` ) that will run in parallel.

**PORT: 8081**

#### Send data to the Queue

```
curl --location --request POST 'localhost:8081/order' \
--header 'Content-Type: application/json' \
--data-raw '{
    "itemName": "Phone case 1",
    "itemPrice": "10",
    "userEmail": "randomuser1@email.com",
    "itemsQuantity": "2"
}'
```

_This request will send data to the Queue and will be consumed by the email service._

- Using [Mailtrap](https://mailtrap.io/) as Email Sandbox for tests
