import './styles.css'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';

import { Pergunta } from '../pergunta/Pergunta';
import {CategoriaIcone} from '../categoria/Categoria'

export function Categorias() {
    const [perguntas, setPerguntas] = useState({
        col1: [{ id: crypto.randomUUID(), data: {} }],
        col2: [{ id: crypto.randomUUID(), data: {} }]
    });

    const [color, setColor] = useState('white')



    function Coluna({ droppableId }) {
        return (
            <div className='coluna'>
                <button onClick={() => handleAddPergunta(droppableId)}>Nova Pergunta</button>
                <Droppable droppableId={droppableId} key={droppableId}>
                    {(provided) => (
                        <div className='col'
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {perguntas[droppableId].map((item, index) => (
                                <Peritem key={item.id} item={item} col={droppableId} index={index} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        )
    }

    function Peritem({ item, index, col }) {
        return (
            <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}

                    >
                        <Pergunta idPergunta={item.id} state={perguntas[col][index].data} col={col} updatePergunta={updatePergunta} deleteHandler={() => deletePergunta(item.id, col)} />
                    </div>
                )}
            </Draggable>
        )
    }

    function updatePergunta(id, col, state) {
        let newPerguntas = copyObj(perguntas)

        for (const i in newPerguntas[col])
            if (newPerguntas[col][i].id === id) newPerguntas[col][i].data = state


        setPerguntas(newPerguntas)
    }

    function handleAddPergunta(col) {
        setPerguntas({
            ...perguntas,
            [col]: [...perguntas[col], { id: crypto.randomUUID(), data: {} }]
        });
    }

    function handleOnChange(event) {
        if (event.target.innerHTML == '')
            setColor('#c06572')
        else
            setColor('white')
    }

    function copyObj(obj) {
        return JSON.parse(JSON.stringify(obj))
    }

    function deletePergunta(id, col) {
        let newPerguntas = copyObj(perguntas)
        newPerguntas[col] = newPerguntas[col].filter(x => x.id !== id)

        setPerguntas(newPerguntas)
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    function onDragEnd(result) {
        const { source, destination } = result;
        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId) {
            if (destination.index === source.index) {
                return;
            }

            const widgets = reorder(
                perguntas[source.droppableId],
                source.index,
                destination.index
            );

            setPerguntas({
                ...perguntas,
                [source.droppableId]: widgets
            })
        } else {
            let tempPerguntas = copyObj(perguntas)

            const startColumn = [...tempPerguntas[source.droppableId]];
            const finishColumn = [...tempPerguntas[destination.droppableId]];

            const [removed] = startColumn.splice(source.index, 1);
            finishColumn.splice(destination.index, 0, removed);

            tempPerguntas[source.droppableId] = startColumn
            tempPerguntas[destination.droppableId] = finishColumn

            setPerguntas(tempPerguntas)
        }
    }
    console.log(perguntas)
    return (
        <>
            <h1 onInput={handleOnChange} style={{ backgroundColor: color }} suppressContentEditableWarning={true} contentEditable="true">Perguntas frequentes</h1>

            <div >
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className='fom'>
                        <Coluna droppableId={'col1'} key={'col1'} />
                        <Coluna droppableId={'col2'} key={'col2'} />
                    </div>
                </DragDropContext>
            </div>
        </>
    )
}