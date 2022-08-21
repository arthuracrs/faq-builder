import { useState, useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { StateContext } from '../../../providers/stateGlobal';

export function Pergunta({ state, index }) {

    const { indexColuna, indexCategoria } = useParams();
    const { stateGlobal, setStateGlobal } = useContext(StateContext)

    const [pergunta, setPergunta] = useState(state)
    const [color, setColor] = useState('white')

    useEffect(() => {
        stateGlobal.colunas[indexColuna].categorias[indexCategoria].perguntas[index] = pergunta
        setStateGlobal(stateGlobal)
    }, [pergunta])

    const handleOnChange = (event) => {

        if (event.target.innerHTML === '')
            setColor('#c06572')
        else {
            if(event.target.id == 'texto'){
                pergunta.resposta.texto = event.target.innerText
            }else{
                pergunta.titulo = event.target.innerText
            }

            setPergunta(pergunta)
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