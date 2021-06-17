import axios from 'axios'
import { useState } from 'react'

import './estilos.css'

const Formulario = () => {

  const [cep, setCep] = useState('')
  const [rua, setRua] = useState('')
  const [numero, setNumero] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [uf, setUf] = useState('')

  const obterCep = (evento) => {
    if (!evento.target.value) {
      return
    }
    const url = `https://viacep.com.br/ws/${evento.target.value}/json/`;
    axios.get(url)
      .then(response => {
        if (!response.data.erro) {
          setRua(response.data.logradouro)
          setBairro(response.data.bairro)
          setCidade(response.data.localidade)
          setUf(response.data.uf)
        }
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  const manipuladorCep = (evento) => {
    if (evento.target.value.length <= 8) {
      setCep(evento.target.value)
    }
  }

  const salvar = (evento) => {
    evento.preventDefault()
    const enderecoCompleto = {
      cep: cep,
      rua: rua,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      uf: uf
    }
    console.log(enderecoCompleto);
  }
  
  return (
    <form onSubmit={salvar}>
      <div>
        <label>CEP</label>
        <input type="number" value={cep} onChange={manipuladorCep} onBlur={obterCep} />
      </div>
      <div>
        <label>Rua</label>
        <input value={rua} onChange={(evento) => setRua(evento.target.value)}/>
      </div>
      <div>
        <label>Numero</label>
        <input value={numero} onChange={(evento) => setNumero(evento.target.value)}/>
      </div>
      <div>
        <label>Bairro</label>
        <input value={bairro} onChange={(evento) => setBairro(evento.target.value)}/>
      </div>
      <div>
        <label>Cidade</label>
        <input value={cidade} onChange={(evento) => setCidade(evento.target.value)}/>
      </div>
      <div>
        <label>UF</label>
        <input value={uf} onChange={(evento) => setUf(evento.target.value)}/>
      </div>
      <button>
        Salvar
      </button>
    </form>
  )
}

export default Formulario