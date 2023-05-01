import './App.css';
import {Route, Routes} from 'react-router-dom'
import Nav from './components/Nav'
import Inicio from './components/Inicio'

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={<Inicio></Inicio>}/>
        <Route path='/caca' />

      </Routes>
    </div>
  );
}

export default App;
