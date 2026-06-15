import React, { useState } from 'react'

export const Contact = () => {
    const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const response = await fetch(
      'http://127.0.0.1:8000/api/contact',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }
    )

    const data = await response.json()

    console.log(data)

    alert('Message envoyé avec succès !')

  } catch (error) {
    console.error(error)
    alert('Erreur lors de l’envoi')
  }
}

  
  
  return (
    <div>
             <h2>Contact</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Votre nom" name="nom" value={formData.nom}
          onChange={handleChange}/><br /><br />

        <input type="email" placeholder="Votre email" name="email" value={formData.email}
          onChange={handleChange} /><br /><br />

        <textarea placeholder="Votre message" name="message" value={formData.message}
          onChange={handleChange}></textarea><br /><br />
        <button type="submit">Envoyer</button>
        
      </form>

    </div>
  )

}