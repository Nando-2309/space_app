import { styled } from "styled-components"
import EstilosGlobais from "./componentes/EstilosGlobais"
import Cabecalho from "./componentes/Cabecalho"
import BarraLateral from "./componentes/BarraLateral"
import Banner from "./componentes/Banner"
import bannerBackground from './assets/banner.png'
import Galeria from "./componentes/Galeria"

import { ordenarFotos } from "./ordenarFotos"
import fotos from './fotos.json'
import { useRef, useState } from "react"
import ModalZoom from "./componentes/ModalZoom"

const FundoGradiente = styled.div`
  background: linear-gradient(174.61deg, #041833 4.16%, #04244F 48%, #154580 96.76%);
  width: 100%;
  min-height: 100vh;
`

const AppContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
  max-width: 100%;
`

const MainContainer = styled.main`
  display: flex;
  gap: 24px;
`

const ConteudoGaleria = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const App = () => {
  const [fotosDaGaleria, setFotosDaGaleria] = useState(fotos)
  const [fotoSelecionada, setFotoSelecionada] = useState(null)
  const [busca, setBusca] = useState('')
  const [tagSelecionada, setTagSelecionada] = useState(0)
  const [navegacaoSelecionada, setNavegacaoSelecionada] = useState('inicio')
  const galeriaRef = useRef(null)

  const normalizar = (texto) => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
  const fotosFiltradas = fotosDaGaleria.filter(foto =>
    (tagSelecionada === 0 || foto.tagId === tagSelecionada) &&
    normalizar(foto.titulo).includes(normalizar(busca))
  )

  const fotosExibidas = ordenarFotos(fotosFiltradas, navegacaoSelecionada)

  const fotosPopulares = ordenarFotos(fotosDaGaleria, 'mais-vistas').slice(0, 5)
  const titulosGaleria = {
    'mais-vistas': 'Fotos mais vistas',
    'mais-curtidas': 'Fotos mais curtidas',
    novas: 'Fotos mais recentes'
  }

  const aoVerMaisPopulares = () => {
    setBusca('')
    setTagSelecionada(0)
    setNavegacaoSelecionada('mais-vistas')
    galeriaRef.current?.focus({ preventScroll: true })
    galeriaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const aoFotoSelecionada = (foto) => {
    setFotosDaGaleria(atuais => atuais.map(item =>
      item.id === foto.id ? { ...item, visualizacoes: item.visualizacoes + 1 } : item
    ))
    setFotoSelecionada({ ...foto, visualizacoes: foto.visualizacoes + 1 })
  }

  const aoNavegar = (opcao) => {
    setNavegacaoSelecionada(opcao)
    if (opcao === 'inicio') {
      setBusca('')
      setTagSelecionada(0)
    }
    if (opcao === 'surpreenda-me' && fotosFiltradas.length > 0) {
      const candidatas = fotosFiltradas.filter(foto => foto.id !== fotoSelecionada?.id)
      const disponiveis = candidatas.length > 0 ? candidatas : fotosFiltradas
      aoFotoSelecionada(disponiveis[Math.floor(Math.random() * disponiveis.length)])
    }
  }

  const aoAlternarFavorito = (foto) => {
    if (foto.id === fotoSelecionada?.id) {
      setFotoSelecionada({
        ...fotoSelecionada,
        favorita: !fotoSelecionada.favorita,
        curtidas: fotoSelecionada.curtidas + (fotoSelecionada.favorita ? -1 : 1)
      })
    }
    setFotosDaGaleria(atuais => atuais.map(fotoDaGaleria => {
      return {
        ...fotoDaGaleria,
        favorita: fotoDaGaleria.id === foto.id ? !fotoDaGaleria.favorita : fotoDaGaleria.favorita,
        curtidas: fotoDaGaleria.id === foto.id
          ? fotoDaGaleria.curtidas + (fotoDaGaleria.favorita ? -1 : 1)
          : fotoDaGaleria.curtidas
      }
    }))
  }
  
  return (
    <FundoGradiente>
      <EstilosGlobais />
      <AppContainer>
        <Cabecalho busca={busca} aoBuscar={setBusca} />
        <MainContainer>
          <BarraLateral selecionada={navegacaoSelecionada} aoNavegar={aoNavegar} />
          <ConteudoGaleria>
            <Banner
              texto="A galeria mais completa de fotos do espaço!"
              backgroundImage={bannerBackground}
            />
            <Galeria 
              aoFotoSelecionada={aoFotoSelecionada} 
              aoAlternarFavorito={aoAlternarFavorito}
              fotos={fotosExibidas}
              fotosPopulares={fotosPopulares}
              aoVerMaisPopulares={aoVerMaisPopulares}
              galeriaRef={galeriaRef}
              titulo={titulosGaleria[navegacaoSelecionada] || 'Navegue pela galeria'}
              tagSelecionada={tagSelecionada}
              aoSelecionarTag={setTagSelecionada}
            />
          </ConteudoGaleria>
        </MainContainer>
      </AppContainer>
      <ModalZoom 
        foto={fotoSelecionada}
        aoFechar={() => setFotoSelecionada(null)}
        aoAlternarFavorito={aoAlternarFavorito}
      />
    </FundoGradiente>
  )
}

export default App
