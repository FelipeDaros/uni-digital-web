export const typesPolicy: PropsPolicyType[] = [
    { value: 'USO', label: "Uso" },
    { value: 'PRIVACIDADE', label: "Privacidade" },
    { value: 'COOKIES', label: "Cookies" },
    { value: 'VENDAS', label: "Vendas" },
  ]

export type PropsPolicyType = {
  value: string
  label: string
}