import React from "react";
import '../styles/allStyles.css'
import '../styles/moreStyles.css'
import Servicios from '../components/Servicios'
import Categorias from "./Categorias";

export default function Inicio (){
    return(
        <>
            <Servicios/>
            <Categorias/>
        </>
    )
}