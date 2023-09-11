import { useLocation } from 'react-router-dom';
import"../components/landingPage/landing.modules.css";

const CssConditionals = () => {
    const location = useLocation();
    const Background = location.pathname === '/';
    return{
        condicional: Background? 'fondito' : 'fondito2'
    };
};