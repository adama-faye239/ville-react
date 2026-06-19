import React from 'react'
import thies from '../assets/thies.jpg'
import './accueil.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";  /*modifier*/
import keycloak from '../keycloak'

export const Accueil = () => {

     const [contacts, setContacts] = useState([]);  /*modifier*/

    useEffect(() => {

  fetch("http://127.0.0.1:8000/api/contacts")
    .then((res) => res.json())
    .then((data) => setContacts(data))
    .catch((error) => console.log(error));

  console.log("Token Accueil :", keycloak.token);
  console.log("Authentifié :", keycloak.authenticated);

  fetch("http://127.0.0.1:8000/api/profile", {
    headers: {
      Authorization: `Bearer ${keycloak.token}`
    }
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Profile complet :", JSON.stringify(data, null, 2));
    })
    .catch((error) => console.log(error));

  // TEST ROUTE ADMIN
  fetch("http://127.0.0.1:8000/api/admin", {
    headers: {
      Authorization: `Bearer ${keycloak.token}`
    }
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("ADMIN :", data);
    })
    .catch((error) => console.log(error));

}, []);

  return (
    <div>
        <h1>Ma belle ville</h1>
    <div className='cards'>
    <section className='card'>
        <h3>Commune de thies</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, <br />
            soluta accusamus voluptatem cupiditate aperiam recusandae quam eum
             </p>
             <img src={thies} alt="ville" />
             <Link to="/Apropos">
             <button>Voir plus</button>
             </Link>

    </section>
    <section className='card'>
<h3>Commune de mbour</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, <br />
            soluta accusamus voluptatem cupiditate aperiam recusandae quam eum
             </p>
             <img src={thies} alt="ville" />
             <Link to="/Apropos">
             <button>Voir plus</button>
             </Link>
    </section>
   
    
    </div>
    <h3>Les communes</h3>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
     Earum quisquam perspiciatis facilis saepe, sed quae inventore accusamus, sint, <br />ipsam officia in impedit. 
     Magnam minima architecto quis ea dolores expedita a.</p>
<h1>
    Les contacts
</h1>
{/* <div>
    {contacts.map((item) => (
      <div key={item.id} style={{ border: "1px solid black", margin: 10}}>
        <h5>{item.nom}</h5>
        <p>{item.email}</p>                      
        <p>{item.message}</p>
      </div>
    ))}
  </div> */}
    </div>
  )
}
