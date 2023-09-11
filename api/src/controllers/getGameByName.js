const axios = require('axios'); // importamos axios para hacer las peticiones a la api y a la base de datos
require('dotenv').config();
const { RAWG_API_KEY } = process.env; // importamos la api key de la api de rawg desde las variables de entorno
const url = `https://api.rawg.io/api/games`;
// creamos la url de la api de rawg CON SU APIKEY
const { Videogame,Genres } = require('../db.js'); // importamos el modelo de la base de datos
const { Op } = require('sequelize'); // importamos el operador de sequelize para hacer las consultas a la base de datos

const getGameByName = async (req, res) => {
    try {
        const { name } = req.query;
        const lowerCaseName = name.toLowerCase(); // pasamos el nombre a minusculas
    
        const gamesApi = await axios.get(`${url}?search=${lowerCaseName}&key=${RAWG_API_KEY}`); // hacemos la peticion a la api de rawg
        const apigamesName = gamesApi.data.results; // guardamos los resultados de la peticion

// mapeamos para tener los datos que necesitamos
        const apigamesNameMapped = apigamesName.map(game => {
            const { name, background_image, rating, released, id, genres } = game;
            return {
                id,
                name,
                background_image,
                rating,
                released,
                genres: genres.map(genre => genre.name)
            };
        });

       // obtenemos los juegos de la base de datos por nombre con el operador like
        const gamesDb = await Videogame.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${lowerCaseName}%` //me trae juegos que contengan el nombre o tengan una palabra que lo contenga
                }   
            },
            include: {
                model:Genres,
                attributes:['name'],
                through:{attributes:[]},
            }
        });
        // mapeamos para tener los datos que necesitamos
        const gamesDbMapped = gamesDb.map(game => {
            const { id, name, image, rating, releasedate, genres } = game;
            return {
                id,
                name,
                background_image: image, // Mapear "image" a "background_image"
                rating,
                released: releasedate, // Mapear "releasedate" a "released"
                genres: genres.map(genre => genre.name)
            };

        });
        
        const allgames = [ ...gamesDbMapped,...apigamesNameMapped]; // guardamos los resultados de la api y de la base de datos en un array
        if (allgames.length === 0) return res.status(404).json({ message: 'No se encontraron juegos con ese nombre' });

        return res.status(200).json(allgames.slice(0, 15));
        // devolvemos los primeros 15 resultados de la busqueda
       

        

    } catch (error) {
    console.log(error)
        res.status(404).json({ message: 'No se encontraron juegos con ese nombre' });
    }
}
module.exports = { getGameByName }; // exportamos el controlador