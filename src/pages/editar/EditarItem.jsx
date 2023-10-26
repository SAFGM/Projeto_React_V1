// import {ListarPessoas} from '../listar/ListarPessoas'


export const EditarItem = () => {
  
 
       
  return   (
    <div className="w-full h-screen flex flex-col justify-center items-center">
    <form        className="bg-white flex flex-col shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
    >
      <h1 className="text-3xl text-center mb-6 text-vermelho-claro font-semibold tracking-wider">
        Gerar Arquivo em PDF
      </h1>
      <img
        // src={foto}
        className="w-28 h-28 self-center mb-4 rounded-full"
        alt=""
      />

      <div className="flex items-center justify-between gap-x-12">
          <input
            className="cursor-pointer bg-vermelho-claro hover:bg-vermelho-hover text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
            type="submit"
            value="Gerar"
          />
          <a
            className="inline-block mx-2 mr-4 align-baseline font-bold text-sm text-vermelho-claro hover:text-vermelho-hover"
            href="/"
          >
            Voltar
          </a>
        </div>
      
    </form>
  </div>
);
}
    

 export default EditarItem;
