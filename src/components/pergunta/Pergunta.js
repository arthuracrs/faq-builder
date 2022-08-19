import './styles.css'

import { useState } from 'react';

export function Pergunta({ idPergunta, col, deleteHandler, updatePergunta, state }) {

    function copyObj(obj) {
        return JSON.parse(JSON.stringify(obj))
    }

    const [content, setContent] = useState(state)
    const [color, setColor] = useState('white')

    function handleOnChange(event) {

        if (event.target.innerHTML == '')
            setColor('#c06572')
        else {

            let newContent = copyObj(content)
            newContent[event.target.id] = event.target.innerText

            setContent(newContent)
            setColor('white')
            updatePergunta(idPergunta, col, newContent)
        }
    }

    function debounce(func, timeout = 700) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }
    
    const processChange = debounce((e) => handleOnChange(e));

    
    return (
        <div className='pergunta' style={{ backgroundColor: color }}   >
            <button onClick={() => deleteHandler(idPergunta)}>X</button>
            <h2 id="titulo" onInput={processChange} suppressContentEditableWarning={true} contentEditable="true">
                {content?.titulo || "titulo da pergunta"}
            </h2>
            <p id="texto" onInput={processChange} suppressContentEditableWarning={true} contentEditable="true">
                {content?.texto || "Texto da pergunta"}
            </p>
        </div>
    )
}