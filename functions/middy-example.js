import middy from 'middy'
import { jsonBodyParser, validator, httpErrorHandler, httpHeaderNormalizer } from 'middy/middlewares'

/* Normal lambda code */
const businessLogic = (event, context, callback) => {
  // event.body has already been turned into an object by `jsonBodyParser` middleware
  console.log('event.body', event.body)
  console.log('typeof event.body', typeof event.body)
  console.log('event.headers', event.headers)
  const { name } = event.body
  console.log('name', name)
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      result: 'success',
      message: `Hi ${name} ⊂◉‿◉つ`,
    })
  })
}

/* Input & Output Schema */
const schema = {
  input: {
    type: 'object',
    properties: {
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
        }
      }
    },
    required: ['body']
  },
  output: {
    type: 'object',
    properties: {
      body: {
        type: 'string',
        required: ['result', 'message'],
        properties: {
          result: { type: 'string' },
          message: { type: 'string' },
        }
      }
    },
    required: ['body']
  }
}

/* Export inputSchema & outputSchema for automatic documentation */
exports.schema = schema

exports.handler = middy(businessLogic)
  .use(httpHeaderNormalizer())
  // parses the request body when it's a JSON and converts it to an object
  .use(jsonBodyParser())
  // validates the input
  .use(validator({ inputSchema: schema.input }))
  // handles common http errors and returns proper responses
  .use(httpErrorHandler())
