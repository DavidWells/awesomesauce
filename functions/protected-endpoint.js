import jwt from 'jsonwebtoken'

function checkAuth(authToken) {
  return new Promise((resolve, reject) => {
    // Now Verify the jwt token is valid
    try {
      jwt.verify(authToken, process.env.SECRET, {}, (verifyError, decoded) => {
        if (verifyError) {
          console.log('Token signature NOT VERIFIED', verifyError)
          return reject(new Error('Token signature NOT VERIFIED'))
        }
        // output for logs
        console.log('------------------')
        console.log('decoded jwt token')
        console.log(decoded)
        console.log('------------------')
        // Everything is ok!
        return resolve(decoded)
      })
    } catch (err) {
      console.log('jwt.verify exception', err)
      return reject(err)
    }
  })
}

/* Protected function */
exports.handler = function(event, context, callback) {
  console.log('protected function!')
  const claims = context.clientContext && context.clientContext.user
  if (!claims) {
    return callback(null, {
      statusCode: 401,
      body: JSON.stringify({
        data: 'NOT ALLOWED'
      })
    })
  }
  // Use the event data auth header to verify
  checkAuth(event).then((user) => {
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        data: 'SECRET STUFFFFFFFFFFFFFF OOOOOOOooooooooooo'
      })
    })
  }).catch((errorMsg) => {
    console.log('errorMsg', errorMsg)
    console.log(typeof errorMsg)
    // return error back to app
    return callback(null, {
      statusCode: 401,
      body: JSON.stringify({
        error: errorMsg,
      })
    })
  })
}
