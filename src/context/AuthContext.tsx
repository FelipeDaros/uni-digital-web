import React, { createContext, useContext, useEffect, useState } from "react"
import { api } from "../config/api"
import { IAuth } from "../interfaces/IAuth"
import { AxiosError } from "axios"
import { IPermissoes } from "../interfaces/IPermissoes"
import { StorePermissions } from "../store/StorePermissions"

type AuthContextDataProps = {
  user: IAuth | null
  signIn(nome: string, senha: string): Promise<void>
  signOut(): Promise<void>
}

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

type AuthContextProviderProps = {
  children: React.ReactNode // Modifique a tipagem para aceitar qualquer nó React
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<IAuth | null>(null);
  const [loading, setLoading] = useState(false);
  const [handlePermissions] = StorePermissions((state) => [state.handlePermissions]);

  useEffect(() => {
    async function loadStoragedData() {
      setLoading(true)
      const storagedUser = localStorage.getItem("@UNIDIGITAL:user")
      const permissions = localStorage.getItem("@UNIDIGITAL:permissions")

      if (storagedUser) {
        const userParsed = JSON.parse(storagedUser);

        if(userParsed.user.tipo !== "A"){
          const permissionsParsed = JSON.parse(permissions);
          handlePermissions(permissionsParsed);
        }

        api.defaults.headers["Authorization"] = `Bearer ${userParsed.access_token}`;
        setUser(userParsed)
      }
      setLoading(false)
    }

    loadStoragedData()
  }, [])

  async function signOut() {
    localStorage.clear()
    await api.post('/auth/logout');
    setUser(null)
  }

  async function signIn(usuario: string, password: string) {
    try {
      const { data } = await api.post("/auth/login", {
        usuario,
        password,
      });

      api.defaults.headers["Authorization"] = `Bearer ${data.access_token}`;

      if (data) {
        const user = {
          ...data,
        };

        localStorage.setItem("@UNIDIGITAL:user", JSON.stringify(user));
        setUser(data);

        if(data.user.tipo !== "A"){
          const permissoes = fetchPermissions(data.permissoes);
          handlePermissions(permissoes);
          localStorage.setItem("@UNIDIGITAL:permissions", JSON.stringify(permissoes));
        }
      }

      return;
    } catch (error) {
      if (error.isAxiosError) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          // @ts-ignore
          throw new Error(axiosError.response.data.message);
        } else if (axiosError.request) {
          throw new Error("Não foi possível conectar ao servidor.");
        } else {
          throw new Error("Erro ao realizar a solicitação.");
        }
      } else {
        // @ts-ignore
        throw new Error("Erro durante o login. Detalhes: " + error.message);
      }
    }
  }

  function fetchPermissions(permissions: IPermissoes[]){
    const permissoesAssinatura = permissions.filter(item => item.tela === "ASSINATURA");
    const permissoesCartaoCredito = permissions.filter(item => item.tela === "CARTAO DE CREDITO");
    const permissoesHistoricoPagamentos = permissions.filter(item => item.tela === "HISTORICO PAGAMENTOS");
    const permissoesDependentes = permissions.filter(item => item.tela === "DEPENDENTES");

    const permissao = {
      assinatura: permissoesAssinatura,
      cartaoCredito: permissoesCartaoCredito,
      hisotricoPagamentos: permissoesHistoricoPagamentos,
      dependentes: permissoesDependentes
    }

    return permissao;
  }

  if (loading) return <p>Loading..</p>

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { useAuth, AuthContextProvider }
