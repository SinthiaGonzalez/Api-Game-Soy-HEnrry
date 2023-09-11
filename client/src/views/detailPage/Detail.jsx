import React from "react";
import './details.modules.css'
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'; // importamos el hook useDispatch y useSelector para conectar al estado global
import {useEffect} from 'react'; // importamos el hook useEffect para hacer el dispatch a la action que trae los juegos
import { getGameById } from "../../redux/action/action";

const Details = () => {
    const {id} = useParams(); // obtenemos el id del juego de los parametros de la url
   const dispatch = useDispatch(); //para hacer distpach de la action
   const gameById= useSelector((state) => state.gameById);
    useEffect(() => {
        dispatch(getGameById(id));
    }, [dispatch]); //cada que se monte se hara un dispatch a la action que trae el juego por id
    const { name, image, genres, description, released, rating, platforms } = gameById; // desestrcuturo el objeto que trae el juego por id y lo muestro en el componente que retorna
    return (
        <div className="detail">
            <div className="contDetail">
            <h1>Detalles del juego</h1>
            <img className="img" src={image} alt="img not found" />
            <h3>nombre:{name}</h3>
            <h4>Genero: {genres}</h4>
            <p>Descripcion: {description}</p>
            <h3>Creado:{released}</h3>
            <h3>Rating: {rating}</h3>
            <p>Platforms: {platforms}</p>
            </div>
           
        </div>
    );
};

export default Details;