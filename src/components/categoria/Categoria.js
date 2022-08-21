import './styles.css'

import { useState, useContext, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useParams } from "react-router-dom";

import { StateContext } from '../../providers/stateGlobal';

export function Categoria() {
    const copyObj = (obj) => JSON.parse(JSON.stringify(obj))

    const { indexColuna, indexCategoria } = useParams();
    const { stateGlobal,  setStateGlobal,updateCategoria } = useContext(StateContext)
    const [color, setColor] = useState('white')

    const currentCategoria = stateGlobal.colunas[indexColuna].categorias[indexCategoria]
    const [categoria, setCategoria] = useState(currentCategoria)

    useEffect(()=>{
        const newStateGlobal = stateGlobal
        newStateGlobal.colunas[indexColuna].categorias[indexCategoria] = categoria
        setStateGlobal(newStateGlobal)
    }, [categoria])

    const updatePergunta = (idPergunta, content) => {
        const getPerguntaIndex = (array, id) => {
            for (let i = 0; i < array.length; i++)
                if (array[i].idPergunta === id) return i

            return undefined
        }

        let newCategoria = copyObj(categoria)

        newCategoria.perguntas[getPerguntaIndex(categoria.perguntas, idPergunta)] = content

        setCategoria(newCategoria)
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

        let newCategoria = copyObj(categoria)

        reorder(
            newCategoria.perguntas,
            source.index,
            destination.index
        );

        setCategoria(newCategoria)
    }

    function Pergunta({ idPergunta, updatePergunta, state }) {

        const copyObj = (obj) => JSON.parse(JSON.stringify(obj))

        const [pergunta, setPergunta] = useState(state)
        const [color, setColor] = useState('white')

        const handleOnChange = (event) => {

            if (event.target.innerHTML === '')
                setColor('#c06572')
            else {
                let newPergunta = copyObj(pergunta)
                newPergunta[event.target.id] = event.target.innerText

                setPergunta(newPergunta)
                setColor('white')
                updatePergunta(idPergunta, newPergunta)
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
                    {pergunta.titulo}
                </h2>
                <p id="texto" onInput={processChange} suppressContentEditableWarning={true} contentEditable="true">
                    {pergunta.resposta.texto}
                </p>
            </div>
        )
    }

    const handleOnChange = (event) => {
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
                            {categoria.perguntas.map((x, index) => (

                                <Draggable draggableId={x.idPergunta} index={index} key={x.idPergunta}>
                                    {(provided) => (
                                        <div
                                            className='pergunta'
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Pergunta idPergunta={x.idPergunta} updatePergunta={updatePergunta} key={x.idPergunta} state={x} />
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