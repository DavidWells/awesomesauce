import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { callProtectedEndpoint } from '../../utils/api'
import netlifyIdentity from 'netlify-identity-widget'

class NavBar extends Component {
  callAddonApi = () => {
    const apiUrl = '/.netlify/demo'
    const user = netlifyIdentity.currentUser()
    if (user) {
      user.jwt().then((token) => {
        console.log('calling /.netlify/demo', token)
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            text: 'hi'
          })
        }).then((resp) => {
          console.log('resp', resp)
          return resp.json()
        }).then((data) => {
          console.log('data', data)
          alert(JSON.stringify(data))
        })
      })
    } else {
      console.log('calling /.netlify/demo no auth')
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer xxx`
        },
        body: JSON.stringify({
          text: 'hi'
        })
      }).then((resp) => {
        console.log('resp', resp)
        return resp.json()
      }).then((data) => {
        console.log('data', data)
        alert(JSON.stringify(data))
      })
    }
  }
  render() {
    const { auth, user } = this.props
    console.log('auth', auth)
    let leftNavContents = (
      <div>
        <Link to={`/profile/`}>
          Profile (protected)
        </Link>
      </div>
    )

    let rightNavContents = (
      <span className='right-nav-contents'>
        <a href="https://github.com/netlify/awesomesauce">
          View on Github
        </a>
        <button style={{marginLeft: 20, background: 'pink'}} onClick={this.callAddonApi}>
          Call API
        </button>
        <button style={{marginLeft: 20, background: 'pink'}} onClick={() => callProtectedEndpoint('explode-application')}>
          EXPLODE APPLICATION
        </button>
        <button style={{marginLeft: 20}} onClick={() => auth.open()}>
          Log In
        </button>
      </span>
    )

    if (user) {
      leftNavContents = (
        <span>
          <Link to={`/add/`}>
            Request a Feature
          </Link>
          <Link to={`/profile/`}>
            Profile
          </Link>
        </span>
      )
      rightNavContents = (
        <span>
          <Link to={`/profile/`}>
            Profile
          </Link>
          <Link style={{marginLeft: 20}} to={`/add/`} className={'button-primary'}>
            Request a Feature
          </Link>
          <button style={{marginLeft: 20, background: 'pink'}} onClick={this.callAddonApi}>
            Call API
          </button>
          <button style={{marginLeft: 20, background: 'pink'}} onClick={() => callProtectedEndpoint('explode-application')}>
            EXPLODE APPLICATION
          </button>
          <button style={{marginLeft: 20}} onClick={() => auth.logout()}>
            Log Out
          </button>
        </span>
      )
    }

    const leftNav = (
      <div className='navbar-left'>
        <Link className='navbar-logo' title='logo' to='/'>
          <img alt='home' src="https://www.netlify.com/img/press/logos/full-logo-light.svg" />
          Feature Requests
        </Link>
      </div>
    )

    const rightNav = (
      <div className='navbar-right'>
        {rightNavContents}
      </div>
    )

    return (
      <div>
        <nav className='navbar'>
          {leftNav}
          {rightNav}
        </nav>
        <div className='navbar-spacer' />
      </div>
    )
  }
}

export default NavBar
