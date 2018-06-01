/* Triggered when a user signs up via Netlify Identity. */
exports.handler = function(event, context, callback) {
  console.log('identity-signup')
  console.log('event', event)
  console.log('context', context)
  return callback(null, {
    statusCode: 200,
    body: "Hello, World"
  })
}
