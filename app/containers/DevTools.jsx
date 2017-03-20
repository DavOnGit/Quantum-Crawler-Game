import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import SliderMonitor from 'redux-slider-monitor'

export default createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-d"
    changePositionKey="ctrl-q"
    defaultPosition='bottom'
    defaultSize={0.12}
    defaultIsVisible={true}
    changeMonitorKey="ctrl-m">
    <SliderMonitor keyboardEnabled />
    <LogMonitor theme="nicinabox"/>
  </DockMonitor>
)
