import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import AdministracaoRestaurantes from "./paginas/Admininstracao/Restaurantes/AdministracaoRestaurantes";
import FormularioRestaurante from "./paginas/Admininstracao/Restaurantes/FormularioRestaurantes";
import PaginaBaseAdmin from "./paginas/Admininstracao/PaginaBaseAdmin";
import AdministracaoPratos from "./paginas/Admininstracao/Pratos/AdministracaoPratos";
import FormularioPrato from "./paginas/Admininstracao/Pratos/FormularioPratos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/admin" element={<PaginaBaseAdmin />}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />

        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/novo" element={<FormularioPrato />} />
        <Route path="pratos/:id" element={<FormularioPrato />} />
      </Route>
    </Routes>
  );
}

export default App;
