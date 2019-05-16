import React from 'react';

import "./SideBar.css";

const SideBar = () => {
    return (
        <>
            <div className="sidebar">
                <h5>Looking for a recipe?</h5>
                <input type="text" name="title" placeholder="Recipe Title" />
                <select>
                    <option>select category</option>
                    <option>African Dish</option>
                    <option>Jamaican Dish</option>
                    <option>British Dish</option>
                </select>
                <button>search</button>
            </div>
        </>
    );
};

export default SideBar;