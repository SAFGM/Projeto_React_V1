
import '../../App.css';
import { Form, } from 'react-bootstrap';
import { useState, } from "react";

function EditarItem() {
    const  [nome, setNome] = useState("");
    const  [profissao, setDescricao] = useState("");
    const  [contato, setContato] = useState("");
    return (    <div className="text-center" >
    
             <h1 className="text-center"> Cadastrar</h1>

              <Form  className="jumbotron">

                  <Form.Group className="text-center">
                      <Form.Label for="nome">Nome</Form.Label>
                      <Form.Control
                       className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                         type="text"
                         placeholder="Informe seu nome"
                         minLength={"0"}
                         maxLength={"50"}
                         required 
                         value={nome}
                         onChange={e => setNome(e.target.value)} />
                         
                        
                      <Form.Control.Feedback type="invalid">
                          Deve conter ao menos 5 caracteres.
                      </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                      <Form.Label for="dataNascimento">Descriçao:</Form.Label>
                      <Form.Control
                         type="text"
                         required
                         value={profissao}
                         
                         onChange={e => setDescricao(e.target.value)} />

                      <Form.Control.Feedback type="invalid">
                          Deve conter ao menos 5 caracteres.
                      </Form.Control.Feedback>
                   </Form.Group>
                   <Form.Group>
                      <Form.Label for="telefone">Telefone:</Form.Label>
                      <Form.Control
                         type="text"
                         placeholder="Informe Telefone"
                         minLength={"0"}
                         maxLength={"15"}
                         required
                                                    
                         value={contato}
                         onChange={e => setContato(e.target.value)} />

                      <Form.Control.Feedback type="invalid">
                          Deve conter ao menos 5 caracteres.
                      </Form.Control.Feedback>
                   </Form.Group>
                   &nbsp;

                  
                  <Form.Group className="text-center">
                      
                      &nbsp;&nbsp;&nbsp;
                      <a href="/" className="btn btn-light">Voltar</a>
                  </Form.Group>
              </Form>
              
    
      </div>
  );
}

export default EditarItem;