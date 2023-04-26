import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
// import { button, Box } from "./styles"
// import styled from "styled-components";




function NavBar() {

  return (
    <>
      {/* <div>
        <Nav>
          <button as={Link} to='/about'>About</button>
          <button as={Link} to='/petstores'>Pet Stores</button>
          <button as={Link} to='/petitems'>Pet Items</button>
          <button as={Link} to='/locations'>Location</button>
          <button as={Link} to='/overview'>View All Pet Stores</button>
          <button >Logout</button>
        </Nav>
      </div> */}
            <div>
        {/* <Nav> */}
          <button as={Link} to='/about'>About</button>
          <button as={Link} to='/petstores'>Pet Stores</button>
          <button as={Link} to='/petitems'>Pet Items</button>
          <button as={Link} to='/locations'>Location</button>
          <button as={Link} to='/overview'>View All Pet Stores</button>
          <button >Logout</button>
        {/* </Nav> */}
      </div>
    </>
  );
}




//Main Logo
// const div = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 8px;
// `;

// const Logo = styled.h1`
//   font-family: "Permanent Marker", regular;
//   font-size: 2rem;
//   color: Yellow;
//   margin: 100;
//   line-height: 1;
//   -webkit-text-stroke: 2px black;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   width: 200px;



//   a {
//     color: inherit;
//     text-decoration: none;
//   }
// `;

// const Nav = styled.nav`
//   display: flex;
//   gap: 4px;
//   position: absolute;
//   left: 20px;
// `;

export default NavBar;