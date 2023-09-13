import React from "react";
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import './validations.modules.css';
import { deleteGenres,validationPass} from '../../../redux/action/action'

const Validations = () => {
  const dispatch = useDispatch(); // Hook de react-redux para dispachar las actions
  let formDataInputs = useSelector((state) => state.formDataInputs); // nos traemos el estado global de formDataInputs que seria la info de los inputs
  //desestructuramos  a formDataInputs para poder usarlo en el html
  const { name, description, rating, genreName, image,platforms,releasedate} = formDataInputs;
  // creamso un esatdo local que monitorea los cambios en genreName
  const [genreNameLocal, setGenreNameLocal] = useState(genreName);
  // creamos el handle para remover los generos
  const handleRemoveGenre = (genre) => {
    // actualizamos el estado local de genreName para reflejar los cambios 
    setGenreNameLocal(genreNameLocal.filter((g) => g !== genre));
    // actualizamos el estado global de genreName para reflejar los cambios
    dispatch(deleteGenres(genre));
  };
//* Validaciones rating e image
  // Realiza la validación del campo de "rating"
  const isRatingValid = rating >= 1 && rating <= 5;
  // validacion de imagen
  function isValidImageUrl(image) {
    // Expresión regular para validar una URL de imagen
    const imageRegex = /\.(jpeg|jpg|gif|png|bmp|svg)$/i;
    return imageRegex.test(image);
  }
  //? Validaciones
  let nameValid = name.length === 0 ? <p>The game name is required</p> : null;
  let descriptionValid = description.length < 30 || description.length > 200 ? <p>Required character 30-200</p> : null;
  let imageValid = isValidImageUrl(image) ? null : <p>The URL image must be valid</p>;
  let ratingValid = isRatingValid ? null : <p>The rating must be between 1 and 5.</p>;
  let platformsValid = platforms.length === 0 ? <p>select a platform</p> : null;
  let releasedateValid = releasedate.length === 0 ? <p>Select a date</p> : null;
  let genreNameValid = genreName.length === 0 ? <p>Select at least one genre</p> : null;

  useEffect(() => {
    // Verificar si todas las validaciones son null
    if (
      nameValid === null &&
      descriptionValid === null &&
      imageValid === null &&
      ratingValid === null &&
      platformsValid === null &&
      releasedateValid === null &&
      genreNameValid === null
    ) {
      // Si todas las validaciones son null, despachar la acción de validación
      dispatch(validationPass(false));
    } else {
      // Si alguna validación no es null, puedes despachar una acción para restablecer el estado global de validación si es necesario
      dispatch(validationPass(true));
    }
  }, [
    nameValid,
    descriptionValid,
    imageValid,
    ratingValid,
    platformsValid,
    releasedateValid,
    genreNameValid,
    dispatch,
  ]);
  return (
    <div className="vali">
      {nameValid}
      {descriptionValid}
      {releasedateValid}
      {imageValid}
      {ratingValid}
      {genreNameValid}
      {platformsValid}
      <div >
        {genreName.map((genre) => (
          <button key={genre} className="btn" onClick={() => handleRemoveGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
      
    </div>

  )
};


export default Validations;