import React from 'react'
import AppLayout from '../../fragments/AppLayout'

export default class FeatureList extends React.Component {
  callApi = () => {
    console.log('calling API')
    return fetch('/.netlify/functions/protected-endpoint', {
      method: 'POST',
      body: JSON.stringify({
        text: 'hi'
      })
    }).then((resp) => {
      return resp.json()
    }).then((data) => {
      alert(JSON.stringify(data))
    })
  }
  render() {
    const features = [
      {
        title: 'Add cool stuff',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae mau'
      },
      {
        title: 'Add more awesomesauce',
        description: 'Please can I haz more awesum?'
      },
      {
        title: 'Make product less great',
        description: 'The product is too sexy. Plz make less sexy. #TooMuch'
      }
    ]

    const list = features.map((feature, i) => {
      return (
        <div className='feature-card' key={i}>
          <div className='feature-card-voting'>
            <div className='feature-card-voting-up' onClick={this.callApi}>▲</div>
            <div className='feature-card-voting-count'>12</div>
            <div className='feature-card-voting-down'>▼</div>
          </div>
          <div className='feature-card-content'>
            <div className='feature-card-title'>
              {feature.title}
            </div>
            <div>
              {feature.description}
            </div>
          </div>
        </div>
      )
    })

    return (
      <AppLayout>
        <div>
          {list}
        </div>
      </AppLayout>
    )
  }
}
