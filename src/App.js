import './styles.css'

import { ListaDeCategorias } from './components/listaDeCategorias/listaDeCategorias';
import { Categoria } from './components/categoria/Categoria';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import { StateProvider } from './providers/stateGlobal'

export function App() {
    return (
        <BrowserRouter>
            <StateProvider>
                <Routes>
                    <Route path="/" element={<ListaDeCategorias />} />
                    <Route path="/coluna/:indexColuna/categoria/:indexCategoria" element={<Categoria />} />
                </Routes>
            </StateProvider>
        </BrowserRouter>
    )

}