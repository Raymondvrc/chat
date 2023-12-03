"use client";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase.jsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "./Login.css";

import "firebase/auth";

const SignInForm = ({ setState }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    let [Email, Password] = e.target;
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        Email.value,
        Password.value
      );
      console.log(user);
      alert("has iniciado seccion");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  return (
    <form className="formSignIn" method="POST" onSubmit={handleSubmit}>
      <label>Email</label>
      <input id="Email" type="email" required />
      <label>Password</label>
      <input id="Password" type="password" required />
      <button type="submit" className="btn">
        Sign in
      </button>
      <button
        onClick={() => {
          setState(false);
        }}
      >
        <Link className="btnLink" href="#">
          Create an account
        </Link>
      </button>
    </form>
  );
};

const SignUpForm = ({ setState }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    let [UserRegister, NameRegister, LastnameRegister, PasswordRegister] =
      e.target;

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        UserRegister.value,
        PasswordRegister.value
      );
      const userCredentialsUpdate = await updateProfile(userCredentials.user, {
        displayName: `${NameRegister.value} ${LastnameRegister.value}`,
      });
        alert('usuario registrado')
      console.log(userCredentials);
      console.log(userCredentialsUpdate);
    } catch (e) {
      alert(e.message);
      console.log(e.message);
    }
  };

  return (
    <form className="formSignIn" method="POST" onSubmit={handleSubmit}>
      <label>Username</label>
      <input id="UserRegister" type="text" required />
      <label>Name</label>
      <input id="NameRegister" type="text" required />
      <label>Last name </label>
      <input id="LastnameRegister" type="text" required />
      <label>Password</label>
      <input id="PasswordRegister" type="text" required />
      <button type="submit">Sign up</button>

      <button
        onClick={() => {
          setState(true);
        }}
      >
        <Link className="btnLink" href="#">
          Sign in
        </Link>
      </button>
    </form>
  );
};

const Form = () => {
  const [state, setState] = useState(true);

  return (
    <>
      {state ? (
        <SignInForm setState={setState} />
      ) : (
        <SignUpForm setState={setState} />
      )}
    </>
  );
};

export default function Main() {
  return (
    <>
      <Image
        className="imageSide"
        width={0}
        height={0}
        src="/loginSide.png"
        alt="just a background"
      ></Image>

      <Form />
    </>
  );
}
