import { createContext, useContext, useEffect, useState } from "react";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = 'Carrinho';

export const CarrinhoProvider = ({ children }) => {
    const [carrinho, setCarrinho] = useState([]);
    const [quantidadeProdutos, setQuantidadeProdutos] = useState(0);
    const [valorTotalCarrinho, setTotalCarrinho] = useState(0);
    return (
        <CarrinhoContext.Provider 
            value={{ carrinho, setCarrinho, quantidadeProdutos, setQuantidadeProdutos, valorTotalCarrinho, setTotalCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    )
}

export const useCarrinhoContext = () => {
    const { carrinho, setCarrinho, quantidadeProdutos, setQuantidadeProdutos, valorTotalCarrinho, setTotalCarrinho  } = useContext(CarrinhoContext);

    function mudarQuantidade (id, quantidade) {
        return carrinho.map(item => {
            if (item.id === id ) item.quantidade += quantidade
            return item
        })
    }
    
    function addProduct(newProduct) {
        const hasProduct = carrinho.some(item => item.id === newProduct.id);
        if (!hasProduct) {
            newProduct.quantidade = 1;
            return setCarrinho(carrinhoAnterior => [...carrinhoAnterior, newProduct])
        }
        setCarrinho(mudarQuantidade(newProduct.id, 1))

    }

    function removeProduct(id) {
        const product = carrinho.find(item => item.id === id)
        const lastProduct  = product.quantidade === 1
        
        if (lastProduct) {
            return setCarrinho(carrinhoAnterior => carrinhoAnterior.filter(item => item.id !== id))
        }
        setCarrinho(mudarQuantidade(id, -1))
    }

    useEffect(() => {
        const { quantidadeProduto, total } = carrinho.reduce((contador, produto) => ({
            quantidadeProduto:  contador + produto.quantidade,
            total: contador.total + (produto.valor * produto.quantidade)
        }), 
        {
            quantidadeProduto: 0,
            total: 0
        });
        
        setQuantidadeProdutos(quantidadeProduto)
        setTotalCarrinho(total)
    }, [carrinho, setQuantidadeProdutos, setTotalCarrinho])

    return {
        carrinho, setCarrinho, addProduct, removeProduct, quantidadeProdutos, setQuantidadeProdutos, valorTotalCarrinho
    }
}