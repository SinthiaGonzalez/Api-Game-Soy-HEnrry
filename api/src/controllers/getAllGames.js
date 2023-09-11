const axios = require('axios'); // importamos axios para hacer las peticiones a la api y a la base de datos
require('dotenv').config();
const {RAWG_API_KEY} = process.env; // importamos la api key de la api de rawg desde las variables de entorno
const url = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}`;
 // creamos la url de la api de rawg CON SU APIKEY
const { Videogame,Genres } = require('../db.js'); // importamos el modelo de la base de datos
const getAllGames= async (req, res) => {
    try{
       
     
       
        const url2 = `${url}&page_size=100`;
        const apiResponse = await axios.get(url2);

            const apiGames = apiResponse.data.results.map(game => {
                const { name, background_image, rating, released, id, genres,} = game;
                return {
                    id,
                    name,
                    background_image,
                    rating,
                    released,
                    genres: genres.map(genre => genre.name)
                };
            });
        

        //obtener los juegos de la base de datos
        const dbGames = await Videogame.findAll({
            include: {
                model:Genres,
                attributes:['name'],
                through:{attributes:[]},
            }
        });
        // Mapear los juegos de la base de datos para que la estrcutura sea la misma que la de la api
        const dbGamesMapped = dbGames.map(game => {
            const { id, name, platforms, image, rating, releasedate, genres } = game;
            return {
                id,
                name,
                platform: platforms, // Mapear "platforms" a "platform"
                background_image: image, // Mapear "image" a "background_image"
                rating,
                released: releasedate, // Mapear "releasedate" a "released"
                genres: genres.map(genre => genre.name)
            };
        });
        
       
        return res.json(apiGames.concat(dbGamesMapped)); // retornamos los juegos de la api y de la base de datos
    }catch(error){
       // Aquí manejas el error
       if (error.response) {
        // Error de la API
        return res.status(500).json({ error: 'Error al traer los juegos de la API' });
    } else {
        // Error de otro tipo
        return res.status(501).json({ error: 'Error al obtener los juegos de la base de datos' });
    }

    } 
};
module.exports = {getAllGames}; // exportamos el controlador