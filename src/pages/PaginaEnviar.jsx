
import {useNavigate} from "react-router-dom";
import Receber from '../pages/PaginaReceber'

export default function PaginaEnviar() {
    const nm ="savio"
    const history = useNavigate();
const enviar = () => {
    



    history("/Receber",
        // state: { parm},
      );
}
  return (<div>
    <Receber text={nm}/>
    <button type="button" onClick={() => enviar("Dado a ser enviado xxcxcxcz")}>
      Enviar dado
    </button>
    </div>
  );
}
