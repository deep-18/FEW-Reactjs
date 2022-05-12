import React from 'react';
import {NavLink} from 'react-router-dom';
import '../utils/util.css';
const categories = () => {
    return(
        <div className="categories">           
                <NavLink to="/shop-all" className="category" activeClassName="active" >all</NavLink>
                <NavLink to="/chair" className="category" activeClassName="active" >chair</NavLink>
                <NavLink to="/sofa" className="category" activeClassName="active" >sofa</NavLink>
                <NavLink to="/bed" className="category" activeClassName="active" >bed</NavLink>
                <NavLink to="/cabinet" className="category" activeClassName="active" >cabinet</NavLink>
                <NavLink to="/table" className="category" activeClassName="active" >table</NavLink>
        </div>
    )
}
export default categories;