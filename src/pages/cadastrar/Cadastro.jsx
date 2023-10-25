import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import cropImage from "../../utils/cropImage.jsx";


function Cadastro() {
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [profissao, setProfissao] = useState("");
  const [foto, setFoto] = useState("./img/profile-picture.jpeg");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      avatar: foto,
      id: uuidv4(),
      first_name: nome,
      phone_number: contato,
      employment: {
        title: profissao,
      },
    };
    if (!localStorage.getItem("data")) {
      localStorage.setItem("data", JSON.stringify([]));
    }
    const dataStorage = JSON.parse(localStorage.getItem("data"));
    dataStorage.push(data);
    localStorage.setItem("data", JSON.stringify(dataStorage));

    navigate("/");
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
      >
        <h1 className="text-3xl text-center mb-6 text-vermelho-claro font-semibold tracking-wider">
          Cadastro
        </h1>
        <img
          src={foto}
          className="w-28 h-28 self-center mb-4 rounded-full"
          alt=""
        />
        <div className="mb-4">
          {/* foto */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="foto"
          >
            Foto
          </label>
          <input
            type="file"
            id="imageFile"
            capture="user"
            className="bg-"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onloadend = () => {
                cropImage(reader.result, 1).then((res) => {
                  setFoto(res.toDataURL());
                });
              };
            }}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="nome"
          >
            Nome
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
            required
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone_number"
          >
            Telefone
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="phone_number"
            type="tel"
            placeholder="Telefone"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="profissao"
          >
            Profissão
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="profissao"
            type="text"
            placeholder="Profissão"
            value={profissao}
            onChange={(e) => setProfissao(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between gap-x-12">
          <input
            className="cursor-pointer bg-vermelho-claro hover:bg-vermelho-hover text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
            type="submit"
            value="Enviar"
          />
          <a
            className="inline-block mx-2 mr-4 align-baseline font-bold text-sm text-vermelho-claro hover:text-vermelho-hover"
            href="/"
          >
            Cancelar
          </a>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;
