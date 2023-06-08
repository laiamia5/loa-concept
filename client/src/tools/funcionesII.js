import axios from 'axios'
import { toast } from 'react-toastify';
import store from '../redux/store';


export const datos = async () => {
    try {
        const response = await axios.get('http://localhost:3001/info');
        return response.data
      } catch (error) {
        console.error(error);
        throw error;
      }
}

export const showToastMessage = (status, mensaje) => {
  status == 'success'
  ? toast.success(mensaje, {
      position: toast.POSITION.TOP_RIGHT
  })
  : toast.error(mensaje, {
      position: toast.POSITION.TOP_RIGHT
  });
}

export const corroborarStock = async (id, cantidad) => {
  let stock = await axios.get(`http://localhost:3001/productos/${id}`).then((res) => res.data.stock).catch((err) => console.log(err))
  let ps = await store.getState().carrito.filter((ele) => ele.id == id).map((e) => e.cantidad)
  let sumario = await ps.reduce((acc, x) => acc + x , 0)
  let total = sumario + cantidad

  if(total <= stock) return true
  else return false
}
