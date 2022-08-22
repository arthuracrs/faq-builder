import { createContext, useState } from "react";

import faqjson from './faq.json'

const newId = () => crypto.randomUUID()

const categoriaFactory = (categoria) => {
    return {
        idCategoria: newId(),
        categoria: categoria,
        perguntas: []
    }
}

const perguntaFactory = (titulo) => {
    return {
        idPergunta: newId(),
        titulo: titulo,
        resposta: {
            idResposta: newId(),
            texto: "Se colou errado ou precisa substituir o adesivo (tag), você precisa fazer o bloqueio do antigo e pedir um novo. Acesse “Meus adesivos” e clique em “Solicitar adesivos”."
        }
    }
}

const respostaFactory = (texto) => {
    return {
        idResposta: newId(),
        texto: texto
    }
}

const faqParse = (json) => {
    const replacer = (key, value) => {
        if (value && value.constructor === Number)
            return value.toString()
        return value
    }

    const copyJson = (obj) => (JSON.parse(JSON.stringify(obj, replacer, 2)))
    let data = copyJson(json)

    for (const categoria of data) {
        for (const key in categoria) {
            if (key === 'titulo') {
                categoria['categoria'] = copyJson(categoria[key])
                delete categoria[key]
            }
        }
    }

    return data
}

export const StateContext = createContext({})

export const StateProvider = (props) => {

    const data = faqParse(faqjson)

    const [stateGlobal, setStateGlobal] = useState({
        colunas: [{
            idColuna: newId(),
            categorias: data
        },
        {
            idColuna: newId(),
            categorias: [
                categoriaFactory('Sobre o adesivo'),
                categoriaFactory('Sua conta')
            ]
        }
        ]
    })

    const pergunta1 = perguntaFactory('como é q faz aquilo?')
    pergunta1.resposta = respostaFactory('ooddodo')

    const pergunta2 = perguntaFactory('caaaaaaaaaaaaaa')
    pergunta2.resposta = respostaFactory('bbbbbbbb')

    // stateGlobal.colunas[0].categorias[0].perguntas.push(pergunta1)
    // stateGlobal.colunas[0].categorias[0].perguntas.push(pergunta2)

    const getColunaIndex = (idColuna) => {
        const colunas = stateGlobal.colunas

        for (let i = 0; i < colunas.length; i++)
            if (colunas[i].idColuna === idColuna)
                return i

        return null
    }

    const getCategoriaIndex = (idColuna, idCategoria) => {
        const colunas = stateGlobal.colunas

        for (let i = 0; i < colunas.length; i++)
            if (colunas[i].idColuna === idColuna)
                for (let j = 0; j < colunas[i].categorias.length; j++)
                    if (colunas[i].categorias[j].idCategoria == idCategoria)
                        return j
        console.log('categoria ' + idCategoria + ' n existe na coluna: ' + idColuna)

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
        <StateContext.Provider value={{ stateGlobal, getColunaIndex, getCategoriaIndex, setStateGlobal, updateCategoria }}>
            {props.children}
        </StateContext.Provider>
    )
}