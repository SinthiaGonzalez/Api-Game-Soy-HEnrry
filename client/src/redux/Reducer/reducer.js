import { GET_ALL_GAMES, GET_GAME_BY_ID, FORM_DATA, POST_FORM_DATA_ERROR, POST_FORM_DATA, DELETE_GENRES, VALIDATION_PASS, GET_GAME_BY_NAME, FILTER_GAMES_BY_GENRE, FILTER_BY_ORDER, FILTER_BY_ORIGIN, FILTER_BY_RATING, GET_ALL_GENRES } from "../action/action"; // importamos la types de la accion que creamos


//* creamos nuestro esatdos iniciales
const initialState = {
  allgames: [], // guardamos todos los juegos en el estado global para el home
  gameById: [], // guardamos el juego por id en el estado global para el details
  allgenrres: [], // guardamos todos los generos en el estado global para el form
  formDataInputs: {
    name: "",
    description: "",
    rating: "",
    platforms: "",
    releasedate: "",
    image: "",
    genreName: [],
  }, // guardamos los datos del formulario en el estado global
  postFormDataResponse: [], // guardamos el error/ exito en el estado global 
  validationPass: true,
  gameByname: [],
  filterSelected: [], //almacena el genero del filtro selecionado
  filteredGames: [], //almacena los juegos filtrados por genero
  filterOrigin: [], //almacena los juegos sea api o db
  selectedOrigin: [], //almacena la seleccion del usuario sea api o db
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        allgames: action.payload,
      };
    case GET_ALL_GENRES:
      return {
        ...state,
        allgenrres: action.payload,
      }
    case GET_GAME_BY_ID:
      return {
        ...state,
        gameById: action.payload,
      };
    case GET_GAME_BY_NAME:
      return {
        ...state,
        gameByname: action.payload,
      }
    case FORM_DATA:
      return {
        ...state,
        formDataInputs: action.payload,
      };
    case POST_FORM_DATA:
      return {
        ...state,
        formDataInputs: {
          name: "",
          description: "",
          rating: "",
          platforms: "",
          releasedate: "",
          image: "",
          genreName: []
        },// limpiamos el estado global
        postFormDataResponse: action.payload, // guardamos la respuesta de exito en el estado global

      };
    case POST_FORM_DATA_ERROR:
      return {
        ...state,
        postFormDataResponse: action.payload, // guardamos la respuesta de error en el estado global
      };
    case DELETE_GENRES:
      // Crea una copia del estado actual para mantener la inmutabilidad
      const updatedState = { ...state };
      // Encuentra el índice del género que se va a eliminar
      const genreIndex = updatedState.formDataInputs.genreName.indexOf(action.payload);
      // Si el género está en el array, elimínalo
      if (genreIndex !== -1) {
        updatedState.formDataInputs.genreName.splice(genreIndex, 1);
      }
      // Devuelve el nuevo estado actualizado
      return updatedState;
    case VALIDATION_PASS:
      return {
        ...state,
        validationPass: action.payload,
      }
    case FILTER_GAMES_BY_GENRE:
      const genreselected = action.payload;
      //realizamos el filtro
      const gamesFiltered = state.allgames.filter((game) => {
        return genreselected ? game.genres.includes(genreselected) : true;
      });
      return {
        ...state,
        filterSelected: genreselected,
        filteredGames: gamesFiltered,
      }
    case FILTER_BY_ORDER:
      const order = action.payload;
      let sortedGames = [...state.filteredGames]; // Clonamos la lista para no mutar el estado original

      if (order === "asc") {
        // Orden ascendente
        sortedGames.sort((a, b) => a.name.localeCompare(b.name));
      } else if (order === "desc") {
        // Orden descendente
        sortedGames.sort((a, b) => b.name.localeCompare(a.name));
      } else if (order === "order") {
        sortedGames = [...state.allgames];
      };
      return {
        ...state,
        filteredGames: sortedGames,
      };
    case FILTER_BY_RATING:
      const rating = action.payload;
      let filteredGamesByRating;

      if (rating === "1-5") {
        // Ordenar los juegos por rating de menor a mayor (1-5)
        filteredGamesByRating = [...state.filteredGames].sort((a, b) => a.rating - b.rating);
      } else if (rating === "5-1") {
        // Ordenar los juegos por rating de mayor a menor (5-1)
        filteredGamesByRating = [...state.filteredGames].sort((a, b) => b.rating - a.rating);
      } else if (rating === "Rating") {
        // no aplicamos filtro
        filteredGamesByRating = [...state.allgames];
      }
      return {
        ...state,
        filteredGames: filteredGamesByRating,
      };

    case FILTER_BY_ORIGIN:
      const origin = action.payload;
      const filteredGames1 = [...state.filteredGames];
      let filteredGamesByOrigin;

      if (origin === "DB") {
        // Filtrar juegos con ID alfanuméricos (ejemplo: "431e07c9-1c7c-4439-8f5a-22a76d73eb6b")
        filteredGamesByOrigin = filteredGames1.filter((game) => typeof game.id === "string");
      } else if (origin === "Api") {
        // Filtrar juegos con ID numéricos (ejemplo: 603314)
        filteredGamesByOrigin = filteredGames1.filter((game) => typeof game.id === "number");
      }
      return {
        ...state,
        selectedOrigin: origin,
        filterOrigin: filteredGamesByOrigin,
      };
    default:
      return state;
  }
};
export default rootReducer; //exportamos el reducer para poder usarlo en el store.js