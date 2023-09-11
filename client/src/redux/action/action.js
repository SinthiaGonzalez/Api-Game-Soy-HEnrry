import axios from 'axios'; // importamos axios pra las peticiones 

//creamos las constantes para las acciones es decir los types

export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const GET_GAME_BY_ID = 'GET_GAME_BY_ID';
export const GET_GAME_BY_NAME = 'GET_GAME_BY_NAME';
export const FORM_DATA = 'FORM_DATA';
export const POST_FORM_DATA = 'POST_FORM_DATA';
export const POST_FORM_DATA_ERROR= 'POST_FORM_DATA_ERROR';
export const DELETE_GENRES = 'DELETE_GENRES';
export const VALIDATION_PASS= 'VALIDATION_PASS';
export const FILTER_GAMES_BY_GENRE = 'FILTER_GAMES_BY_GENRE';
export const FILTER_BY_ORDER = 'FILTER_BY_ORDER';
export const FILTER_BY_RATING = 'FILTER_BY_RATING';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
//creamos la funcion que va a hacer la peticion a la api y base de datos que creamos junto a la accion que va a ejecutar
export const getAllGames = () => {
    return async (dispatch) => {
        const response = await axios.get('http://localhost:3001/videogames');
        dispatch({
            type: GET_ALL_GAMES,
            payload: response.data,
        });
    };
};
// recibimos el id  hacemos la peticion al backend, este nos devuelve la repsuesta y la guardamos en el payload
export const getGameById = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:3001/videogames/${id}`);
        dispatch({
            type: GET_GAME_BY_ID,
            payload: response.data,
        });
    };
};
// obtenemos los juegos por nombre y los guardamos en el payload
export const getGameByName = (name) => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:3001/videogames/name?name=${name}`);
        dispatch({
            type: GET_GAME_BY_NAME,
            payload: response.data,
        });
    };
};
// recibimos los datos del formulario y los guardamos en un estado global para poder usarlos en cualquier componente
export const formData = (data) => {
    return {
        type: FORM_DATA,
        payload: data,
    };
}
// cuando el boton submit se actualice hacemos el post al backend con los datos del estado global
export const postFormData = (data) => {
    return async (dispatch) => {
        try{
            const response = await axios.post('http://localhost:3001/videogames', data);
            dispatch({
                type: POST_FORM_DATA,
                payload: response.data, // guardamos la respuesta en el estado global si es exitosa
            });
        } catch (error) {
            dispatch({
                type: POST_FORM_DATA_ERROR,
                payload: error.response.data,
            }) // si hay un error guardarlo en el estado global
        }
        
    };
};    
// creamos la action que elimina los generos
export const deleteGenres = (genre) => {
    return {
        type: DELETE_GENRES,
        payload: genre,
    };
}
// creamos la action que confirma la validacion de los inputs
export const validationPass = (buleano) => {
    return {
        type: VALIDATION_PASS,
        payload: buleano,
    };
}
// creamos la action que filtra los juegos por genero
export const filterGamesByGenre = (genreselected) => {
    return {
        type: FILTER_GAMES_BY_GENRE,
        payload: genreselected,
    };
};
// creamos la action que filtra los juegos por orden
export const filterByOrder = (order) => {
    return {
        type: FILTER_BY_ORDER,
        payload: order,
    };
};
// creamos la action que filtra los juegos por rating
export const filterByRating = (rating) => {
    return {
        type: FILTER_BY_RATING,
        payload: rating,
    };
};

// creamos la action que filtra los juegos por origen
export const filterByOrigin = (origin) => {
    return {
        type: FILTER_BY_ORIGIN,
        payload: origin,
    };
};