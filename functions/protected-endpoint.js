
/* Protected function */
exports.handler = function(event, context, callback) {
  console.log('protected function!')
  const claims = context.clientContext && context.clientContext.user
  console.log('claims', claims)
  if (!claims) {
    console.log('No claims! Begone!')
    return callback(null, {
      statusCode: 401,
      body: JSON.stringify({
        data: 'NOT ALLOWED'
      })
    })
  }
  console.log('User is allowed. Let them in')
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      data: 'SECRET STUFFFFFFFFFFFFFF OOOOOOOooooooooooo'
    })
  })
}
