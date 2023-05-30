import React, { useContext } from "react";
import { HelloContext } from "./context/HelloContext";

function About({ user }) {
  const value = useContext(HelloContext);

  return (
    <div>
      <h2>About Page</h2>
      <h3>
        {value}, {user.username}!
      </h3>

      <p>
        This app is a Full Stack web application made with React and Ruby On
        Rails that allows users to create pet stores and add pet items to the
        inventory
      </p>
      <h2>Current Functions</h2>
      <ul>
        <li>
          Login page where a user can create an account and login to the site
        </li>
        <li>The ability for users to create a pet store</li>
        <li>The ability to add pet store items to an existing pet store</li>
        <li>
          The ability to create, edit, and delete those pet stores and items
        </li>
        <li>
          The ability to display a overview page to view all user created pet
          stores
        </li>
        <li>
          Ability to utilize a map library from NPM for the 'Overview' page
        </li>
      </ul>
    </div>
  );
}

export default About;
