import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavBar extends Component {
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
