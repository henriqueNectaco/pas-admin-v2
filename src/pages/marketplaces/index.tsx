import Cookies from "js-cookie";
import Header from '../../components/Header/index';
import { Button, Input } from '@nextui-org/react'
import ButtonOptions from './buttonOptions'
import { useEffect, useState } from "react";
import A from './a'
import { DatePicker } from "@nextui-org/react";

import axios from "axios";

export default function Marketplace() {
  const token = Cookies.get('token')
  const [email, setEmail] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [name, setName] = useState('')
  const [idInput, setIdInput] = useState('')
  const [resData, setResData] = useState('')
  const handleCleanInput = () => {
    setEmail('')
    setCnpj('')
    setName('')
    setIdInput('')

  }
  const handleChangeNameInput = (e: any) => {
    setName(e.target.value)
  }
  const handleChangeCnpjInput = (e: any) => {
    setCnpj(e.target.value)
  }
  const handleChangeEmailInput = (e: any) => {
    setEmail(e.target.value)
  }
  const handleChangeIdInput = (e: any) => { setIdInput(e.target.value) }
  useEffect(() => {
    const getServerSideDate = async () => {
      try {
        const res = await axios.get('https://api.zsystems.com.br/z1/marketplaces?status=ativo', { headers: { Authorization: `Bearer ${token}` }, });
        console.log(res.data.marketplaces); // Aqui você pode fazer algo com os dados da resposta 
        setResData(res.data.marketplaces)
        console.log(resData)
      } catch (error) {
        console.error(error);
      }
    };

    getServerSideDate();
  }, []);

  return (
    <div className=" h-screen w-full flex flex-col items-center  ">
      <Header />
      <div className="w-full p-2">
        <div className=" w-full  gap-6 p-4 flex flex-row items-center  border-2  ">
          <Button radius="md" size="lg" variant="solid" color="primary">Reprocessar todas as vendas</Button>
          <Button radius="md" size="lg" variant="solid" color="primary">Novo Marketplace</Button>
          <Button radius="md" size="lg" variant="solid" color="primary">Importar todas as vendas</Button>
        </div>
        <div className="w-full border-2 p-6 gap-4 flex flex-col lg:flex-row items-center justify-between  ">
          <Input className="w-1/8" placeholder="ID" variant="underlined" value={idInput} onChange={handleChangeIdInput} />
          <Input className="w-1/8" placeholder="Nome" variant="underlined" value={name} onChange={handleChangeNameInput} />
          <DatePicker className="w-1/8" variant="underlined" label={'Selecione uma data'} />
          <Input placeholder="email" className="w-1/8" variant="underlined" value={email} onChange={handleChangeEmailInput} />
          <Input placeholder="CNPJ" className="w-1/8" variant="underlined" value={cnpj} onChange={handleChangeCnpjInput} />
          <A />
          <Button onClick={handleCleanInput} color="danger">Limpar</Button>
          <Button color="primary">Filtrar</Button>
        </div>
      </div>
      {resData ? (
        <div className="w-full h-full    border-2 border-red-600 p-2  ">
          {resData.map((resData: any) => (
            <div className="w-full border-2  flex  flex-col   items-center justify-center lg:flex-row p-4 gap-2">

              <div className="w-1/4  flex flex-col items-center justify-center">
                <p>Id:</p>
                <p>{resData.mainECId}</p>
              </div>
              <div className="w-1/4  flex flex-col items-center justify-center">
                <p>ID EC:</p>
                <p>{resData.mainECId}</p>
              </div>
              <div className="w-1/4  flex flex-col items-center justify-center">
                <p>Marketplace
                </p>
                <p>{resData.mainECNomeFantasia}</p>
              </div>

              <div className="w-1/4  flex flex-col items-center justify-center">
                <p>Email:</p>
                <p>{resData.mainECEmail}</p>
              </div>

            </div>

          ))}


        </div>
      ) : null}
    </div>

  )
}