import React, { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";
import { api } from "../config/api";

type AuthContextDataProps = {
  user: IUser | null;
  signIn(nome: string, senha: string): Promise<any>;
  signOut(): Promise<any>;
};

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

type AuthContextProviderProps = {
  children: React.ReactNode; // Modifique a tipagem para aceitar qualquer nó React
};

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadStoragedData() {
      setLoading(true);
      const storagedUser = localStorage.getItem("@UNIDIGITAL:user");

      if (storagedUser) {
        const userParsed = JSON.parse(storagedUser);
        // api.defaults.headers["Authorization"] = `Bearer ${userParsed.token}`;
        setUser(userParsed);
      }
      setLoading(false);
    }

    loadStoragedData();
  }, []);

  async function signOut() {
    localStorage.clear();
    setUser(null);
  }

  async function signIn(nome: string, senha: string) {
    const data = {
      id: '1',
      name: "Felipe"
    }

    localStorage.setItem("@UNIDIGITAL:user", JSON.stringify(data));
    setUser(data);
    return;
    try {
      const { data } = await api.post("/auth", {
        nome,
        senha,
      });

      api.defaults.headers["Authorization"] = `Bearer ${data.token}`;

      if (data) {
        const user = {
          ...data
        };

        localStorage.setItem("@UNIDIGITAL:user", JSON.stringify(user));
        setUser(data);
      }

      return;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  if(loading) return <p>Loading..</p>

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { useAuth, AuthContextProvider };
