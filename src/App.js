import './styles.css'

import { ListaDeCategorias } from './components/listaDeCategorias/listaDeCategorias';
import { Categoria } from './components/categoria/Categoria';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";


export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ListaDeCategorias />} />
                <Route path="invoices" element={<Categoria />} />
            </Routes>
        </BrowserRouter>
    )

}