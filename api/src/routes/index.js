const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getAllGames}= require ("../controllers/getAllGames.js");
const {createGames}= require ("../controllers/createGames.js");
const {getGameByGender}= require ("../controllers/getGameByGender.js");
const {getGameByName}= require ("../controllers/getGameByName.js");
const {getGameById}= require ("../controllers/getGameById.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames', getAllGames);
router.post('/videogames', createGames);
router.get('/genres', getGameByGender);
router.get('/videogames/name', getGameByName);
router.get('/videogames/:id', getGameById);


module.exports = router;
