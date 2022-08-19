import './styles.css'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';

import { Pergunta } from '../pergunta/Pergunta';

export function Categoria() {
    const [perguntas, setPerguntas] = useState([{ id: crypto.randomUUID() }]);
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

    function onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const tempPerguntas = Array.from(perguntas);
        const [removed] = tempPerguntas.splice(result.source.index, 1);
        tempPerguntas.splice(result.destination.index, 0, removed);

        setPerguntas(tempPerguntas)
    }

    return (
        <div>
            <h1 onInput={handleOnChange} style={{ backgroundColor: color }} suppressContentEditableWarning={true} contentEditable="true">Perguntas frequentes</h1>
            <button onClick={handleAddPergunta}>Nova Pergunta</button>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {perguntas.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}

                                        >
                                            <Pergunta />
                                        </div>
                                    )}
                                    
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>

    )
}