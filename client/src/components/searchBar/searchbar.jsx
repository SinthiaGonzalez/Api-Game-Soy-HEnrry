
import "./searchbar.modules.css";
import Cards from "../Cards/Cards";
import { useSelector, useDispatch } from "react-redux";
import { getGameByName } from "../../redux/action/action";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const OnSearch = () => {

    const gamesByname = useSelector((state) => state.gameByname);
    const dispatch = useDispatch();
    const [inputname, setinputname] = useState(""); // el estado de lo que escribe el usuario en el input
    const handleSearch = () => {
        dispatch(getGameByName(inputname));
        setinputname("");
    };
    return (
        <div className="sercontain">
           
            <div className="searchBar">
               
            <div> <Link to="/home"><button className="btn">Back to Home</button></Link></div>
                <input
                    type="text"
                    placeholder="Search games by name..."
                    value={inputname}
                    onChange={(event) => setinputname(event.target.value)}
                />
                <button onClick={handleSearch} className="btn">Search</button>
            </div>

            <div className="divCard">
                <Cards Allgames={gamesByname} />
            </div>

        </div>

    );
};

export default OnSearch;