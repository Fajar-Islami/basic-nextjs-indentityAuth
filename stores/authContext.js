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
    // Failed, because now netlify paid user only can use email customise for starter team

    //   Kalau ada user login/sign up di setUser
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      netlifyIdentity.close(); // tutup modal login
      console.log("login event");
    });

    netlifyIdentity.on("logout", () => {
      setUser(null);
      console.log("logout event");
    });

    //  init netlify identity connection
    netlifyIdentity.init(); // membuat koneksi ke netlify

    return () => {
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
    };
  }, []);

  const login = () => {
    //   Untuk membuat modal otomatis dari nelify, ini buka modal
    netlifyIdentity.open();
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  const context = { user, login, logout };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
