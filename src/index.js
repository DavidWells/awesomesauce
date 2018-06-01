import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import netlifyIdentity from 'netlify-identity-widget'

window.netlifyIdentity = netlifyIdentity
// You must run this once before trying to interact with the widget
netlifyIdentity.init()

const user = netlifyIdentity.currentUser();
console.log('user', user)

ReactDOM.render(<App />, document.getElementById('root'))
