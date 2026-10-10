import { styled } from "styled-components"
import Titulo from "../Titulo"
import Tags from "./Tags"
import Populares from "./Populares"
import Imagem from "./Imagem"

const GaleriaContainer = styled.div`
    display: flex;
    gap: 24px;
`

const SecaoFluida = styled.section`
    flex-grow: 1;
`

const ImagensContainer = styled.section`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
`

const Galeria = ({ fotos = [], aoFotoSelecionada, aoAlternarFavorito, tagSelecionada, aoSelecionarTag, fotosPopulares = [], aoVerMaisPopulares, galeriaRef, titulo = 'Navegue pela galeria' }) => {
    return (
        <>
            <Tags tagSelecionada={tagSelecionada} aoSelecionarTag={aoSelecionarTag} />
            <GaleriaContainer>
                <SecaoFluida ref={galeriaRef} tabIndex={-1} aria-label={titulo}>
                    <Titulo>{titulo}</Titulo>
                    {fotos.length === 0 && <p role="status" style={{ color: '#D9D9D9' }}>Nenhuma foto encontrada.</p>}
                    <ImagensContainer>
                        {fotos.map(foto => <Imagem 
                            aoZoomSolicitado={aoFotoSelecionada}
                            aoAlternarFavorito={aoAlternarFavorito}
                            key={foto.id} 
                            foto={foto} />)
                        }
                    </ImagensContainer>
                </SecaoFluida>
                <Populares fotos={fotosPopulares} aoVerMais={aoVerMaisPopulares} />
            </GaleriaContainer>
        </>
    )
}

export default Galeria