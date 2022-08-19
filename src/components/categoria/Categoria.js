import './styles.css'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';

import { Pergunta } from '../pergunta/Pergunta';

export function Categoria() {
    const [perguntas, setPerguntas] = useState([{ id: crypto.randomUUID() }]);
    const [colunas, setColunas] = useState([
        { id: 'fom1', data: [{ id: '1a' }, { id: '2a' }] },
        { id: 'fom2', data: [{ id: '2b' }] }
    ]);

    const [color, setColor] = useState('white')

    function handleAddPergunta(event) {


        setPerguntas([...perguntas, { id: crypto.randomUUID() }]);
    }

    function handleOnChange(event) {
        if (event.target.innerHTML == '')
            setColor('#c06572')
        else
            setColor('white')
    }

    function deletePergunta(id) {
        setPerguntas(perguntas.filter(x => x.id !== id))
    }


    function findColuna(id) {
        return colunas.find(coluna => coluna.id === id)
    }

    function onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        if (result.source.droppableId == result.destination.droppableId) {

        }
        else {
            // console.log(findColuna(result.source.index))
            console.log(result)
            const colunaSource = findColuna(result.source.droppableId).data
            console.log(colunaSource)
            const [perguntaRemovedFromSource] = colunaSource.splice(result.source.index, 1);
            console.log(colunaSource)
            console.log(perguntaRemovedFromSource)
            const colunaDestination = findColuna(result.destination.droppableId).data

            colunaDestination.splice(result.destination.index, 0, perguntaRemovedFromSource);

            console.log(colunaDestination)
        }

        // console.log(result.source.index)
        // console.log(result);

        // setPerguntas(tempPerguntas)
    }

    return (
        <>
            <h1 onInput={handleOnChange} style={{ backgroundColor: color }} suppressContentEditableWarning={true} contentEditable="true">Perguntas frequentes</h1>
            <button onClick={handleAddPergunta}>Nova Pergunta</button>
            <div className='fom'>
                <DragDropContext onDragEnd={onDragEnd}>
                    {colunas.map((coluna, index) => (
                        <Droppable droppableId={coluna.id} key={coluna.id}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {coluna.data.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}

                                                >
                                                    <Pergunta idPergunta={item.id} deleteHandler={deletePergunta} />
                                                </div>
                                            )}

                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </div>
        </>
    )
}