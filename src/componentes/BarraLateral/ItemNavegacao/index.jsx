import { styled } from "styled-components"

const ItemListaEstilizado = styled.button`
    background: transparent;
    border: 0;
    padding: 0;
    text-align: left;
    &:focus-visible {
        outline: 2px solid #C98CF1;
        outline-offset: 6px;
    }
    font-size: 24px;
    line-height: 29px;
    margin-bottom: 30px;
    cursor: pointer;
    color: ${ props => props.$ativo ? '#7B78E5' : '#D9D9D9'};
    font-family: ${ props => props.$ativo ? 'GandhiSansBold' : 'GandhiSansRegular'};
    display: flex;
    align-items: center;
    gap: 22px;
`

const ItemNavegacao = ({children, iconeAtivo, iconeInativo, ativo = false, onClick}) => {
    return <li><ItemListaEstilizado type="button" $ativo={ativo} aria-pressed={ativo} onClick={onClick}>
        <img src={ativo ? iconeAtivo : iconeInativo} alt="" />
        {children}
    </ItemListaEstilizado></li>
}

export default ItemNavegacao