/* Triggered when a user signs up via Netlify Identity. */
exports.handler = function(event, context, callback) {
  console.log('identity-signup')
  console.log('event', event)
  console.log('context', context)
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      data: true
    })
  })
}

const FULLCONTACT_KEY = process.env.FULLCONTACT_KEY;

  // skip if no email
  if (!user.email) {
    return callback(null, user, context);
  }
  // skip if fullcontact metadata is already there
  if (user.user_metadata && user.user_metadata.fullcontact) {
    return callback(null, user, context);
  }
  // make request
  var options = {
    url: 'https://api.fullcontact.com/v2/person.json',
    qs: {
      email:  user.email,
      apiKey: FULLCONTACT_KEY
    }
  };
  request(options, function(error, response, body) {
    if (error || (response && response.statusCode !== 200)) {
      // swallow fullcontact api errors and just continue login
      return callback(null, user, context);
    }
    // if we reach here, it means fullcontact returned info
    // and we'll add it to the metadata
    user.user_metadata = user.user_metadata || {};
    user.user_metadata.fullcontact = JSON.parse(body);

    auth0.users.updateUserMetadata(user.user_id, user.user_metadata);
    return callback(null, user, context);
  });
