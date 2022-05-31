import { createContext, useState } from "react";

export const UsuarioContext = createContext();
UsuarioContext.displayName = 'Usuário'; // nomeia o contexto no react dev tool

export const UsuarioProvider = ({ children }) => {
    const [nome, setNome] = useState('');
    const [saldo, setSaldo] = useState(0);

    return (
        <UsuarioContext.Provider value={{ nome, setNome, saldo, setSaldo }} >
            { children }
        </UsuarioContext.Provider>
    )
}