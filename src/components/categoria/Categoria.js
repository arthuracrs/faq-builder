import './styles.css'

import { useState } from 'react';

export function CategoriaIcone({ idPergunta, col, deleteHandler, updatePergunta, state }) {

    function copyObj(obj) {
        return JSON.parse(JSON.stringify(obj))
    }

    const [content, setContent] = useState(state)
    const [color, setColor] = useState('white')


    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            <div className='categoriaIcone' style={{ backgroundColor: color }}   >
                <button onClick={() => deleteHandler(idPergunta)}>X</button>
                <h2 id="titulo" onInput={processChange} suppressContentEditableWarning={true} contentEditable="true">
                    {content?.titulo || "titulo da Categoria"}
                </h2>
                <img src="icone01.png"/>
            </div>
        </Draggable>
    )
}