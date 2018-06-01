import React, { Component } from 'react'
import logo from './logo.svg'
import netlifyIdentity from 'netlify-identity-widget'
import './App.css'

class App extends Component {
  handleLogIn = () => {
   // You can import the widget into any component and interact with it.
   netlifyIdentity.open()
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Awesomesauce</h1>
        </header>
        <p className="App-intro">
          Lets do this
           <button onClick={this.handleLogIn} >Log in with netlify</button>
        </p>
      </div>
    )
  }
}

export default App
