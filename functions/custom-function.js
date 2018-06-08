/* Custom */
exports.handler = function(event, context, callback) {
  console.log('custom function!')
  console.log('event', event)
  console.log('context', context)
  return callback(null, {
    statusCode: 200,
    body: "Hello, World"
  })
}
