import './App.css';
import {Route, Routes} from 'react-router-dom'
import Nav from './components/Nav'
import Inicio from './components/Inicio'
import AsideTienda from './components/AsideTienda'
import './styles/allStyles.css'
import './styles/moreStyles.css'
import Footer from './components/Footer'
import Carrito from './components/Carrito'
import Detalle from './components/Detalle'
import Contacto from './components/Contacto';
import Pagar from './components/Pagar'

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={<Inicio></Inicio>}/>
        <Route path='/tienda' element={<AsideTienda/>} />
        <Route path='/carrito' element={<Carrito/>}/>
        <Route path='/contacto' element={<Contacto/>}/>
        <Route path='/finalizar-compra' element={<Pagar/>}/>
        <Route path='/detalle/:id' element={<Detalle/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
