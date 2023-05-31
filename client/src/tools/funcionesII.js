import axios from 'axios'
import { toast } from 'react-toastify';


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