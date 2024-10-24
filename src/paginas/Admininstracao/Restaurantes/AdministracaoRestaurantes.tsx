import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import http from "../../../http";

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    http
      .get<IRestaurante[]>("restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data))
      .catch((erro) => console.log(erro));
  }, []);

  const deletar = (restauranteAhSerDeletado: IRestaurante) => {
    http.delete(`restaurantes/${restauranteAhSerDeletado.id}/`).then(() => {
      const listaRestaurante = restaurantes.filter(
        (restaurante) => restaurante.id !== restauranteAhSerDeletado.id
      );
      setRestaurantes([...listaRestaurante]);
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Deletar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>
                [{" "}
                <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>{" "}
                ]
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => deletar(restaurante)}
                  variant="outlined"
                  color="error"
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoRestaurantes;
