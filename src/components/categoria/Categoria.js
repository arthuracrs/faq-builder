import './styles.css'

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export function Categoria({ state }) {

    function copyObj(obj) {
        return JSON.parse(JSON.stringify(obj))
    }

    const newId = () => crypto.randomUUID()

    const [content, setContent] = useState({ [newId()]: { titulo: 'fom' }, [newId()]: { titulo: 'fom2' } })

    const [color, setColor] = useState('white')
    console.log(content)
    return (
        <div className='categoriaIcone' >
            <h1>Titulo da Categoria</h1>
            <div>
                {Object.keys(content).map((x, index) => (
                    <h2 key={x}>{content[x].titulo}</h2>
                ))}
            </div>
        </div>
    )
}