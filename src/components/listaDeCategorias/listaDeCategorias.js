import './styles.css'
import iconeImage from './icone01.png'

import { useState, useContext, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link } from "react-router-dom";

import { StateContext } from '../../providers/stateGlobal';

export function ListaDeCategorias() {
    const { stateGlobal, updateCategoria, getColunaIndex, getCategoriaIndex } = useContext(StateContext)
    const [colunas, setColunas] = useState(stateGlobal.colunas)

    function IconeDeCategoria({ index, idCategoria, idColuna }) {
        const currentCategoria = stateGlobal.colunas[getColunaIndex(idColuna)].categorias[getCategoriaIndex(idColuna, idCategoria)]
        const [iconeDeCategoria, setIconeDeCategoria] = useState(currentCategoria)
        const [color, setColor] = useState('white')

        const handleOnChange = (event) => {
            if (event.target.innerHTML == '') {
                setColor('#c06572')
            } else {
                iconeDeCategoria[event.target.id] = event.target.innerText

                setIconeDeCategoria(iconeDeCategoria)
                setColor('white')
                updateCategoria(idColuna, idCategoria, iconeDeCategoria)
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
            <Draggable draggableId={idCategoria} index={index}>
                {(provided) => (
                    <div className='iconeDeCategoria'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Link to={'/coluna/' + getColunaIndex(idColuna) + '/categoria/' + getCategoriaIndex(idColuna, idCategoria)}>
                            <img src={iconeImage} />
                        </Link>
                        <h2 id="categoria" style={{ backgroundColor: color }} onInput={processChange} suppressContentEditableWarning={true} contentEditable="true">
                            {iconeDeCategoria.categoria}
                        </h2>
                    </div>
                )}
            </Draggable>
        )
    }

    function Coluna({ droppableId }) {
        return (
            <Droppable droppableId={droppableId} key={droppableId}>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {colunas[getColunaIndex(droppableId)].categorias.map(
                            (icone, index) => (
                                <IconeDeCategoria key={icone.idCategoria} index={index} idCategoria={icone.idCategoria} idColuna={droppableId} />
                            ))
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }

    const onDragEnd = result => {

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

            let targetColumn = colunas[getColunaIndex(source.droppableId)]

            reorder(
                targetColumn.categorias,
                source.index,
                destination.index
            )

            setColunas(colunas)
        } else {
            const sourceColumn = colunas[getColunaIndex(source.droppableId)].categorias
            const destinationColumn = colunas[getColunaIndex(destination.droppableId)].categorias

            const [removed] = sourceColumn.splice(source.index, 1);
            destinationColumn.splice(destination.index, 0, removed);

            setColunas(colunas)
        }
    }
    console.log(stateGlobal)
    console.log(colunas)
    return (
        <div className='listaDeCategoria'>
            <h1>Escolha um Assunto</h1>
            <div className='linhaDeColunas'>
                <DragDropContext onDragEnd={onDragEnd}>
                    {colunas.map((x) => (<Coluna droppableId={x.idColuna} key={x.idColuna} />))}
                </DragDropContext>
            </div>
        </div>
    )
}