const axios = require('axios'); // importamos axios para hacer las peticiones a la api y a la base de datos
require('dotenv').config();
const {RAWG_API_KEY} = process.env; // importamos la api key de la api de rawg desde las variables de entorno
const url = `https://api.rawg.io/api/genres?key=${RAWG_API_KEY}`;// creamos la url de la api de rawg CON SU APIKEY
const {Genres } = require('../db.js'); // importamos el modelo de la base de datos donde guardaremos todos los generos

const getGameByGender = async (req, res) => {
    try{
       // verificamos que la base de datos este vacia
         let genres = await Genres.findAll(); // buscamos todos los generos en la base de datos 
         if (!genres.length) {
            // si la base de datos esta vacia hacemos la peticion a la api
            const response = await axios.get(url); // hacemos la peticion a la api
            const genresFromAPI = response.data.results.map((genre) => {
                return {
                    name: genre.name,
                };
            }); // mapeamos los generos de la api y gurdamos solo el nombre de cada uno en genresFromAPI

            // guardamos los generos en la base de datos
            await Genres.bulkCreate(genresFromAPI);
            genres = genresFromAPI; // Actualizamos el valor de "genres" para que contenga los generos de la api y si ya los contiene siempre los devolvera de la base de datos
        }
        console.log(genres);
        return res.status(200).json(genres); // retornamos los generos
        console.log(genres);
    }catch(error){
        console.log(error);
        return res.status(500).json({error: 'Error al obtener los generos'});
    } 
} // creamos la funcion que usaremos en el get de la ruta /genres

module.exports = {getGameByGender}; // exportamos la funcion para usarla en el router