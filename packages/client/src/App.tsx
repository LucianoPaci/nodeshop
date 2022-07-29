import { useRoutes } from 'react-router-dom'
import routes from './app/routes'
import './App.css'

function App() {
  const renderedRoutes = useRoutes(routes)
  return <div className="App">{renderedRoutes}</div>
}

export default App
