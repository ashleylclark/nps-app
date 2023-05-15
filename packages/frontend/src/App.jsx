import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Search from './pages/search/Search'
import Park from './pages/park/Park'
import Hours from './pages/hours/Hours'
import Camping from './pages/camping/Camping'
import Activities from './pages/activities/Activities'
import Media from './pages/media/Media'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Search />
      <Park />
      <Hours />
      <Activities />
      <Camping />
      <Media />
    </div>
  )
}

export default App
