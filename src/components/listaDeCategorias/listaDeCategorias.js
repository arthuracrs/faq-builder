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

    const newId = () => crypto.randomUUID()

    const [colunas, setColunas] = useState(
        [
            {
                id: newId(),
                data: [
                    { id: newId() },
                    { id: newId() },
                    { id: newId() }
                ]
            },
            {
                id: newId(),
                data: [
                    { id: newId() },
                    { id: newId() },
                    { id: newId() }
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
                        {console.log(colunas)}
                        {colunas[getColunaIndex(droppableId)].data.map(
                            (icone, index) => (
                                <IconeDeCategoria key={icone.id} index={index} id={icone.id} />
                            ))
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }

    function IconeDeCategoria({ index, id }) {
        return (
            <Draggable draggableId={id} index={index}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <img src={iconeImage} />
                        <h2>{id}</h2>
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