import React from "react";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './validations.modules.css';
import { deleteGenres,validationPass } from '../../../redux/action/action'

const Validations = () => {
  const dispatch = useDispatch(); // Hook de react-redux para dispachar las actions
  let formDataInputs = useSelector((state) => state.formDataInputs); // nos traemos el estado global de formDataInputs que seria la info de los inputs
  //desestructuramos  a formDataInputs para poder usarlo en el html
  const { name, description, rating, genreName, image,platforms,releasedate} = formDataInputs;


  // Realiza la validación del campo de "rating"
  const isRatingValid = rating >= 1 && rating <= 5;
  // creamso un esatdo local que monitorea los cambios en genreName
  const [genreNameLocal, setGenreNameLocal] = useState(genreName);
  // creamos el handle para remover los generos
  const handleRemoveGenre = (genre) => {
    // actualizamos el estado local de genreName para reflejar los cambios 
    setGenreNameLocal(genreNameLocal.filter((g) => g !== genre));
    // actualizamos el estado global de genreName para reflejar los cambios
    dispatch(deleteGenres(genre));
  };
  // validacion de imagen
  function isValidImageUrl(image) {
    // Expresión regular para validar una URL de imagen
    const imageRegex = /\.(jpeg|jpg|gif|png|bmp|svg)$/i;
    return imageRegex.test(image);
  }
  let nameValid = name.length === 0 ? <p>El nombre del juego es obligatorio</p> : null;
  let descriptionValid = description.length < 30 || description.length > 200 ? <p>La descripción debe tener entre 30 y 200 caracteres.</p> : null;
  let imageValid = isValidImageUrl(image) ? null : <p>La imagen debe ser una URL válida.</p>;
  let ratingValid = isRatingValid ? null : <p>El rating debe estar entre 1 y 5.</p>;
  let platformsValid = platforms.length === 0 ? <p>Debe seleccionar una plataforma</p> : null;
  let releasedateValid = releasedate.length === 0 ? <p>Debe seleccionar una fecha</p> : null;
  let genreNameValid = genreName.length === 0 ? <p>Debe seleccionar por lo menos un genero</p> : null;
// creamos el esatdo local del boton ok
  const [ok, setOk] = useState(false);
  useEffect(() => {
    // Verificar si hay algún párrafo de error visible
    const hasErrors = nameValid || descriptionValid || imageValid || ratingValid || platformsValid || releasedateValid || genreNameValid;
  
    // Actualizar el estado local "ok" en función de si hay errores o no
    setOk(!hasErrors);
  }, [nameValid, descriptionValid, imageValid, ratingValid, platformsValid, releasedateValid, genreNameValid]);
  
// creamos el handleOkDispatch para enviar la action de validacionPass
  const handleOkDispatch = () => {
    dispatch(validationPass(true))
  }

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
          <button key={genre} className="BTN" onClick={() => handleRemoveGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
      <div><button key="ok" onClick={handleOkDispatch} disabled={!ok}>OK</button></div>
    </div>

  )
};



export default Validations;