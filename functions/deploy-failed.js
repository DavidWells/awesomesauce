
exports.handler = function(event, context, callback) {
  console.log('deploy-failed')
  console.log('event', event)
  console.log('context', context)
  return callback(null, {
    statusCode: 200,
    body: "Hello, World"
  })
}
