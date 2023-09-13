import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames, filterGamesByGenre, filterByOrder, filterByOrigin, filterByRating } from "../../redux/action/action";
import "./filtro.modules.css";
const Filtros = () => {
    const dispatch = useDispatch();
    //traemos todos los generos del juego
    const allgenrres = useSelector((state) => state.allgenrres);

    //creamos los estados locales que captura los eventos del genero
    const [selectedGenre, setselectedGenre] = useState("")

    //estado del ordenamiento
    const [selectedOrder, setselectedOrder] = useState("")

    //estado del rating
    const [selectedRating, setselectedRating] = useState("")

    // creasmo el estado del origen
    const [selectedOrigin, setselectedOrigin] = useState("")
    //creamos la funcion que captura el evento y dispacha la accion
    const handleGenreChange = (event) => {
        dispatch(getAllGames());
        const selectedValue = event.target.value;
        setselectedGenre(selectedValue);
        // Si el valor seleccionado es vacío, mostramos todos los juegos
        if (selectedValue === "Generos") {
            dispatch(getAllGames());
        } else {
            // De lo contrario, filtramos los juegos por género
            dispatch(filterGamesByGenre(selectedValue));
        }
    }

    //creamos el handleOrderChange que captura el evento y dispacha la accion
    const handleOrderChange = (event) => {
        const selectedValue = event.target.value;
        setselectedOrder(selectedValue);
        if (selectedValue === "asc") {
            dispatch(filterByOrder(selectedValue));
        } else if (selectedValue === "desc") {
            dispatch(filterByOrder(selectedValue));
        } else if (selectedValue === "order") {
            dispatch(filterByOrder(selectedValue));
        };
    }
    //creamos el handleRatingChange que captura el evento y dispacha la accion
    const handleRatingChange = (event) => {
        const selectedValue = event.target.value;
        setselectedRating(selectedValue);
        if (selectedValue === "1-5") {
            dispatch(filterByRating(selectedValue));
        } else if (selectedValue === "5-1") {
            dispatch(filterByRating(selectedValue));
        } else if (selectedValue === "Rating") {
            dispatch(filterByRating(selectedValue));
        };
    };

    //creamos el handleOrigin que captura el evento y dispacha la accion
    const handleOrigin = (event) => {
        const selectedValue = event.target.value;
        setselectedOrigin(selectedValue);
        if (selectedValue === "Api") {
            dispatch(filterByOrigin(selectedValue));
        } else if (selectedValue === "DB") {
            dispatch(filterByOrigin(selectedValue));
        } else if (selectedValue === "") {
            dispatch(filterByOrigin(selectedValue));
        };
    };
    // creamos el useefect que ejecuta nuestro handleGenreChange cuando se monta la pagina: 
    useEffect(() => {
        setTimeout(() => {
            dispatch(filterGamesByGenre(selectedGenre));
        }, 2000);
    }, []);

    return (
        <div className="fildiv">
            <div className="divselect">
                <select name="genre" id="genreF" value={selectedGenre} onChange={handleGenreChange}>
                    <option value="">Genres</option>
                    {allgenrres.map((genre) => (
                        <option key={genre.id} value={genre.name}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="divselect">
                <select name="order" id="order" value={selectedOrder} onChange={handleOrderChange}>
                    <option value="order">Order by...</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </div>

            <div className="divselect">
                <select name="ratingO" id="ratingO" value={selectedRating} onChange={handleRatingChange}>
                    <option value="Rating">Rating</option>
                    <option value="1-5">1 - 5</option>
                    <option value="5-1">5 - 1</option>
                </select>
            </div>
            <div className="divselect">
                <select name="Origin" id="Origin" value={selectedOrigin} onChange={handleOrigin}>
                    <option value="">FROM...</option>
                    <option value="Api">Api</option>
                    <option value="DB">Data Base</option>
                </select>
            </div>

        </div>
    )
};

export default Filtros;