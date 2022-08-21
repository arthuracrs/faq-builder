import './styles.css'

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { Pergunta } from '../pergunta/Pergunta';

export function Categoria({ state }) {

    const copyObj = (obj) => JSON.parse(JSON.stringify(obj))

    const newId = () => crypto.randomUUID()

    const populateState = (numItems) => {
        let state = {}

        for (let i = 0; i < numItems; i++)
            state[newId()] = { titulo: 'fom', texto: 'Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Manduma pindureta quium dia nois paga.Viva Forevis aptent taciti sociosqu ad litora torquent.Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose.' };

        return state
    }

    const [perguntas, setPerguntas] = useState(populateState(4))
    const [color, setColor] = useState('white')
    console.log(perguntas)

    const updatePergunta = (idPergunta, content) => {
        let newPerguntas = copyObj(perguntas)
        
        newPerguntas[idPergunta] = content

        setPerguntas(newPerguntas)
    }

    return (
        <div className='categoriaIcone' >
            <h1>Titulo da Categoria</h1>
            <div>
                {Object.keys(perguntas).map((x, index) => (
                    <Pergunta idPergunta={x} updatePergunta={updatePergunta} key={x} state={perguntas[x]} />
                ))}
            </div>
        </div>
    )
}