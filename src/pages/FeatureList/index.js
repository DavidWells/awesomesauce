import React from 'react'
import AppLayout from '../../fragments/AppLayout'

const FeatureList = (props) => {

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
          <div className='feature-card-voting-up'>▲</div>
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

export default FeatureList
