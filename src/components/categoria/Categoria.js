import './styles.css'

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// import { Pergunta } from '../pergunta/Pergunta';

export function Categoria({ state }) {

    const copyObj = (obj) => JSON.parse(JSON.stringify(obj))

    const newId = () => crypto.randomUUID()

    const newPergunta = () => ({
        id: newId(),
        data: {
            titulo: 'Titulo da Pergunta',
            texto: 'Mussum Ipsum, cacilds vidis litro abertis. Casamentiss faiz malandris se pirulitá.Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio.Mé faiz elementum girarzis, nisi eros vermeio.Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.'
        }
    })

    const [perguntas, setPerguntas] = useState([
        newPergunta(),
        newPergunta(),
        newPergunta()
    ])
    const [color, setColor] = useState('white')
    console.log(perguntas)

    const getPerguntaIndex = (id) => {
        for (let i = 0; i < perguntas.length; i++)
            if (perguntas[i].id === id) return i

        return undefined
    }

    const updatePergunta = (idPergunta, content) => {
        let newPerguntas = copyObj(perguntas)

        newPerguntas[getPerguntaIndex(idPergunta)].data = content

        setPerguntas(newPerguntas)
    }

    const onDragEnd = result => {

        const copyObj = (obj) => JSON.parse(JSON.stringify(obj))

        const reorder = (list, startIndex, endIndex) => {
            const result = list
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);

            return result;
        }

        const { source, destination } = result

        const foraDeUmaColuna = !destination
        if (foraDeUmaColuna) return

        const mesmaPosicao = destination.index === source.index
        if (mesmaPosicao) return

        let newPerguntas = copyObj(perguntas)

        newPerguntas = reorder(
            newPerguntas,
            source.index,
            destination.index
        );

        setPerguntas(newPerguntas)

    }

    function Pergunta({ idPergunta, updatePergunta, state }) {

        const copyObj = (obj) => JSON.parse(JSON.stringify(obj))

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

    return (
        <div className='categoriaIcone' >
            <h1>Titulo da Categoria</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={'droppableId'} >
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {perguntas.map((x, index) => (

                                <Draggable draggableId={x.id} index={index} key={x.id}>
                                    {(provided) => (
                                        <div
                                            className='pergunta'
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Pergunta idPergunta={x.id} updatePergunta={updatePergunta} key={x.id} state={x.data} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

        </div>
    )
}