import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

import 'components-react/styles'

// Wrap app rendering so we can wait for the mock API to initialize
async function start() {
  const root = createRoot(document.getElementById('root')!)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
start()
