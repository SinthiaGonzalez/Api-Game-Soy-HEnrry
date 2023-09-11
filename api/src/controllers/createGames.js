const { Videogame, Genres } = require("../db.js"); // importamos el modelo de la base de datos
const { conn } = require("../db.js"); // importamos la conexion a la base de datos

const createGames = async (req, res) => {
    try {
        //recibimos los datos del body
        const { name, image, releasedate, rating, description, platforms, genreName } = req.body;
console.log(genreName + "esto es genreName");
        // gurdamos los generos en un array
        const genres = genreName; // gurdamos los generos

        // Buscamos los géneros existentes en la base de datos
        const existingGenres = [];

        for (const genre of genres) {
            const foundGenre = await Genres.findOne({ where: { name: genre } });

            if (foundGenre) {
                existingGenres.push(foundGenre);
            }
        }

        //creamos el juego en la base de datos
        const creatG = await Videogame.create({
            name,
            image,
            releasedate,
            rating,
            description,
            platforms
        }); // creamos el juego en la base de datos



        // Agregamos la asociación entre el juego creado y el género
        for (const genre of existingGenres){
            await creatG.addGenre(genre);
        }
        
        return res.status(201).json({ message: "Juego creado con Exito" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al crear el juego en la base de datos' });
    }
};
module.exports = { createGames }; // exportamos el controlador