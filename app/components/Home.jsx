import React from 'react'
import { IndexLink } from 'react-router'

import Icon from 'Icon'

export default function Home () {
  return (
    <div>
      <p className='lead text-center'>Can you defeat the bad Boss at level 4?</p>
      <ul className='no-bullet'>
        <li>
          <div className='list-item'>
            <div className='icon-container-home player'>
              <Icon icon='player' viewBox='0 0 1024 1024'/></div>
            <span>you</span>
          </div>
        </li>
        <li>
          <div className='list-item'>
            <div className='icon-container-home foe'>
              <Icon icon='foe' viewBox='0 0 1024 1024'/></div>
            <span>enemy</span>
          </div>
        </li>
        <li>
          <div className='list-item'>
            <div className='icon-container-home boss'>
              <Icon icon='player' viewBox='0 0 1024 1024'/></div>
            <span>boss</span>
          </div>
        </li>
        <li>
          <div className='list-item'>
            <div className='icon-container-home weapon'>
              <Icon icon='weapon' viewBox='0 0 1024 1024'/></div>
            <span>weapon</span>
          </div>
        </li>
        <li>
          <div className='list-item'>
            <div className='icon-container-home heart'>
              <Icon icon='heart' viewBox='0 0 1024 1024'/></div>
            <span>life</span>
          </div>
        </li>
        <li>
          <div className='list-item'>
            <div className='icon-container-home lvl-door'>
              <Icon icon='lvl-door' viewBox='0 0 1024 1024'/></div>
            <span>next lvl</span>
          </div>
        </li>
      </ul>
      <p className='text-center'><strong>Arrow Key</strong> to move around, <strong>Click</strong> will toggle Darkness</p>
      <IndexLink className='button expanded large hollow game-btn' to="game">
        <h5>PLAY NOW !!!</h5>
      </IndexLink>
    </div>
  )
}
