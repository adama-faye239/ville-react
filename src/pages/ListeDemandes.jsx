import { useEffect, useState } from "react";
import keycloak from "../keycloak";

console.log("FICHIER LISTEDEMANDES CHARGE");

export const ListeDemandes = () => {

console.log("COMPOSANT LISTEDEMANDES MONTE");
console.log("KEYCLOAK =", keycloak);
console.log("AUTHENTICATED =", keycloak.authenticated);
console.log("TOKEN =", keycloak.token);

const [demandes, setDemandes] = useState([]);
const [idModification, setIdModification] = useState(null);

const [nom, setNom] = useState("");
const [email, setEmail] = useState("");
const [objet, setObjet] = useState("");
const [message, setMessage] = useState("");

const [erreur, setErreur] = useState("");

const roles = keycloak.tokenParsed?.realm_access?.roles || [];
const isAdmin = roles.includes("Admin");

useEffect(() => {

if (!keycloak.authenticated) {
  setErreur("Vous devez être connecté");
  return;
}

console.log("AUTHENTICATED =", keycloak.authenticated);
console.log("TOKEN =", keycloak.token);

fetch("http://127.0.0.1:8000/api/demandes", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${keycloak.token}`,
    "Content-Type": "application/json"
  }
})
  .then((res) => {

    console.log("STATUS =", res.status);

    if (!res.ok) {
      throw new Error("Accès refusé");
    }

    return res.json();

  })
  .then((data) => {
    console.log("DATA =", data);
    setDemandes(data);
  })
  .catch((error) => {
    console.error("Erreur fetch:", error);
    setErreur("Erreur lors du chargement des demandes");
  });

}, []);

  const supprimerDemande = async (id) => {

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/api/demandes/${id}`,
        {
          method: "DELETE"
          ,
          headers: {
            "Authorization": `Bearer ${keycloak.token}`,
            "Content-Type": "application/json"
          }
        }
      );

      const data = await response.json();

      console.log(data);

      setDemandes(
        demandes.filter((demande) => demande.id !== id)
      );

    } catch (error) {

      setErreur(error.message);

    }

  };

  const modifierDemande = (demande) => {

    setIdModification(demande.id);

    setNom(demande.nom);
    setEmail(demande.email);
    setObjet(demande.objet);
    setMessage(demande.message);

  };

  const enregistrerModification = async () => {

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/api/demandes/${idModification}`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${keycloak.token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nom,
            email,
            objet,
            message
          })
        }
      );

      const data = await response.json();

      console.log(data);

      window.location.reload();

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div>

      {idModification && (

        <div>

          <h2>Modifier la demande</h2>

          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Nom"
          />

          <br />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <br />

          <input
            type="text"
            value={objet}
            onChange={(e) => setObjet(e.target.value)}
            placeholder="Objet"
          />

          <br />

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
          />

          <br />

          <button onClick={enregistrerModification}>
            Enregistrer
          </button>

        </div>

      )}

      {erreur && (
        <h2>{erreur}</h2>
      )}

      <h1>
        {isAdmin ? "Liste des demandes" : "Mes demandes"}
       </h1>

       {demandes.length === 0 && (
       <h3>Vous n'avez pas encore fait de demande.</h3>
        )}
      {Array.isArray(demandes) &&
        demandes.map((demande) => (

          <div
            key={demande.id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px"
            }}
          >

            <h3>{demande.nom}</h3>

            <p>
              <strong>Email :</strong> {demande.email}
            </p>

            <p>
              <strong>Objet :</strong> {demande.objet}
            </p>

            <p>
              <strong>Message :</strong> {demande.message}
            </p>

            <button onClick={() => modifierDemande(demande)}>
              Modifier
            </button>

            <button onClick={() => supprimerDemande(demande.id)}>
              Supprimer
            </button>

          </div>

        ))}

    </div>
  );
};