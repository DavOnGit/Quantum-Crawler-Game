import React from 'react'
import { IndexLink } from 'react-router'

import Icon from 'Icon'

export default function Home () {
  return (
    <div className="view-container">
      <p className='lead'>Can you defeat the bad Boss at level 4?</p>
      <ul className='no-bullet'>
        <li>
          <div className='list-item'>
            <div className='icon-container player'><Icon icon='player'/></div>
            <span>you</span>
          </div>
        </li>
        <li>
          <div className='list-item'>
            <div className='icon-container foe'><Icon icon='foe'/></div>
            <span>enemy</span>
          </div>
        </li>
        <li>
          <div className='list-item'>
            <div className='icon-container boss'><Icon icon='player'/></div>
            <span>boss</span>
          </div>
        </li>
        <li>
          <div className='list-item'>
            <div className='icon-container weapon'><Icon icon='weapon'/></div>
            <span>weapon</span>
          </div>
        </li>
        <li>
          <div className='list-item'>
            <div className='icon-container heart'><Icon icon='heart'/></div>
            <span>life</span>
          </div>
        </li>
        <li>
          <div className='list-item'>
            <div className='icon-container lvl-door'><Icon icon='lvl-door'/></div>
            <span>next lvl</span>
          </div>
        </li>
      </ul>
      <IndexLink className='button expanded large hollow' to="game">Game</IndexLink>
    </div>
  )
}
