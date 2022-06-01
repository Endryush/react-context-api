import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useCarrinhoContext } from 'common/context/Carrinho';
import { PagamentoContext, usePagamentoContexto } from 'common/context/Pagamento';
import Produto from 'components/Produto';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Voltar, TotalContainer, PagamentoContainer} from './styles';

function Carrinho() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { carrinho } = useCarrinhoContext();
  const { formaPagamento, tiposPagamento, changePaymentForm } = usePagamentoContexto()
  const history = useHistory();
  return (
    <Container>
      <Voltar 
        onClick={() => history.goBack()}
      />
      <h2>
        Carrinho
      </h2>
      {carrinho.map(produto => (
        <Produto 
          {...produto}
          key={produto.id}
        />
      )
      )}
      <PagamentoContainer>
        <InputLabel> Formas de Pagamento </InputLabel>
        <Select 
          value={formaPagamento.id}
          onChange={(e) => changePaymentForm(e.target.value)}
        >
          {tiposPagamento.map( pagamento => (
            <MenuItem value={pagamento.id} key={pagamento.id} >
                {pagamento.nome}
            </MenuItem>
          ))}
        </Select>
      </PagamentoContainer>
      <TotalContainer>
          <div>
            <h2>Total no Carrinho: </h2>
            <span>R$ </span>
          </div>
          <div>
            <h2> Saldo: </h2>
            <span> R$ </span>
          </div>
          <div>
            <h2> Saldo Total: </h2>
            <span> R$ </span>
          </div>
        </TotalContainer>
      <Button
        onClick={() => {
          setOpenSnackbar(true);
        }}
        color="primary"
        variant="contained"
      >
         Comprar
       </Button>
        <Snackbar
          anchorOrigin={
            { 
              vertical: 'top',
              horizontal: 'right'
            }
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
           <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
          >
            Compra feita com sucesso!
          </MuiAlert>
        </Snackbar>
    </Container>
  )
}

export default Carrinho;