import './styles.css'

import { useState } from 'react';

export function Pergunta({ idPergunta, updatePergunta, state }) {

    const copyObj = (obj) => JSON.parse(JSON.stringify(obj))

    const [k, setK] = useState(false)
    const [content, setContent] = useState(state)
    const [color, setColor] = useState('white')

    function handleOnChange(event) {

        if (event.target.innerHTML === '')
            setColor('#c06572')
        else {
            let newContent = copyObj(content)
            newContent[event.target.id] = event.target.innerText

            setContent(newContent)
            setColor('white')
            updatePergunta(idPergunta, newContent)

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
    console.log('refreshed ' + idPergunta)
    return (
        <div className='pergunta' style={{ backgroundColor: color }}   >
            <h2 id="titulo" onInput={processChange} suppressContentEditableWarning={true} contentEditable="true">
                {content.titulo}
            </h2>
            <p id="texto" onInput={processChange} suppressContentEditableWarning={true} contentEditable="true">
                {content.texto}
            </p>
        </div>
    )
}