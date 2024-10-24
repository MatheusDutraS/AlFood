import { useEffect, useState } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import axios, { AxiosRequestConfig } from "axios";
import { IPaginacao } from "../../interfaces/IPaginacao";
import { InputLabel, MenuItem, Select } from "@mui/material";

interface IParametrosBusca {
  ordering?: string;
  search?: string;
}

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");
  const [paginaAnterior, setPaginaAnterior] = useState("");

  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("");

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    axios
      .get<IPaginacao<IRestaurante>>(url, opcoes)
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const opcoes = {
      params: {} as IParametrosBusca,
    };
    if (busca) {
      opcoes.params.search = busca;
    }
    if (filtro) {
      opcoes.params.ordering = filtro;
    }
    console.log(`${busca} \n${filtro}`);
    carregarDados("http://localhost:8000/api/v1/restaurantes/", opcoes);
  };

  useEffect(() => {
    carregarDados("http://localhost:8000/api/v1/restaurantes/");
  }, []);

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      <form onSubmit={buscar}>
        <InputLabel id="demo-simple-select-helper-label">Filtro</InputLabel>
        <Select
          sx={{ minWidth: 120, marginRight: 3 }}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={filtro}
          label="Filtro"
          onChange={(evento) => setFiltro(evento.target.value)}
          required
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="id">por id</MenuItem>
          <MenuItem value="nome">por nome</MenuItem>
        </Select>
        <input
          type="text"
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
        />
        <button type="submit">buscar</button>
      </form>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {
        <button
          onClick={() => carregarDados(paginaAnterior)}
          disabled={!paginaAnterior}
        >
          Página Anterior
        </button>
      }
      {
        <button
          onClick={() => carregarDados(proximaPagina)}
          disabled={!proximaPagina}
        >
          Próxima Página
        </button>
      }
      {/* {proximaPagina && <button onClick={verMais}>Ver mais</button>} */}
    </section>
  );
};

export default ListaRestaurantes;
