const {producto} = require('../db')

const paginar = async (array) => {
    let productos = array
    let position = 0
    let result = []
        for (let i = 0; i < Math.ceil(productos.length / 9); i++) {
            if (!i) result.push(productos.slice(0,9))
            
            else result.push(productos.slice(position, position + 9))
            position += 9
        }
    return result
} 

module.exports = {paginar}



// let totalArr = []
// let newArr = []
// let vueltas = 0
// let recorrido = 0

// for(const i of array){
//     await newArr.push(i) 
//     recorrido++
//     if(vueltas === 8 || recorrido == array.length - 1){
//         await totalArr.push(newArr)
//         newArr.length === 9 ? newArr = [] : newArr
//         vueltas = 0
//     }else{
//         vueltas++
//     }
// }
// return totalArr