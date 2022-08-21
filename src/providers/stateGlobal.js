import { createContext, useState } from "react";

export const StateContext = createContext({})

const newId = () => crypto.randomUUID()
const copyObj = (obj) => JSON.parse(JSON.stringify(obj))

class Categoria {
    idCategoria
    categoria
    perguntas

    constructor(titulo) {
        this.idCategoria = newId()
        this.categoria = titulo
        this.perguntas = []
    }

    addPergunta(pergunta) {
        this.perguntas.push(pergunta)
    }

    reorderPerguntas(startIndex, endIndex) {
        const [removed] = this.perguntas.splice(startIndex, 1);
        this.perguntas.splice(endIndex, 0, removed);
    }

    toJson() {
        return {
            idCategoria: this.idCategoria,
            categoria: this.categoria,
            perguntas: this.perguntas
        }
    }
}

class Pergunta {
    idPergunta
    titulo
    resposta

    constructor(titulo) {
        this.idPergunta = newId()
        this.titulo = titulo
        this.resposta = {}
    }

    addResposta(resposta) {
        this.resposta = resposta
    }

    toJson() {
        return {
            idPergunta: this.idPergunta,
            titulo: this.titulo,
            resposta: this.resposta
        }
    }
}

class Resposta {
    idResposta
    texto
    constructor(texto) {
        this.idResposta = newId()
        this.texto = texto
    }

    toJson() {
        return {
            idResposta: this.idResposta,
            texto: this.texto
        }
    }
}

export const StateProvider = (props) => {

    const [stateGlobal, setStateGlobal] = useState({
        colunas: [{
            idColuna: newId(),
            categorias: [
                new Categoria('Sobre o adesivo'),
                new Categoria('Sua conta')
            ]
        }]
    })

    const pergunta1 = new Pergunta('como é q faz aquilo?')
    pergunta1.addResposta(new Resposta('ooddodo'))

    const pergunta2 = new Pergunta('caaaaaaaaaaaaaa')
    pergunta2.addResposta(new Resposta('bbbbbbbb'))
    
    stateGlobal.colunas[0].categorias[0].addPergunta(pergunta1)
    stateGlobal.colunas[0].categorias[0].addPergunta(pergunta2)

    const getColunaIndex = (idColuna) => {
        const newStateGlobal = copyObj(stateGlobal)
        const colunas = newStateGlobal.colunas

        for (let i = 0; i < colunas.length; i++)
            if (colunas[i].idColuna === idColuna)
                return i

        return null
    }

    const getCategoriaIndex = (idColuna, idCategoria) => {
        const newStateGlobal = copyObj(stateGlobal)
        const colunas = newStateGlobal.colunas

        for (let i = 0; i < colunas.length; i++)
            if (colunas[i].idColuna === idColuna)
                for (let j = 0; j < colunas[i].categorias.length; j++)
                    if (colunas[i].categorias[j].idCategoria == idCategoria)
                        return j

        return null
    }

    const updateCategoria = (idColuna, idCategoria, categoria) => {
        console.log('update categoria')
        if (getColunaIndex(idColuna) === null) {
            console.log('coluna ' + idColuna + ' n existe')
            return
        }

        if (getCategoriaIndex(idColuna, idCategoria) === null) {
            console.log('categoria ' + idCategoria + ' n existe')
            return
        }

        stateGlobal.colunas[getColunaIndex(idColuna)].categorias[getCategoriaIndex(idColuna, idCategoria)] = categoria

        setStateGlobal(stateGlobal)
    }

    return (
        <StateContext.Provider value={{ stateGlobal, getColunaIndex: getColunaIndex, getCategoriaIndex, setStateGlobal, updateCategoria }} s>
            {props.children}
        </StateContext.Provider>
    )
}