"use client";
import "./Styles.css";
import { AuthenticatedRoute } from "../components/authComponent";
import { auth } from "../firebase";
import { ref, getDatabase, set, push, onValue } from "firebase/database";
import { useEffect, useState } from "react";

const AllData = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      try {
        const db = getDatabase();
        const postsRef = ref(db, "/Posts");

        onValue(postsRef, (snapshot) => {
          const data = snapshot.val();

          if (data) {
            const dataArray = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }));

            setDatos(dataArray);
          }
        });
      } catch (error) {
        console.error("Message Error:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {datos.map((item) => (
        <div className="commentContainer" key={item.id}>
          <span className="userName"> {item.Name}</span>
          <div className="userPost"> {item.Post}</div>
        </div>
      ))}
    </>
  );
};

const TextInput = () => {
  const [postValue, setPostValue] = useState("");

  const handleTextInput = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      console.log("Usuario no autenticado. No se puede enviar el mensaje.");
      return;
    }

    try {
      const db = getDatabase();
      await push(ref(db, "/Posts"), {
        Name: auth.currentUser.displayName,
        Post: postValue,
      });

      console.log("Datos enviados exitosamente a la base de datos.");

      setPostValue("");
    } catch (error) {
      console.error("Error al enviar datos:", error.message);
    }
  };

  return (
    <>
      {auth.currentUser && (
        <form className="inputForm" onSubmit={handleTextInput}>
          <input
            className="PostForm"
            type="text"
            required
            id="Post"
            value={postValue}
            onChange={(e) => setPostValue(e.target.value)}
          />
          <button className="submitButton" type="submit">
            Enviar
          </button>
        </form>
      )}
    </>
  );
};

export default function CommentSeccion() {
  return (
    <>
      <div className="pad">
        <AllData></AllData>
        {/* <AuthenticatedRoute></AuthenticatedRoute> para bloquear la pagina entera */} 
      </div>
      <TextInput></TextInput>
    </>
  );
}
