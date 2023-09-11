import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';// importamos el BrowserRouter para poder usar las rutas
import { Provider } from 'react-redux'; //importamos el provider para poder usar el store y vincular redux con react
import store from './redux/Store/store'; // importamos el store que creamos en redux/store.js
import './index.css';
import App from './App/App.js';
import reportWebVitals from './utils/reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
      {/* Envuelve la aplicación con BrowserRouter para habilitar el enrutamiento */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); // aqui ejecutamos la funcion reportWebVitals que se encuentra en el archivo reportWebVitals.js
//console.log(reportWebVitals); // imprimimos en consola el reporte de web vitals