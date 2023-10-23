import { useState, useEffect } from "react";
import {  useNavigate,  } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "antd";
import classNames from "classnames";

function ListarPessoas() {
  
  /*
   * recebo os itens para o grid
   */
  const [itens, setItens] = useState([]);
  /*
   * Numero de itens por pagina
   */
  const [itensPorPagina, setItensPorPagina] = useState(5);

  /*
   * Pagina atual - selecionada
   */
  const [currentPage, setCurrentPage] = useState(1);

  const [pesquisa, setPesquisa] = useState("");

  /*
   * Filtrar os itens baseado na seleção da pagina
   */
  const startIndex = (currentPage - 1) * itensPorPagina;
  const endIndex = startIndex + itensPorPagina;
  const [currentItens, setCurrentItens] = useState([]);
  const [currentSort, setCurrentSort] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        "https://random-data-api.com/api/v2/users?size=55"
      )
        .then((Response) => Response.json())
        .then((data) => data);
      // sort result by first_name
      const sorted = result.sort((a, b) => {
        if (a.first_name < b.first_name) {
          return -1;
        }
        if (a.first_name > b.first_name) {
          return 1;
        }
        return 0;
      });
      setItens(sorted);
      setCurrentItens(sorted.slice(startIndex, endIndex));
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    setCurrentItens(itens.slice(startIndex, endIndex));
  }, [itensPorPagina]);

  useEffect(() => {
    setCurrentItens(itens.slice(startIndex, endIndex));
  }, [currentPage]);

  useEffect(() => {
    // eslint-disable-next-line no-useless-escape
    const pesquisaRegex = pesquisa.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

    const regexName = new RegExp(`^${pesquisaRegex}`, "gi");
    const regexTelefone = new RegExp(`${pesquisaRegex}`, "gi");

    const result = itens.filter((item) => {
      return (
        item.first_name.match(regexName) ||
        item.phone_number.match(regexTelefone)
      );
    });

    setCurrentItens(result.slice(startIndex, endIndex));
    setCurrentPage(1);
  }, [pesquisa]);

  const sortAsc = (tag) => {
    if (tag === "employment") {
      const sorted = itens.sort((a, b) => {
        if (a[tag].title < b[tag].title) {
          return -1;
        }
        if (a[tag].title > b[tag].title) {
          return 1;
        }
        return 0;
      });
      setItens(sorted);
      setCurrentItens(sorted.slice(startIndex, endIndex));
    } else {
      const sorted = itens.sort((a, b) => {
        if (a[tag] < b[tag]) {
          return -1;
        }
        if (a[tag] > b[tag]) {
          return 1;
        }
        return 0;
      });
      setItens(sorted);
      setCurrentItens(sorted.slice(startIndex, endIndex));
    }
  };

  const sortDesc = (tag) => {
    if (tag === "employment") {
      const sorted = itens.sort((a, b) => {
        if (a[tag].title > b[tag].title) {
          return -1;
        }
        if (a[tag].title < b[tag].title) {
          return 1;
        }
        return 0;
      });
      setItens(sorted);
      setCurrentItens(sorted.slice(startIndex, endIndex));
    } else {
      const sorted = itens.sort((a, b) => {
        if (a[tag] > b[tag]) {
          return -1;
        }
        if (a[tag] < b[tag]) {
          return 1;
        }
        return 0;
      });
      setItens(sorted);
      setCurrentItens(sorted.slice(startIndex, endIndex));
    }
  };

  const sortTable = (e, tag) => {
    if (currentSort === "default") {
      setCurrentSort("asc");
      const ths = document.querySelectorAll("th");
      ths.forEach((th) => {
        th.innerHTML = th.innerHTML.replace(" ▲", "");
        th.innerHTML = th.innerHTML.replace(" ▼", "");
      });
      e.target.innerHTML = `${e.target.innerHTML} ▲`;
      sortAsc(tag);
    } else if (currentSort === "asc") {
      setCurrentSort("desc");
      const ths = document.querySelectorAll("th");
      ths.forEach((th) => {
        th.innerHTML = th.innerHTML.replace(" ▲", "");
        th.innerHTML = th.innerHTML.replace(" ▼", "");
      });
      e.target.innerHTML = `${e.target.innerHTML} ▼`;
      sortDesc(tag);
    } else {
      const ths = document.querySelectorAll("th");
      ths.forEach((th) => {
        th.innerHTML = th.innerHTML.replace(" ▲", "");
        th.innerHTML = th.innerHTML.replace(" ▼", "");
      });
      setCurrentSort("asc");
      e.target.innerHTML = `${e.target.innerHTML} ▲`;
      sortAsc(tag);
    }
  };

  const navigator = useNavigate();
  const handlePrintar = () => {
     return navigator("/Editar");
  }


  return (
    <div className="flex flex-col items-center w-full min-h-screen mt-24 mb-10 gap-y-12">
      <h1 className="text-6xl tracking-wider font-semibold">
        Lista de Pessoas
      </h1>
      <div>
        <div className="ml-8 mb-8 mr-auto">
          <label htmlFor="table-search" className="sr-only">
            Pesquisa
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              name="table-search"
              onChange={(e) => {
                setPesquisa(e.target.value);
              }}
              id="table-search"
              value={pesquisa}
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Pesquisar"
            />
          </div>
        </div>
        <div className="relative flex flex-col items-center overflow-x-auto shadow-md rounded-t-lg w-[1280px] mb-10 border-b-2 border-vermelho-claro">
          <table className="w-full text-sm text-left text-gray-600 table-fixed">
            <thead className="text-xs bg-vermelho-claro text-white uppercase">
              <tr>
                <th
                  onClick={(e) => sortTable(e, "first_name")}
                  scope="col"
                  className="cursor-pointer px-6 py-3 w-[25%] text-xl"
                >
                  Nome ▲
                </th>
                <th
                  onClick={(e) => sortTable(e, "employment")}
                  scope="col"
                  className="cursor-pointer px-6 py w-[35%] text-xl"
                >
                  Profissão
                </th>
                <th
                  onClick={(e) => sortTable(e, "phone_number")}
                  scope="col"
                  className="cursor-pointer px-6 py-3 w-[25%] text-xl"
                >
                  Telefone
                </th>
                <th
                  scope="col"
                  className="text-center px-6 py-3 w-[15%] text-xl"
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItens.map((item, index) => {
                return (
                  <tr
                    className={classNames({
                      "bg-white border-b text-cinza-escuro hover:bg-red-50":
                        index % 2 === 0,
                      "bg-[#f3f3f3] border-b text-cinza-escuro hover:bg-red-100":
                        index % 2 === 1,
                    })}
                    key={item.id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap "
                    >
                      {item.first_name}
                    </th>
                    <th className="px-6 py-4">{item.employment.title}</th>
                    <th className="px-6 py-4">{item.phone_number}</th>
                    <th className="px-6 py-4 flex justify-center gap-x-8">
                      <button>
                        <a href="">
                          <FontAwesomeIcon
                            className="p-2 w-4 h-4 bg-orange-400 rounded-full text-white"
                            icon={faEdit}
                            onClick={handlePrintar}
                              // const result = itens.filter((i) => {
                               
                              //   return i.id !== item.id;
                              // });
                              // setItens(result);
                              // setCurrentItens(result.slice(startIndex, endIndex));
                          
                          />
                        </a>
                      </button>
                      {/* <button>
                        <FontAwesomeIcon
                          className="p-2 w-4 h-4 bg-vermelho-claro rounded-full text-white"
                          icon={faRemove}
                          onClick={() => {
                            const result = itens.filter((i) => {
                              return i.id !== item.id;
                            });
                            setItens(result);
                            setCurrentItens(result.slice(startIndex, endIndex));
                          }}
                        />
                      </button> */}
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div
            className={classNames(
              "bg-white py-4 flex items-center justify-center w-full",
              {
                "bg-[#f3f3f3] text-cinza-escuro hover:bg-red-100":
                  itensPorPagina % 2 === 1,
                "bg-white text-cinza-escuro hover:bg-red-50":
                  itensPorPagina % 2 === 0,
              }
            )}
          >
            <a
              href="/Cadastro"
              className="bg-vermelho-claro flex items-center justify-center  w-10 h-10 text-white rounded-full"
            >
              <FontAwesomeIcon icon={faPlus} />
            </a>
          </div>
          <nav
            className={classNames(
              "flex items-center w-full justify-between pt-4 pb-4 px-4 gap-12",
              {
                "bg-[#f3f3f3] text-cinza-escuro hover:bg-red-100":
                  itensPorPagina % 2 === 0,
                "bg-white text-cinza-escuro hover:bg-red-50":
                  itensPorPagina % 2 === 1,
              }
            )}
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal m-0 text-gray-500 ">
              Mostrando{" "}
              <span className="font-semibold text-gray-900 ">
                {startIndex} - {endIndex}
              </span>{" "}
              de{" "}
              <span className="font-semibold text-gray-900 ">
                {itens.length}
              </span>
            </span>
            <Pagination
              onChange={(page, pageSize) => {
                setCurrentPage(page);
                setItensPorPagina(pageSize);
              }}
              defaultCurrent={1}
              pageSizeOptions={[5, 10, 15, 20]}
              pageSize={itensPorPagina}
              current={currentPage}
              total={itens.length}
            />
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ListarPessoas;
