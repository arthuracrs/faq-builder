import './styles.css'

import { useState, useContext, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useParams } from "react-router-dom";

import { StateContext } from '../../providers/stateGlobal';

export function Categoria() {
    const copyObj = (obj) => JSON.parse(JSON.stringify(obj))
    const { indexColuna, indexCategoria } = useParams();
    const { stateGlobal, updateCategoria } = useContext(StateContext)
    const [color, setColor] = useState('white')
    
    const currentCategoria = stateGlobal.colunas[indexColuna].categorias[indexCategoria]
    const [perguntas, setPerguntas] = useState(currentCategoria.perguntas)

    const getPerguntaIndex = (id) => {
        for (let i = 0; i < perguntas.length; i++)
            if (perguntas[i].id === id) return i

        return undefined
    }

    const updatePergunta = (idPergunta, content) => {
        let newPerguntas = copyObj(perguntas)

        newPerguntas[getPerguntaIndex(idPergunta)].data = content

        setPerguntas(newPerguntas)
    }

    const onDragEnd = result => {

        const reorder = (list, startIndex, endIndex) => {
            const result = list
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);

            return result;
        }

        const { source, destination } = result

        const foraDeUmaColuna = !destination
        if (foraDeUmaColuna) return

        const mesmaPosicao = destination.index === source.index
        if (mesmaPosicao) return

        let newPerguntas = copyObj(perguntas)

        newPerguntas = reorder(
            newPerguntas,
            source.index,
            destination.index
        );

        setPerguntas(newPerguntas)
    }

    function Pergunta({ idPergunta, updatePergunta, state }) {

        const copyObj = (obj) => JSON.parse(JSON.stringify(obj))

        const [content, setContent] = useState(state)
        const [color, setColor] = useState('white')

        const handleOnChange = (event) => {

            if (event.target.innerHTML === '')
                setColor('#c06572')
            else {
                let newContent = copyObj(content)
                newContent[event.target.id] = event.target.innerText

                setContent(newContent)
                setColor('white')
                updatePergunta(idPergunta, newContent)
            }
        }

        const debounce = (func, timeout = 700) => {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => { func.apply(this, args); }, timeout);
            };
        }

        const processChange = debounce((e) => handleOnChange(e));

        return (
            <div className='pergunta' style={{ backgroundColor: color }}   >
                <h2 id="titulo" onInput={processChange} suppressContentEditableWarning={true} contentEditable="true">
                    {content.titulo}
                </h2>
                <p id="texto" onInput={processChange} suppressContentEditableWarning={true} contentEditable="true">
                    {content.texto}
                </p>
            </div>
        )
    }

    const handleOnChange = (event) => {
        { stateGlobal.colunas[0].categorias[0].data.titulo }
        if (event.target.innerHTML === '')
            setColor('#c06572')
        else {
            setColor('white')
            // updateCategoria()
        }
    }

    const debounce = (func, timeout = 700) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    const processChange = debounce((e) => handleOnChange(e));

    return (
        <div>
            <h1 onInput={processChange} suppressContentEditableWarning={true} contentEditable="true">
                {currentCategoria.categoria}
            </h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={'droppableId'} >
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {perguntas.map((x, index) => (

                                <Draggable draggableId={x.id} index={index} key={x.id}>
                                    {(provided) => (
                                        <div
                                            className='pergunta'
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Pergunta idPergunta={x.id} updatePergunta={updatePergunta} key={x.id} state={x.data} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

        </div>
    )
}