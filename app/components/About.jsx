import React from 'react'
import Icon from 'Icon'

export default function About (props) {
  return (
    <div className="view-container">
      <p className='lead'>
        React framework power up <span>this</span> User Interface
      </p>
      <div>
        <ul className='no-bullet'>
          <li>
            <div className='list-item'>
              <div className='icon-container-about player'>
                <Icon icon='react'viewBox='0 0 128 128'/>
              </div>
              <span>React & Redux are awesome togheter!</span>
            </div>
          </li>
          <li>
            <div className='list-item'>
              <div className='icon-container-about foe'>
                <Icon icon='babel' viewBox='0 0 128 128'/>
              </div>
              <span>ES6 and JSX transpiling to vanilla Js.</span>
            </div>
          </li>
          <li>
            <div className='list-item'>
              <div className='icon-container-about boss'>
                <Icon icon='sass' viewBox='0 0 128 128'/>
              </div>
              <span>Sass boost my css</span>
            </div>
          </li>
          <li>
            <div className='list-item'>
              <div className='icon-container-about heart'>
                <Icon icon='node' viewBox='0 0 128 128'/>
              </div>
              <span>Node.js provides a package rich ecosystem</span>
            </div>
          </li>
          <li>
            <div className='list-item'>
              <div className='icon-container-about weapon'>
                <Icon icon='heroku' viewBox='0 0 128 128'/>
              </div>
              <span>Heroku is our kind host</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
