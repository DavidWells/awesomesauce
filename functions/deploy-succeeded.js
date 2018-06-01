/* Triggered when Netlify finishes deploying a site. */
exports.handler = function(event, context, callback) {
  console.log('deploy-succeeded')
  console.log('event', event)
  console.log('context', context)
  return callback(null, {
    statusCode: 200,
    body: "Hello, World"
  })
}
