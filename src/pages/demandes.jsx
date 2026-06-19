import React, { useState } from 'react'
import keycloak from "../keycloak";
import mbour from '../assets/mbour.jpg'


export const Demandes = () => {
  const [formData, setFormData] = useState({    //declaration
    nom: '',
    email: '',
    objet: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({                          //fonction appeler a chaque fois
      //  que l utilisateur tape dans un champt
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {      //fonction appeler lorsqu'on clique sur un bouton
    e.preventDefault();

    try {
      console.log("TOKEN =", keycloak.token);
      const response = await fetch(
        "http://127.0.0.1:8000/api/demandes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${keycloak.token}`
          },
          body: JSON.stringify(formData)
        }
      );


      const data = await response.json();

      alert('Demande envoyée avec succès !');

      setFormData({
        nom: '',
        email: '',
        objet: '',
        message: ''
      });

      console.log(data);

    } catch (error) {
      console.error(error);
      alert('Erreur lors de l\'envoi');
    }

  };

  return (
    <div>
      <h3>Faire une demande</h3>
      <form onSubmit={handleSubmit}>

        <div>
          <label>Nom</label>
          <br />
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Objet</label>
          <br />
          <input
            type="text"
            name="objet"
            value={formData.objet}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Message</label>
          <br />
          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <button type="submit">
          Envoyer la demande
        </button>

      </form>
    </div>

  );
};






