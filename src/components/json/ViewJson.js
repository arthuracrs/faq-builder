import { useContext } from 'react'
import parse from 'html-react-parser'

import { StateContext } from '../../providers/stateGlobal';

export function ViewJson(params) {
    const { stateGlobal } = useContext(StateContext)

    const copyobj = obj => JSON.parse(JSON.stringify(obj))

    const col1 = copyobj(stateGlobal.colunas[0].categorias)
    const col2 = copyobj(stateGlobal.colunas[1].categorias)

    const size = col1.length + col2.length

    let final = []

    for (let i = 0; i < size; i++) {
        if (col1[i])
            final.push(col1[i])
        if (col2[i])
            final.push(col2[i])
    }

    final = JSON.stringify(final, undefined, 2)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(final);
    }

    return (
        <>
            <button onClick={copyToClipboard}>Copiar</button>
            {parse(`<pre>${final}</pre> `)}
        </>
    )
}