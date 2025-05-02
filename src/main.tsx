import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DegreeProvider } from "./context/DegreeContext.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DegreeProvider>
      <App />
    </DegreeProvider>
  </StrictMode>,
)
