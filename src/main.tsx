import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import './assets/styles/global.scss'
import 'react-image-crop/src/ReactCrop.scss'
import './config/Gapi'
import './config/Dayjs'
import '@utils/RegisterBuffer'


let container: HTMLElement | null = null

document.addEventListener('DOMContentLoaded', function () {
  if (!container) {
    container = document.getElementById('root') as HTMLElement
    const root = createRoot(container)
    root.render(
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    )
  }
})
