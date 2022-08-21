import { useState, useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { StateContext } from '../../../providers/stateGlobal';

export function Pergunta({ state, index }) {

    const { indexColuna, indexCategoria } = useParams();
    const { stateGlobal, setStateGlobal } = useContext(StateContext)

    const [pergunta, setPergunta] = useState(state)
    const [color, setColor] = useState('white')

    useEffect(() => {
        const newStateGlobal = stateGlobal
        newStateGlobal.colunas[indexColuna].categorias[indexCategoria].perguntas[index] = pergunta
        setStateGlobal(newStateGlobal)
    }, [pergunta])

    const copyObj = (obj) => JSON.parse(JSON.stringify(obj))

    const handleOnChange = (event) => {

        if (event.target.innerHTML === '')
            setColor('#c06572')
        else {
            let newPergunta = copyObj(pergunta)
            newPergunta[event.target.id] = event.target.innerText

            setPergunta(newPergunta)
            setColor('white')
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