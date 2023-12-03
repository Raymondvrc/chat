import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";

export const handleLogout = async () => {
  try {
    await auth.signOut();
    alert("has cerrado seccion");
    console.log("Usuario cerró sesión exitosamente");
  } catch (error) {
    console.error("Error al cerrar sesión:", error.message);
  }
};

export const AuthenticatedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);

      if (!authUser) {
        router.push("/");
      } else {
        //ni idea de que poner aqui xd
      }
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

  return <>{user ? children : null}</>;
};
