import { createContext, useState, useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";

const AuthContext = createContext({
  // ddefault value
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //   Kalau ada user login/sign up di setUser
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      netlifyIdentity.close(); // tutup modal login
      console.log("login event");
    });

    //  init netlify identity connection
    netlifyIdentity.init(); // membuat koneksi ke netlify
  }, []);

  const login = () => {
    //   Untuk membuat modal otomatis dari nelify, ini buka modal
    netlifyIdentity.open();
  };

  const context = { user, login };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
