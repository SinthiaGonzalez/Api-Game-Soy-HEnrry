const axios = require('axios'); // importamos axios para hacer las peticiones a la api y a la base de datos
require('dotenv').config();
const { RAWG_API_KEY } = process.env; // importamos la api key de la api de rawg desde las variables de entorno
const url = `https://api.rawg.io/api/games`;
// creamos la url de la api de rawg CON SU APIKEY
const { Videogame, Genres} = require('../db.js'); // importamos el modelo de la base de datos



const getGameById = async (req, res) => {
    const { id } = req.params;

    try {
         // Si el ID parece ser un UUID válido, buscar en la base de datos
        if (/^[0-9a-fA-F-]{36}$/.test(id)) {
           
            let gameDB = await Videogame.findByPk(id, { include:{
                model:Genres,
                attributes:['name'],
                through:{attributes:[]},
            }});

            if (gameDB) {
                //mapeamos los datos de la base de datos para que coincidan con los de la api
                DBgameMapeo = {
                    id: gameDB.id,
                    name: gameDB.name,
                    description: gameDB.description,
                    released: gameDB.releasedate,
                    rating: gameDB.rating,
                    platforms: gameDB.platforms.split(','),
                    genres: gameDB.genres.map((genre) => (genre.name)),
                    image: gameDB.image,

                };
                // Si se encuentra en la base de datos, retornarlo
                return res.json(DBgameMapeo);
            }
        }

        const responseApi = await axios.get(`${url}/${id}?key=${RAWG_API_KEY}`);
        const gameApi = responseApi.data;

        if (gameApi) {
            // Verificamos si la respuesta de la API contiene datos
            const game = {
                id: gameApi.id,
                name: gameApi.name,
                description: gameApi.description,
                released: gameApi.released,
                rating: gameApi.rating,
                platforms: gameApi.platforms.map((platform) => platform.platform.name),
                genres: gameApi.genres.map((genre) => genre.name),
                image: gameApi.background_image,
            };
            return res.json(game);
        }
    } catch (error) {
        // Manejo de errores
        console.error('Error:', error);

        if (error.response) {
            // Error de la API
            return res.status(500).json({ error: 'No existen juegos con ese id en la API' });
        } else {
            // Error de otro tipo
            return res.status(501).json({ error: 'Error al obtener los juegos de la base de datos' });
        }
    }
};


module.exports = { getGameById };