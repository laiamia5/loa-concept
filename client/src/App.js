import './App.css';
import {Route, Routes} from 'react-router-dom'
import Nav from './components/Nav'
import Inicio from './components/Inicio'
import AsideTienda from './components/AsideTienda'

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={<Inicio></Inicio>}/>
        <Route path='/tienda' element={<AsideTienda/>}/>
      </Routes>
    </div>
  );
}

export default App;
