import Header from '../../components/Header/index'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Spinner } from '@nextui-org/react';
import { CardCron } from './items';

type CronProps = {
  Cron: string,
  Scheduled: string,
  Mensagem: string,
  date: string;
}
export default function Crons() {

  const [logs, setLogs] = useState([]);
  const [crons, setCrons] = useState<any>(null);
  const [mensagem, setMensagem] = useState<any>('');
  const token = Cookies.get('token')
  const getCrons = async () => {
    const res = await axios.get(`https://api.zsystems.com.br/z1/crons/logs
        `, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (res.data.success === true) {
      toast.success(res.data.sucess)
      setCrons(res.data.cronsLogs)
      setMensagem(res.data.cronsLogs.mensage)
      console.log()


    } else {
      toast.error(res.data.error)
    }
  };

  useEffect(() => {
    getCrons();
    console.log(crons)
    console.log(mensagem)
  }, []);
  function formatarData(dataString: any) {
    const dataOriginal = new Date(dataString);

    const dia = dataOriginal.getDate().toString().padStart(2, '0');
    const mes = (dataOriginal.getMonth() + 1).toString().padStart(2, '0'); // Os meses são indexados a partir de 0
    const ano = dataOriginal.getFullYear().toString();
    const hora = dataOriginal.getHours().toString().padStart(2, '0');
    const minutos = dataOriginal.getMinutes().toString().padStart(2, '0');

    const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minutos}`;

    return dataFormatada;
  }

  return (
    <div className='h-screen w-full'>
      <Header />
      <div className='p-2 flex flex-col '>
      <>
        {!crons ? (
          <Spinner color='primary' size='lg'/>
        ) : (
          <>
            {crons.map((crons: any) => (

              <div key={crons.id}>
                < CardCron Cron={crons.slug} Scheduled={crons.interval} Mensagem={crons.message} date={formatarData(crons.start_date)} />
              </div>
            ))}
          </>
        )}

      </></div>
    </div >)
}
/*
<div className='bg-white text-center px-8 rounded-xl mx-8 my-4 shadow-md border-2 lg:grid lg:grid-cols-5 '>
<div className="p-4 lg:my-auto">
  <p className="font-bold">Cron</p>
  <p className="">??</p>
</div>
<div className="p-4 lg:my-auto">
  <p className="font-bold">Schesduled</p>
  <p className="">??</p>
</div>
<div className="p-4 col-span-2 ">
  <p className="font-bold">Mensagens</p>
  <p className="">??</p>
</div>
<div className="p-4 lg:my-auto">
  <p className="font-bold">Data</p>
  <p className="">s</p>
</div>

</div> */