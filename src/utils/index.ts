import { format, subDays } from "date-fns"
import { toast } from "sonner"
import Cookies from 'js-cookie'
import { GetServerSideProps } from 'next';
import nextCookies from 'next-cookies';
import axios from "axios";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL
export const localUrl = process.env.NEXT_PUBLIC_LOCAL
export const responseDataResponse = (toastStringError: string, resData: any, toastStringSucces?: string) => {
  if (resData === false) {
    toast.warning(toastStringError)
  } else if (resData === true) {
    toast.success(toastStringSucces)
  }
}

const newDate = new Date()

export const token = Cookies.get('token')

export const today = format(newDate, 'yyyy-MM-dd')

const yesterdayGet = subDays(newDate, 1)
export const yesterday = format(yesterdayGet, 'yyyy-MM-dd')


const thirtyDaysAgoGet = subDays(newDate, 30)
export const thirtyDaysAgo = format(thirtyDaysAgoGet, 'yyyy-MM-dd')

const previousThirtyDaysGet = subDays(newDate, 60)
export const previousThirtyDays = format(previousThirtyDaysGet, 'yyyy-MM-dd')




export const statusPayment = (statusPaymentId: number) => {
  switch (statusPaymentId) {
    case 1:
      return 'Pendente';
    case 2:
      return 'Pago';
    case 3:
      return 'Cancelado';
    case 4:
      return 'Estornado';
    case 5:
      return 'Pré Autorizado';
    default:
      return '-'
  }
}
export const statusMarketplacesChilds = (status: number) => {
  switch (status) {
    case 2: return "Aprovado";
    case 4: return "Desabilitado";
  }
}


export const nullVerifiyer = (dataString: string) => {

  switch (dataString) {
    case '': return "Unknown"
    default: return dataString
  }
}


export const LogOut = () => {
  Cookies.remove('token') // ou localStorage.removeItem('token');

}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = nextCookies(context);

  const authRes = await axios.post(
    `${apiUrl}/autenticar`,
    { token }
  );

  if (authRes.data.success === false) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: { dados: authRes.data.usuario } };
};