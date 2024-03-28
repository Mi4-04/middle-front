import { type ReactElement, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './containers/Application'

const $root = document.body.querySelector('#app')

if ($root == null || !($root instanceof HTMLElement)) throw new TypeError('application root element is not found')

mountApp(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  $root
).catch(console.error)

async function mountApp(element: ReactElement, container: HTMLElement): Promise<{ unmount: () => void }> {
  const root = createRoot(container)
  root.render(element)
  return {
    unmount() {
      root.unmount()
    }
  }
}
