
# Node Shop

Project that simulates Orders and Emails from a business or shop.
It allows to create orders via API that are sent to a queue so they can be consumed later to create emails and send them to a dummy inbox.

###  What is used?
* Typescript
* Express
* AWS SQS
* Mongo
* Mongoose
* React
* Redux Toolkit

## Architecture

![architecture](https://i.imgur.com/Co79c0Y.png)


### Setting up the configuration

This project uses `nconf` to handle configuration files in a hierarchical way.
It will merge the configs between your `${environment}.yaml` and `default.yaml`, giving a higher priority to whatever is added in the `${environment}.yaml` file.

> It is recommended to create a `local.yaml` inside the `config` folder. This file is ignored and won't be commited to Github.


* You will need to obtain your `AWS CLIENT ID` and `AWS SECRET ID` and add them in the `config/local.yaml`
  *  *You don't need to add them if you have them configured in your CLI*


* You will need to create a queue in AWS SQS. [Here is explained how](https://stackabuse.com/message-queueing-in-node-js-with-aws-sqs/). Get the URL and add it to the `config/local.yaml`

* You will need to create an account in [Mailtrap](https://mailtrap.io/) to use an Email Sandbox for tests. 
In there, you should get all the SMTP Settings as described below and add them in the `config/local.yaml`

![SMTP settings](https://i.imgur.com/aQykyQh.png "SMTP settings")
 

## How to run it?
If you created a `config/local.yaml` file, then run:
```bash
npm run local
```

If you didn't, then run:
```bash
npm run dev
```


**The API will be exposed in the PORT 3000**



## Postman Collection
https://documenter.getpostman.com/view/2992116/UzBnpmNY


## FrontEnd App
Project created with https://createapp.dev/webpack/react--babel--chai--cleanwebpackplugin--copywebpackplugin--css--mocha--postcss--react-hot-loader--tailwind-css--typescript

---- 
Based of: AWS-SQS Tutorial

https://stackabuse.com/message-queueing-in-node-js-with-aws-sqs/
