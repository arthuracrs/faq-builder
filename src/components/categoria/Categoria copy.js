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

    return (
        <div className='categoria'>
            <h1 onInput={handleOnChange} style={{ backgroundColor: color }} suppressContentEditableWarning={true} contentEditable="true">Perguntas frequentes</h1>
            <button onClick={handleAddPergunta}>Nova Pergunta</button>
            <DragDropContext>
                <Droppable droppableId="characters">
                    {(provided) => (
                        <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                            {perguntas.map((x, index) => {
                                return (
                                    <Draggable key={x.id} index={index} draggableId={x.id}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                                <Pergunta/>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })}
                        </ul>
                    )}

                </Droppable>
            </DragDropContext>

        </div>
    )
}