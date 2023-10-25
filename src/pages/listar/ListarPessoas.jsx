import { useState, useEffect,} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPlus,  faFilePdf, faRemove } from "@fortawesome/free-solid-svg-icons";
import { Pagination, } from "antd";
import classNames from "classnames";
import cropImage from "../../utils/cropImage.jsx";



export const ListarPessoas = () =>  {

  const [itens, setItens] = useState([]);
  const [itensPorPagina, setItensPorPagina] = useState(5);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [pesquisa, setPesquisa] = useState("");
  const iniciarIndice = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = iniciarIndice + itensPorPagina;
  const [ItensAtuais, setItensAtuais] = useState([]);
  const [ordenacaoAtual, setOrdenacaoAtual] = useState("asc");


useEffect(() => {

    const buscarDados = async () => {
      const result = await JSON.parse(localStorage.getItem("dados"));
      if (!result) {
        return;
      }
      setItens(result);
      setItensAtuais(result.slice(iniciarIndice, indiceFinal));
    };
    buscarDados();
  }, []);
  
  useEffect(() => {
    setPaginaAtual(1);
    setItensAtuais(itens.slice(iniciarIndice, indiceFinal));
  }, [itensPorPagina]);
  
   
  function getItensTamanhoPaginaAtual() {
      const itensTamanhoPaginaAtual = itens.length - iniciarIndice;
      if (itensTamanhoPaginaAtual > itensPorPagina) {
        return itensPorPagina;
    } else {
      return itensTamanhoPaginaAtual;
    }
  }

  function salvarDadosLocalStorage(dados) {
    localStorage.setItem("dados", JSON.stringify(dados));
  }

  useEffect(() => {
    setItensAtuais(itens.slice(iniciarIndice, indiceFinal));
  }, [paginaAtual]);


  function pesquisar(pesquisa) {
    // eslint-disable-next-line no-useless-escape
    const pesquisaRegex = pesquisa.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

    const regexStartWith = new RegExp(`^${pesquisaRegex}`, "gi");
    const regexTelefone = new RegExp(`${pesquisaRegex}`, "gi");

    const result = itens.filter((item) => {
      return (
        item.nome_result.match(regexStartWith) ||
        item.telefone_result.match(regexTelefone)
      );
    });

    setItensAtuais(result.slice(iniciarIndice, indiceFinal));
    setPaginaAtual(1);
  }

  useEffect(() => {
    if (pesquisa === "") {
      setItensAtuais(itens.slice(iniciarIndice, indiceFinal));
      return;
    }
    pesquisar(pesquisa);
  }, [pesquisa]);


  const ordenarAsc = (tag) => {
    if (tag === "emprego") {
      const classificados = itens.sort((a, b) => {
        if (a[tag].titulo < b[tag].titulo) {
          return -1;
        }
        if (a[tag].titulo > b[tag].titulo) {
          return 1;
        }
        return 0;
      });
      setItens(classificados);
      setItensAtuais(classificados.slice(iniciarIndice, indiceFinal));
    } else {
      const classificados = itens.sort((a, b) => {
        if (a[tag] < b[tag]) {
          return -1;
        }
        if (a[tag] > b[tag]) {
          return 1;
        }
        return 0;
      });
      setItens(classificados);
      setItensAtuais(classificados.slice(iniciarIndice, indiceFinal));
    }
  };


  const ordenarDesc = (tag) => {
    if (tag === "emprego") {
      const classificados = itens.sort((a, b) => {
        if (a[tag].titulo > b[tag].titulo) {
          return -1;
        }
        if (a[tag].titulo < b[tag].titulo) {
          return 1;
        }
        return 0;
      });
      setItens(classificados);
      setItensAtuais(classificados.slice(iniciarIndice,indiceFinal));
    } else {
      const classificados = itens.sort((a, b) => {
        if (a[tag] > b[tag]) {
          return -1;
        }
        if (a[tag] < b[tag]) {
          return 1;
        }
        return 0;
      });
      setItens(classificados);
      setItensAtuais(classificados.slice(iniciarIndice, indiceFinal));
    }
  };

/*
*  Ordenar tabela
*/
  const ordenarTable = (e, tag) => {
    if (ordenacaoAtual === "asc") {
      setOrdenacaoAtual("desc");
      const tds = document.querySelectorAll("th");
      tds.forEach((th) => {
        th.innerHTML = th.innerHTML.replace(" ▲", "");
        th.innerHTML = th.innerHTML.replace(" ▼", "");
      });
      e.target.innerHTML = `${e.target.innerHTML} ▼`;
      ordenarDesc(tag);
    } else {
      const tds = document.querySelectorAll("th");
      tds.forEach((th) => {
        th.innerHTML = th.innerHTML.replace(" ▲", "");
        th.innerHTML = th.innerHTML.replace(" ▼", "");
      });
      setOrdenacaoAtual("asc");
      e.target.innerHTML = `${e.target.innerHTML} ▲`;
      ordenarAsc(tag);
    }
    editarLinha()
  };
  

  function editarLinha(item) {
    item.currentTarget.style.display = "none";
   
    item.currentTarget.nextSibling.style.display = "none";
    
    item.currentTarget.parentNode.querySelector("#btnPDF").style.display =
    "none";
    
    const parent = item.currentTarget.parentNode.parentNode;
    
    console.log("dfnsdfasdlflsdjflksdlkflksdlksdlk",item.name)
    
    /*
    *  add salvar button
    *  alterar th de linha para entrada
    */
    const tds = item.currentTarget.parentNode.parentNode.querySelectorAll("td");
    tds.forEach((td) => {
      if (td.classList.contains("actions")) {
        return;
      }
      if (td.classList.contains("foto")) {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.capture = "user";
        input.id = "imageFile";
        input.className = "w-full p-2 rounded-lg border border-gray-300";
        input.addEventListener("change", (e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            cropImage(reader.result, 1).then((res) => {
              td.querySelector("img").src = res.toDataURL();
            });
          };
        });
        td.innerHTML = "";
        td.appendChild(input);
      }
      const input = document.createElement("input");
      input.value = td.innerHTML;
      input.name = td.classList[0];
      input.className = "w-full p-2 rounded-lg border border-gray-300";
      if (td.classList.contains("nome")) {
        input.className += " nome";
      }
      if (td.classList.contains("telefone")) {
        input.className += " telefone";
      }
      if (td.classList.contains("profissao")) {
        input.className += " profissao";
      }
      td.innerHTML = "";
      td.appendChild(input);
    });


    const salvarButton = document.createElement("button");
    salvarButton.innerHTML = "Salvar";
    salvarButton.className =
      "bg-vermelho-claro text-white font-semibold px-6 py-2 rounded-lg";
    salvarButton.addEventListener("click", () => {
      const nome = parent.querySelector("[name='nome']").value;
      const telefone = parent.querySelector("[name='telefone']").value;
      const profissao = parent.querySelector("[name='profissao']").value;

      const result = itens.map((i) => {
        if (i.id === parent.id) {
          return {
            ...i,
            nome_result: nome,
            telefone_result: telefone,
            emprego: {
              ...i.emprego,
              titulo: profissao,
            },
          };
        }
        return i;
      });

      salvarDadosLocalStorage(result);
      setItens(result);
      setItensAtuais(result.slice(iniciarIndice, indiceFinal));

      const tds = parent.querySelectorAll("td");
      tds.forEach((th) => {
        if (th.classList.contains("actions")) {
          return;
        }
        if (th.classList.contains("foto")) {
          return;
        }
        th.innerHTML = th.querySelector("input").value;
      });
    });

    salvarButton.addEventListener("click", () => {
      const btnEdit = parent.querySelector("#btnEdit");
      const btnRemove = parent.querySelector("#btnRemove");
      const btnPDF = parent.querySelector("#btnPDF");

      btnEdit.style.display = "block";
      btnRemove.style.display = "block";
      btnPDF.style.display = "block";

      salvarButton.remove();
    });

    item.currentTarget.parentNode.appendChild(salvarButton);
   }

  return (
   
    <div className="flex flex-col items-center w-full min-h-screen mt-20 mb-10 gap-y-12">
      <script src="http://localhost:8097"></script>
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
              className="block p-2 pl-10 text-lg text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Pesquisar"
            />
          </div>
        </div>
        <div className="relative flex flex-col items-center overflow-x-auto shadow-lg rounded-t-lg w-[1280px] mb-10 border-b-2 border-vermelho-claro">
          <table className="w-full text-sm text-left text-gray-600 table-fixed">
            <thead className="text-xs bg-vermelho-claro text-white uppercase">
              <tr>
                <th scope="col" className="px-6 py-3 w-[4%]">
                  <span className="sr-only">Image</span>
                </th>
                <th
                  onClick={(e) => ordenarTable(e, "nome_result")}
                  scope="col"
                  className="cursor-pointer px-6 py-3 w-[30%] text-xl"
                >
                  Nome ▲
                </th>
                <th
                  onClick={(e) => ordenarTable(e, "telefone_result")}
                  scope="col"
                  className="cursor-pointer px-6 py-3 w-[20%] text-xl"
                >
                  Telefone
                </th>
                <th
                  onClick={(e) => ordenarTable(e, "emprego")}
                  scope="col"
                  className="cursor-pointer px-6 py w-[20%] text-xl"
                >
                  Profissão
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
              {ItensAtuais.map((item, index) => {
                return (
                  <tr
                    className={classNames({
                      "bg-white border-b text-cinza-escuro hover:bg-red-50":
                        index % 2 === 0,
                      "bg-[#f3f3f3] border-b text-cinza-escuro hover:bg-red-100":
                        index % 2 === 1,
                    })}
                    key={item.id}
                    id={item.id}
                  >
                    <td className="foto p-4">
                      <img
                        width={50}
                        height={50}
                        className="rounded-full"
                        src={
                          item.avatar
                            ? item.avatar
                            : "./img/profile-picture.jpeg"
                        }
                        alt="Profile Picture"
                      />
                    </td>
                    <td
                      scope="row"
                      className="nome pl-2 pr-6 text-base font-semibold whitespace-nowrap "
                    >
                      {item.nome_result}
                    </td>
                    <td className="telefone px-6 font-normal text-base">
                      {item.telefone_reuslt}
                    </td>
                    <td className="profissao px-6 text-base font-normal">
                      {item.emprego.titulo}
                    </td>
                    <td>
                    <a>
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </a> 
                    <button>
                      {/* Editar para gerar PDF aqui */}
                    
                       <FontAwesomeIcon
                            className="p-2 w-4 h-4 bg-violet-700 rounded-full text-white"
                            icon={faFilePdf}/>
                      </button>

                      &nbsp;&nbsp;
                      <button id="btnRemove">
                        <FontAwesomeIcon
                          className="p-2 w-4 h-4 bg-vermelho-claro rounded-full text-white"
                          icon={faRemove}
                          onClick={() => {
                            const result = itens.filter((i) => {
                              return i.id !== item.id;
                            });
                            salvarDadosLocalStorage(result);
                            setItens(result);
                            setItensAtuais(result.slice(iniciarIndice, indiceFinal));
                          }}
                          />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div
            className={classNames(
              "py-4 flex items-center justify-center w-full",
              {
                "bg-[#f4f4f4] text-cinza-escuro hover:bg-red-100":
                  getItensTamanhoPaginaAtual() % 2 === 1,
                "bg-white text-cinza-escuro hover:bg-red-50":
                  getItensTamanhoPaginaAtual() % 2 === 0,
              }
            )}
          >
            <a
              href="/Cadastro"
              className="bg-vermelho-claro flex items-center justify-center  w-10 h-10 text-white rounded-full">
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
              Itens {" "} {itens.length}
              <span className="font-semibold text-gray-900 "></span>
            </span>

            <Pagination
              onChange={(page, pageSize) => {
                setPaginaAtual(page);
                setItensPorPagina(pageSize);
              }}
              defaultCurrent={1}
              pageSizeOptions={[5, 10, 15, 20]}
              pageSize={itensPorPagina}
              current={paginaAtual}
              total={itens.length}
              showSizeChanger={true}
              />
          </nav>
        </div>
        
      </div>
    </div>
     
      
  );
}


export default ListarPessoas;