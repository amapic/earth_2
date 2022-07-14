import { createRoot } from 'react-dom/client'

import App from './components/Earth'

const root = document.getElementById('root')

if (root) {
  createRoot(root).render(<App />)
}