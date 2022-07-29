import { useRoutes } from 'react-router-dom'
import { ReactComponent as Logo } from './logo.svg'
import routes from './app/routes'
import './App.css'

function App() {
  const renderedRoutes = useRoutes(routes)
  return (
    <div className="App">
      {renderedRoutes}
      <header className="App-header">
        <Logo className="App-logo" />
      </header>
    </div>
  )
}

export default App
