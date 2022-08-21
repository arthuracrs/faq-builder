import './styles.css'

import { useState, useContext, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useParams } from "react-router-dom";

import { Pergunta } from './pergunta/Pergunta';
import { StateContext } from '../../providers/stateGlobal';

export function Categoria() {
    const copyObj = (obj) => JSON.parse(JSON.stringify(obj))

    const { indexColuna, indexCategoria } = useParams();
    const { stateGlobal, setStateGlobal } = useContext(StateContext)
    
    const currentCategoria = stateGlobal.colunas[indexColuna].categorias[indexCategoria]
    const [categoria, setCategoria] = useState(currentCategoria)

    useEffect(()=>{
        stateGlobal.colunas[indexColuna].categorias[indexCategoria] = categoria
        setStateGlobal(stateGlobal)
    }, [categoria])

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
 
    return (
        <div>
            <h1>
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
                                            <Pergunta idPergunta={x.idPergunta} index={index} key={x.idPergunta} state={x} />
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