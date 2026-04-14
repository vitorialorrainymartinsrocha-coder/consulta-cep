import React, { useState } from 'react';
import './Consulta.css';

function Consulta() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState({});
  const [erro, setErro] = useState(null);

  const consultarCep = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) throw new Error('CEP não encontrado');
      const data = await response.json();
      if (data.erro) throw new Error('CEP não encontrado');
      setEndereco(data);
      setErro(null);
    } catch (error) {
      setEndereco({});
      setErro(error.message);
    }
  };

  return (
    <div className="CEP">
      <h2>Consulta de CEP</h2>
      <div className="input-row">
        <input
          type="text"
          placeholder="Digite o CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && consultarCep()}
        />
        <button onClick={consultarCep}>Consultar</button>
      </div>
      {erro && <p className="erro">{erro}</p>}
      {endereco.cep && (
        <div className="result">
          <p><span>CEP:</span> {endereco.cep}</p>
          <p><span>Logradouro:</span> {endereco.logradouro}</p>
          <p><span>Bairro:</span> {endereco.bairro}</p>
          <p><span>Cidade:</span> {endereco.localidade}</p>
          <p><span>Estado:</span> {endereco.uf}</p>
        </div>
      )}
    </div>
  );
}

export default Consulta;