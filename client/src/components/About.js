import React from "react";

function About() {
  return (
    <div>
      <h2 class="bg-blue-500">About Page</h2>
      <p>
        This app is a Full Stack web application made with React, Ruby On Rails,
        and PostgresSQL that allows a user to create in-home dog daycare
      </p>
      <h2>Current Functions</h2>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <ul>
        <li>
          Login page where a user can create an account and login to the site
        </li>
        <li>The ability to create a dog daycare with a start and end time</li>
        <li>
          The ability to add new dogs to an existing dog daycare as well as edit
          or delete the dogs
        </li>
        <li>The ability to create, edit, and delete a dog</li>
        <li>
          The ability to display a overview page to view all user dog daycares
        </li>
        <li>
          Ability to utilize a map library from NPM for the 'Overview' page
        </li>
      </ul>
    </div>
  );
}

export default About;
