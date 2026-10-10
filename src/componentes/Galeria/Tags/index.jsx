import { styled } from 'styled-components';
import tags from './tags.json'

const TagsContainer = styled.section`
    display: flex;
    align-items: center;
    gap: 64px;
    margin-top: 56px;
`

const TagTitulo = styled.h3`
    color: #D9D9D9;
    font-size: 24px;
    margin: 0;
`;

const Tag = styled.button`
    font-size: 24px;
    color: #FFFFFF;
    background: rgba(217, 217, 217, 0.3);
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    padding: 12px;
    box-sizing: border-box;
    border: 2px solid props => props.$selecionada ? '#C98CF1' : 'transparent';
    &:hover {
      border-color: #C98CF1;
    }
`

const Div = styled.div`
    display: flex;
    gap: 24px;
    justify-content: end;
`

const Tags = ({ tagSelecionada, aoSelecionarTag }) => {
    return <TagsContainer>
        <TagTitulo>Busque por tags:</TagTitulo>
        <Div>
            {tags.map(tag => <Tag
                key={tag.id}
                type="button"
                $selecionada={tagSelecionada === tag.id}
                aria-pressed={tagSelecionada === tag.id}
                onClick={() => aoSelecionarTag(tag.id)}
            >{tag.titulo}</Tag>)}
        </Div>
    </TagsContainer>
}

export default Tags