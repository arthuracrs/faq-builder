import { useState, useContext, useEffect } from 'react';

export function Pergunta({ idPergunta, updatePergunta, state }) {

    const copyObj = (obj) => JSON.parse(JSON.stringify(obj))

    const [pergunta, setPergunta] = useState(state)
    const [color, setColor] = useState('white')

    const handleOnChange = (event) => {
        
        if (event.target.innerHTML === '')
            setColor('#c06572')
        else {
            let newPergunta = copyObj(pergunta)
            newPergunta[event.target.id] = event.target.innerText

            setPergunta(newPergunta)
            setColor('white')
            updatePergunta(idPergunta, newPergunta)
        }
        event.target.blur()
    }

    const debounce = (func, timeout = 700) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    const processChange = debounce((e) => handleOnChange(e));

    return (
        <div className='pergunta' style={{ backgroundColor: color }}   >
            <h2 id="titulo" onInput={processChange} suppressContentEditableWarning={true} contentEditable="true">
                {pergunta.titulo}
            </h2>
            <p id="texto" onInput={processChange} suppressContentEditableWarning={true} contentEditable="true">
                {pergunta.resposta.texto}
            </p>
        </div>
    )
}