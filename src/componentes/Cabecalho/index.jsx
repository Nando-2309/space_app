import { styled } from "styled-components"
import CampoTexto from "../CampoTexto"

const HeaderEstilizado = styled.header`
    padding: 60px 0;
    display: flex;
    justify-content: space-between;
    img {
        max-width: 212px;
    }
`

const Cabecalho = ({ busca, aoBuscar }) => {
    return (<HeaderEstilizado>
        <img src="/imagens/logo.png" alt="" />
        <CampoTexto
            value={busca}
            onChange={evento => aoBuscar(evento.target.value)}
            placeholder="Busque por uma foto"
            aria-label="Buscar fotos"
        />
    </HeaderEstilizado>)
}

export default Cabecalho