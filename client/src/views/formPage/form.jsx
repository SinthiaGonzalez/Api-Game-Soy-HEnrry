import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { formData, postFormData, validationPass } from '../../redux/action/action'
import './form.modules.css'
import Validations from "./validations/validations";

const Form = () => {
  const dispatch = useDispatch(); // Hook de react-redux para dispachar las actions
  let formDataInputs = useSelector((state) => state.formDataInputs); // nos traemos el estado global de formDataInputs que seria la info de los inputs
  let validationPassState = useSelector((state) => state.validationPass); // nos traemos el buleano de validacionPass

  const handleSubmit = function (event) { //entra el evento de hacer click en el boton submit
    event.preventDefault(); // Previene el comportamiento default del submit de un formulario
    if (validationPassState === true) {
      dispatch(postFormData(formDataInputs)); // Enviamos la action al back con la info de los inputs
      alert("Se creo el juego con exito !!"); // Alerta de que se creo el juego
      dispatch(validationPass(false))
    }else{
      alert('verifique los datos ingresados y presione OK')
    }
  };// Función para manejar el submit de los inputs es decir eniviar la info al back


  const handleInputChange = function (event) {
    dispatch(formData({ // Enviamos la action al reducer con la info de los inputs cada vez que se cambia el valor de los inputs
      ...formDataInputs, // Traemos el estado global de formDataInputs
      [event.target.name]: event.target.value, // Traemos el valor de los inputs
    }));
  }; // Función para manejar los cambios de los inputs
  //! definimos los handles para el input de genreName y platforms

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value; // Obtén el valor de la opción seleccionada
    const updatedGenres = [...formDataInputs.genreName]; // Copia la lista actual de géneros

    if (!updatedGenres.includes(selectedGenre)) {
      // Verifica si el género ya está en la lista
      updatedGenres.push(selectedGenre); // Agrega el género a la lista si no está presente
    }

    dispatch(formData({
      ...formDataInputs,
      genreName: updatedGenres, // Actualiza el estado con la lista de géneros seleccionados
    }));
  };

  const handlePlatformsChange = (event) => {
    const selectedPlatform = event.target.value; // Obtén el valor de la plataforma seleccionada
    dispatch(formData({
      ...formDataInputs,
      platforms: selectedPlatform, // Actualiza el estado con la plataforma seleccionada
    }));
  };


  //* asignamos lo valores del formdat al value para que concida con los del estado global 
  return (
    <div className="Div">
      <form onSubmit={handleSubmit} className="form">
        <div >
          <label htmlFor="name">Nombre del juego:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formDataInputs.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formDataInputs.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="releasedate">Fecha de Lanzamiento:</label>
          <input
            type="date"
            id="releasedate"
            name="releasedate"
            value={formDataInputs.releasedate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">URL de la Imagen:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formDataInputs.image}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formDataInputs.rating}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="genreName">Genre:</label>
          <select
            id="genreName"
            name="genreName"
            multiple={false}
            value={formDataInputs.genreName}
            onChange={handleGenreChange}
            required
          >
            <option value="Family">Family</option>
            <option value="Card">Card</option>
            <option value="Arcade">Arcade</option>
            <option value="Racing">Racing</option>
            {/* Agrega más opciones según tus necesidades */}
          </select>
        </div>
        <div>
          <label htmlFor="platforms">Plataformas:</label>
          <select
            id="platforms"
            name="platforms"
            value={formDataInputs.platforms}
            onChange={handlePlatformsChange}
            required
          >
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            {/* Agrega más opciones según tus necesidades */}
          </select>
        </div>
        <button type="submit">Crear</button>
      </form>
      <Validations />
    </div>

  );
};

export default Form;