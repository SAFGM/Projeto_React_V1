
import { useState, useEffect,} from "react";

export default function PaginaReceber(props)  {
    const [textInfo, setTextInfo] = useState("");

    useEffect(() => {
      // Aqui recebemos a informação.
      // Acessamos com o mesmo nome que
      // setamos no componente anterior
    //    setTextInfo(props.location.state.text);

     

    }, []);
  
    return <p>Texto Recebido: {textInfo}</p>;

}

