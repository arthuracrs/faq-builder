import './styles.css'

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { Pergunta } from '../pergunta/Pergunta';

export function Categoria({ state }) {

    function copyObj(obj) {
        return JSON.parse(JSON.stringify(obj))
    }

    const newId = () => crypto.randomUUID()

    const populateState = (numItems) => {
        let state = {}

        for (let i = 0; i < numItems; i++)
            state[newId()] = { titulo: 'fom' };

        return state
    }

    const [content, setContent] = useState(populateState(4))

    const [color, setColor] = useState('white')
    console.log(content)

    

    return (
        <div className='categoriaIcone' >
            <h1>Titulo da Categoria</h1>
            <div>
                {Object.keys(content).map((x, index) => (
                    <Pergunta />
                ))}
            </div>
        </div>
    )
}