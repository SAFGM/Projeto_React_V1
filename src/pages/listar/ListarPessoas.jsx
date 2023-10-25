import { useState, useEffect,} from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPlus,  faFilePdf, faRemove } from "@fortawesome/free-solid-svg-icons";
import { Pagination, } from "antd";
import classNames from "classnames";
import cropImage from "../../utils/cropImage.jsx";

import { EditarItem } from '../editar/EditarItem'


export const ListarPessoas = (ovelha) =>  {
  /*
  * Recebe os itens para o grid
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
      const result = await JSON.parse(localStorage.getItem("data"));
      if (!result) {
        return;
      }
      setItens(result);
      setCurrentItens(result.slice(startIndex, endIndex));
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    setCurrentPage(1);
    setCurrentItens(itens.slice(startIndex, endIndex));
  }, [itensPorPagina]);
  



  const navigator = useNavigate();
ovelha = "1111313131355566"
  const editar = () => {
    return  (
      <EditarItem ovelha={ovelha } />,
   
      
      alert(" vou chamar tela    " + "ddddd   " + <EditarItem nome={"savo"} /> ),
      
      navigator("/Editar")
      
      
      )
    }
    
    
    function getItensLengthCurrentPage() {
      const itensLengthCurrentPage = itens.length - startIndex;
      if (itensLengthCurrentPage > itensPorPagina) {
        return itensPorPagina;
    } else {
      return itensLengthCurrentPage;
    }
  }

 

  function salvarDadosLocalStorage(data) {
    localStorage.setItem("data", JSON.stringify(data));
  }

  useEffect(() => {
    setCurrentItens(itens.slice(startIndex, endIndex));
  }, [currentPage]);

  function pesquisar(pesquisa) {
    // eslint-disable-next-line no-useless-escape
    const pesquisaRegex = pesquisa.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

    const regexStartWith = new RegExp(`^${pesquisaRegex}`, "gi");
    const regexTelefone = new RegExp(`${pesquisaRegex}`, "gi");

    const result = itens.filter((item) => {
      return (
        item.first_name.match(regexStartWith) ||
        item.phone_number.match(regexTelefone)
        // ||
        // item.employment.title.match(regexStartWith)
      );
    });

    setCurrentItens(result.slice(startIndex, endIndex));
    setCurrentPage(1);
  }

  useEffect(() => {
    if (pesquisa === "") {
      setCurrentItens(itens.slice(startIndex, endIndex));
      return;
    }
    pesquisar(pesquisa);
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
    if (currentSort === "asc") {
      setCurrentSort("desc");
      const tds = document.querySelectorAll("th");
      tds.forEach((th) => {
        th.innerHTML = th.innerHTML.replace(" ▲", "");
        th.innerHTML = th.innerHTML.replace(" ▼", "");
      });
      e.target.innerHTML = `${e.target.innerHTML} ▼`;
      sortDesc(tag);
    } else {
      const tds = document.querySelectorAll("th");
      tds.forEach((th) => {
        th.innerHTML = th.innerHTML.replace(" ▲", "");
        th.innerHTML = th.innerHTML.replace(" ▼", "");
      });
      setCurrentSort("asc");
      e.target.innerHTML = `${e.target.innerHTML} ▲`;
      sortAsc(tag);
    }
    editarLinha()
  };
  
  function editarLinha(item) {
    item.currentTarget.style.display = "none";
    // nextSibling display none
    item.currentTarget.nextSibling.style.display = "none";
    
    item.currentTarget.parentNode.querySelector("#btnPDF").style.display =
    "none";
    
    const parent = item.currentTarget.parentNode.parentNode;
    
    console.log("dfnsdfasdlflsdjflksdlkflksdlksdlk",item.name)
    
    
    // add salvar button
    // change th of row to input
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
            first_name: nome,
            phone_number: telefone,
            employment: {
              ...i.employment,
              title: profissao,
            },
          };
        }
        return i;
      });

      salvarDadosLocalStorage(result);
      setItens(result);
      setCurrentItens(result.slice(startIndex, endIndex));

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
                  onClick={(e) => sortTable(e, "first_name")}
                  scope="col"
                  className="cursor-pointer px-6 py-3 w-[30%] text-xl"
                >
                  Nome ▲
                </th>
                <th
                  onClick={(e) => sortTable(e, "phone_number")}
                  scope="col"
                  className="cursor-pointer px-6 py-3 w-[20%] text-xl"
                >
                  Telefone
                </th>
                <th
                  onClick={(e) => sortTable(e, "employment")}
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
                      {item.first_name}
                    </td>
                    <td className="telefone px-6 font-normal text-base">
                      {item.phone_number}
                    </td>
                    <td className="profissao px-6 text-base font-normal">
                      {item.employment.title}
                    </td>
                    <td>
                    <a>
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </a> 
                    <button 
                    value={"dfsdfsdj"}
                     onClick={() => editar()}>    
                    
                    
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
                            setCurrentItens(result.slice(startIndex, endIndex));
                          }}
                          />
                      </button>
                          {/* </button> */} 
                          {/* <button
                             id="btnEdit"
                             onClick={(item) => {
                               console.log(2);
                               editarLinha(item);
                             }}
                           >
                              <FontAwesomeIcon
                              className="p-2 w-4 h-4 bg-orange-400 rounded-full text-white"
                              icon={faEdit}
                              /> 
                            </button>   */}
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
                  getItensLengthCurrentPage() % 2 === 1,
                "bg-white text-cinza-escuro hover:bg-red-50":
                  getItensLengthCurrentPage() % 2 === 0,
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
                setCurrentPage(page);
                setItensPorPagina(pageSize);
              }}
              defaultCurrent={1}
              pageSizeOptions={[5, 10, 15, 20]}
              pageSize={itensPorPagina}
              current={currentPage}
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