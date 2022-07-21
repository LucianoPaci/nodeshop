import { useRoutes } from 'react-router-dom'
import logo from './logo.svg'
import routes from './app/routes'
import './App.css'

function App() {
  const renderedRoutes = useRoutes(routes)
  return (
    <div className="App">
      {renderedRoutes}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  )
}

export default App
