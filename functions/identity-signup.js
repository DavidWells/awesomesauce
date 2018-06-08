/* Triggered when a user signs up via Netlify Identity. */
import fetch from 'node-fetch'
const FULLCONTACT_KEY = process.env.FULLCONTACT_KEY

// function test(event, context, callback) {
exports.handler = function(event, context, callback) {
  console.log('identity-signup')
  const body = JSON.parse(event.body)
  const email = body.user.email

  //** Debugger
  console.log('event', event)
  console.log('context', context)
  /**/

  enrichProfileFullContact(email).then((data) => {
    console.log('req data', data)

    if (data.status === 202) {
      // must retry via webhook
      console.log(`Retry ${email} lookup via webhook`, data.requestId)
    }

    // 1. Parse and use user social data

    // 2. Save to external DB

    // 3. Enrich netlify identity profile

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(data)
    })
  }).catch((error) => {
    console.log('> FullContact Error', error)
    return callback(null, {
      statusCode: error.status,
      body: JSON.stringify(error)
    })
  })
}

function enrichProfileFullContact(email) {
  // skip if no fullcontact API key
  if (!FULLCONTACT_KEY) {
    console.log('No process.env.FULLCONTACT_KEY found. Please add one')
    return Promise.reject({
      status: 400,
      message: 'Missing FULLCONTACT_KEY'
    })
  }
  // make request to fullcontact
  console.log(`Searching for ${email} in fullcontact`)
  console.log('fetch', fetch)
  return fetch(`https://api.fullcontact.com/v2/person.json?email=${email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-FullContact-APIKey': FULLCONTACT_KEY
    },
  }).then(response => {
    const contentType = response.headers.get("Content-Type")
    if (contentType && contentType.match(/json/)) {
      return parseJsonResponse(response)
    }

    if (!response.ok) {
      return response.text().then(data => {
        return Promise.reject({
          status: response.status,
          data: data
        })
      })
    }

    return response.text().then(data => data)
  })
}

function parseJsonResponse(response) {
  return response.json().then(json => {
    if (!response.ok) {
      return Promise.reject({
        status: response.status,
        json: json
      })
    }
    return json
  })
}

/*
test({
  body: JSON.stringify({
    user: {
      email: 'neweamil@what.com'
    },
  })
}, {}, function(err, d) {
  console.log('done', d)
})
/**/

/* {
  status: 202,
  message: 'Queued for search. Please retry your query within about 2 minutes. Prefer not to re-submit queries? Try using our webhook option, documented at: http://www.fullcontact.com/developer/docs/person/#webhook-email',
  requestId: 'da80601a-2867-458d-8361-1f9ea4d3c3de'
} */
