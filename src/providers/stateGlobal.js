import { createContext, useState } from "react";

export const StateContext = createContext({})

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

export const StateProvider = (props) => {

    const data = JSON.parse(JSON.stringify({
        "idCategoria": "64",
        "categoria": "Pedágios",
        "perguntas": [
            {
                "idPergunta": "191",
                "titulo": "Como passo em pedágios com o adesivo (tag) Veloe?",
                "resposta": {
                    "idResposta": "189",
                    "texto": "<ul><li>Ative e cole o adesivo (tag) no parabrisa do veículo;</li><li>Utilize as pistas identificadas com a placa de cobrança automática;</li><li>Ao se aproximar da cabine automática, reduza a velocidade pra 40 km/h pra leitura do adesivo (tag). Se o veículo tem mais de 6 eixos, recomendamos não exceder 20km/h.</li><li>Atenção aos sinais luminosos e sonoros da pista: eles indicam se sua passagem foi liberada ou não.</li></ul><br>Se surgir algum problema, pare e siga as orientações dos agentes da pista."
                }
            },
            {
                "idPergunta": "192",
                "titulo": "O que fazer se receber uma multa por evasão ao utilizar Veloe em uma praça de pedágio?",
                "resposta": {
                    "idResposta": "190",
                    "texto": "Nós não temos competência legal ou poder pra aplicar ou revogar multas de trânsito, então fique atento: se houver sinal e bloqueio na praça de pedágio, não saia sem realizar o pagamento.<br><br>Teve algum problema e precisar entender a situação da conta Veloe no momento da evasão? Nós analisamos pra você, entre em contato com a gente pela Central de Relacionamento 3003 3510 (capitais e regiões metropolitanas) ou 0800 208 3510 (demais localidades), todos os dias, 24 horas."
                }
            }
        ]
    }))

    const [stateGlobal, setStateGlobal] = useState({
        colunas: [{
            idColuna: newId(),
            categorias: [
                data
            ]
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
        console.log('categoria ' + idCategoria + ' n existe na coluna: ' +idColuna)

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