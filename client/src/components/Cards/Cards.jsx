import React from 'react';
import Card from "../Card/Card.jsx"
import './cards.modules.css'


const Cards = ({Allgames}) => {
    
    return (
        <div className='contein'>
            {Allgames.map((games) => (
                <Card
                    key={games.id}
                    id={games.id}
                    name={games.name}
                    image={games.background_image}
                    genres={games.genres}
                    rating={games.rating}
                />
            ))}
        </div>
    );
};

export default Cards;
