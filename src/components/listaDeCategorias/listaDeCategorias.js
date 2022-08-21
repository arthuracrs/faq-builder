import './styles.css'
import iconeImage from './icone01.png'

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export function ListaDeCategorias() {
    const getColunaIndex = (id) => {
        for (const i in colunas)
            if (colunas[i].id === id)
                return i

        return null
    }

    const getIconeIndex = (idColuna, idIcone) => {
        for (const coluna in colunas)
            if (colunas[coluna].id === idColuna)
                for (const icone in colunas[coluna].data) 
                    if (colunas[coluna].data[icone].id === idIcone) 
                        return icone

        return null
    }

    const newId = () => crypto.randomUUID()

    const newIcone = () => ({ id: newId(), data: {} })

    const [colunas, setColunas] = useState(
        [
            {
                id: newId(),
                data: [
                    newIcone(),
                    newIcone(),
                    newIcone()
                ]
            },
            {
                id: newId(),
                data: [
                    newIcone(),
                    newIcone(),
                    newIcone()
                ]
            }
        ]
    )

    function Coluna({ droppableId }) {
        return (
            <Droppable droppableId={droppableId} key={droppableId}>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {colunas[getColunaIndex(droppableId)].data.map(
                            (icone, index) => (
                                <IconeDeCategoria state={colunas[getColunaIndex(droppableId)].data[getIconeIndex(droppableId, icone.id)].data} updateIconeData={updateIconeData} key={icone.id} index={index} id={icone.id} idColuna={droppableId} />
                            ))
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }

    const updateIconeData = (idIcone, idColuna, newData) => {
        const copyObj = (obj) => JSON.parse(JSON.stringify(obj))

        let newColunas = copyObj(colunas)

        console.log(getIconeIndex(idColuna, idIcone))

        newColunas[getColunaIndex(idColuna)].data[getIconeIndex(idColuna, idIcone)].data = newData

        setColunas(newColunas)
    }

    function IconeDeCategoria({ index, id, state, updateIconeData, idColuna }) {

        const copyObj = (obj) => JSON.parse(JSON.stringify(obj))

        const [content, setContent] = useState(state)
        const [color, setColor] = useState('white')

        const handleOnChange = (event) => {

            if (event.target.innerHTML == '') {
                setColor('#c06572')
                console.log('fom')
            }
            else {
                let newContent = copyObj(content)
                newContent[event.target.id] = event.target.innerText
                setContent(newContent)
                setColor('white')
                updateIconeData(id, idColuna, newContent)
            }
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
            <Draggable draggableId={id} index={index}>
                {(provided) => (
                    <div className='iconeDeCategoria'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <img src={iconeImage} />
                        <h2 id="titulo" style={{ backgroundColor: color }} onInput={processChange} suppressContentEditableWarning={true} contentEditable="true">
                            {content?.titulo || "Titulo da pergunta"}
                        </h2>
                    </div>
                )}
            </Draggable>
        )
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

        const mesmaColuna = destination.droppableId === source.droppableId
        if (mesmaColuna) {
            const mesmaPosicao = destination.index === source.index
            if (mesmaPosicao) return

            let tempColunas = copyObj(colunas)

            let targetColumn = tempColunas[getColunaIndex(source.droppableId)]

            let novaColuna = reorder(
                targetColumn.data,
                source.index,
                destination.index
            );

            targetColumn.data = novaColuna

            setColunas(tempColunas)
        } else {
            let tempColunas = copyObj(colunas)

            const sourceColumn = tempColunas[getColunaIndex(source.droppableId)].data
            const destinationColumn = tempColunas[getColunaIndex(destination.droppableId)].data

            const [removed] = sourceColumn.splice(source.index, 1);
            destinationColumn.splice(destination.index, 0, removed);

            tempColunas[source.droppableId] = sourceColumn
            tempColunas[destination.droppableId] = destinationColumn

            setColunas(tempColunas)
        }
    }

    return (
        <div className='listaDeCategoria'>
            <h1>Escolha um Assunto</h1>
            <div className='linhaDeColunas'>
                <DragDropContext onDragEnd={onDragEnd}>
                    {colunas.map((x) => (<Coluna droppableId={x.id} key={x.id} />))}
                </DragDropContext>
            </div>
        </div>
    )
}