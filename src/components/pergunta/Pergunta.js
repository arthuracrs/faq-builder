import './styles.css'

import { useState } from 'react';

export function Pergunta ({idPergunta, deleteHandler}){
    const [color, setColor] = useState('white')

    function handleOnChange(event) {
        if (event.target.innerHTML == '')
            setColor('#c06572')
        else
            setColor('white')
    }

    return (
        <div className='pergunta' >
            <button onClick={()=>deleteHandler(idPergunta)}>X</button>
            <h2 onInput={handleOnChange} style={{ backgroundColor: color }} suppressContentEditableWarning={true} contentEditable="true">O que é o adesivo (tag) Veloe?</h2>
            <p onInput={handleOnChange} style={{ backgroundColor: color }} suppressContentEditableWarning={true} contentEditable="true">É um meio de pagamento que deve ser colocado no para-brisa do veículo. A comunicação é feita radiofrequência com as cancelas automáticas dos estabelecimentos que possuem Veloe, liberando a passagem em pedágios e estacionamentos.</p>
        </div>
    )
}