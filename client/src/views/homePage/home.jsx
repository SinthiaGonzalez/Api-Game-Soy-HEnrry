import React from 'react';
import { useSelector } from 'react-redux'; // importamos el hook useDispatch y useSelector para conectar al estado global
import { useState } from 'react'; 
import Cards from '../../components/Cards/Cards'; // importamos el componente Cards al que le pasamos por props los juegos
import './home.modules.css' // importamos el css del componente Home
import Navbar from '../../components/Navbar/navbar'; // importamos el componente Navbar
import Filtros from '../../components/filtro/filtro'; // importamos el componente Filtros


function Home() {
 

  //traemos el estado con los juegos filtrados es el backup del filtro sea por genero o por asendente o desendente, rating
  const filteredGames = useSelector((state) => state.filteredGames);

  //traemos el estado con los juegos filtrados por origen si es APi o DB
  const filteredByOrigin = useSelector((state) => state.filterOrigin);

  //traemos el estado que contiene si el usuario seleciono origen de Api o DB
  const selectedOrigin = useSelector((state) => state.selectedOrigin);

  //*paginado
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Número de elementos que se muestra por página
  const indexOfLastItem = currentPage * itemsPerPage; // Índice del último elemento de cada página = a la pagina actual * el numero de elementos por pagina y eso nos devuelve el ultimo elemento de la pagina
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Índice del primer elemento == el numero del ultimo elemento - el numero de elementos por pagina y eso nos devuelve el primer elemento de la pagina

  const gamesToDisplay = selectedOrigin.length > 0 ? filteredByOrigin : filteredGames;// si hay un origen seleccionado, mostramos los juegos filtrados por origen, si no, mostramos los juegos filtrados por genero
  const gamesOnCurrentPage = gamesToDisplay.slice(indexOfFirstItem, indexOfLastItem); // creamos una variable que va a contener los juegos que se van a mostrar en la pagina actual, le hace un slice  a gamestodisplay y le indica los valores de los indices que va a mostrar que estan representados por las variables indexOfFirstItem y indexOfLastItem

//total de paginas que se van a mostrar
const totalPages = Math.ceil(gamesToDisplay.length / itemsPerPage)


  // creamos el handle next 
  const handleNextPage = () => {
    if (currentPage < Math.ceil(gamesToDisplay.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='Home'>
      <Navbar />
      <Filtros />
      <div>
        <button onClick={handlePrevPage} className='btn'>prev</button>
        <span className='span'> {currentPage} de {totalPages}</span>
        <button onClick={handleNextPage} className='btn'>next</button>
      </div>
      <Cards Allgames={gamesOnCurrentPage} />
    </div>
  );
}

export default Home;
