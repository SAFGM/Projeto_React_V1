import {  useNavigate,  } from "react-router-dom";
import { useState } from "react";

import { Button, Form, Modal} from 'react-bootstrap';
import CadastroModel from '../../model/cadasto.model';


function Cadastro() {

    const [nome, setNome] = useState("");
    const  [profissao, setDescricao] = useState("");
    const  [contato, setContato] = useState("");
   
    const [formValid, setFormValid] = useState(false);
    const [exibirModal, setExibirModal] = useState(false);

    
    function cadastrar(event) {
        event.preventDefault();
        setFormValid(true);
        if(event.currentTarget.checkValidity() === true) {
            // obtem os dados p/ cadastro
            const cadastroDB = localStorage['cadastros']; 
            const cadastros = cadastroDB ? JSON.parse(cadastroDB) :  [];
            
            // persistir 
            cadastros.push(new CadastroModel(new Date().getTime(), nome, profissao, contato));
            localStorage['cadastros'] =  JSON.stringify(cadastros);
            setExibirModal(true);
        }
    }
    
    const navigator = useNavigate();
    const handleFecharModal = () => {
       return navigator("/");
    }


    return (
        <div  className="jumbotron">
          <h3 className="text-center"> Cadastrar</h3>
 
                <Form validated = {formValid}
                    noValidate
                    onSubmit={cadastrar}>

                    <Form.Group className="mb-3">
                        <Form.Label for="nome">Nome</Form.Label>
                        <Form.Control
                           type="text"
                           placeholder="Informe seu nome"
                           minLength={"0"}
                           maxLength={"50"}
                           required 
                           value={nome}
                           onChange={e => setNome(e.target.value)}
                           />
                          
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
                        <Button className="btn btn-primary"
                            variant="sucess"
                            type="submit">
                                Cadastrar
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <a href="/" className="btn btn-light">Voltar</a>
                    </Form.Group>
                </Form>
                <Modal show={exibirModal} onHide={handleFecharModal}>
                {/* <Modal show={false}> */}
                    <Modal.Header closeButton>
                       <Modal.Title>Sucesso</Modal.Title> 
                    </Modal.Header>
                    <Modal.Body>
                        Dados adcionados com sucesso!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-primary"
                            variant="sucess"
                            onClick={handleFecharModal}>
                                Continuar
                            </Button>
                    </Modal.Footer>
                </Modal>
           
      
        </div>
    );
}

export default Cadastro;