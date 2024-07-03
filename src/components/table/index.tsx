import { formatarData } from '@/utils/dates'
import { Spinner } from '@nextui-org/react'
// import DropdownButton from '../../pages/marketplaces/dropdown'
type Dados = { [key: string]: string | number | boolean | any }

type marketplaceProps = {
  array: Array<string>
  contentArray: string[]
  data: Dados[]
  ColsBody: number
  currentPage: string
}
export default function Table(props: marketplaceProps) {
  const arrayLengh = props.array.length

  return (
    <div className="max-w-screen  w-full   h-full ">
      <div className="  overflow-auto rounded-2xl bg-white shadow hidden md:hidden lg:hidden xl:block border  max-w-screen">
        <div
          className={`border-b-3 border-b-black w-full flex flex-col lg:grid lg:grid-cols-${props.array.length}`}
        >
          {props.array.map((i: string) => (
            <div
              key={i}
              className="w-full p-4   rounded-md flex justify-start  items-center"
            >
              <p className='font-bold text-lg'>{i}</p>
            </div>
          ))}
        </div>
        {!props.data ? (
          <Spinner />
        ) : (
          <div
            className={` flex flex-col lg:grid lg:grid-cols-${props.ColsBody}`}
          >
            {props.data.map((dados: Dados) => (
              <>
                <div className="p-4 border-b ">
                  <p>{dados[props.contentArray[0]]}</p>
                </div>
                <div className="p-4 border-b">
                  <p>{dados[props.contentArray[1]]}</p>
                </div>
                <div className="p-4 border-b">
                  <p>{dados[props.contentArray[2]]}</p>
                </div>
                <div className="p-4 border-b">
                  <p>{formatarData(dados[props.contentArray[3]])}</p>
                </div>
              </>
            ))}
          </div>
        )}
      </div>

      <div className="xl:hidden max-w-screen w-full h-full space-y-3  ">
        {!props.data ? (
          <Spinner />
        ) : (
          <>
            {props.data.map((dados) => (
              <>
                <div className="border-b border-sky-400 shadow-md  w-full flex flex-col items-center justify-center gap-2 rounded-md bg-white p-4">
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-bold">{props.array[0]}</p>
                    <p>{dados[props.contentArray[0]]}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-bold">{props.array[1]}</p>
                    <p>{dados[props.contentArray[1]]}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-bold">{props.array[2]}</p>
                    <p>{dados[props.contentArray[2]]}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-bold">{props.array[3]}</p>
                    <p>{formatarData(dados[props.contentArray[3]])}</p>
                  </div>

                  {arrayLengh >= 5 ? (
                    <div className="flex flex-col items-center justify-center">
                      <p className="font-bold">{props.array[4]}</p>
                      {props.currentPage === 'filhos' ? (
                        <>
                          {dados.usuarios_estabelecimentos.map(
                            (usuarioEstabelecimento: Array, idx: string) => (
                              <p key={idx}>
                                {usuarioEstabelecimento.usuario.email}
                              </p>
                            ),
                          )}
                        </>
                      ) : (
                        <p>{dados[props.contentArray[4]]}</p>
                      )}
                    </div>
                  ) : null}
                </div>
              </>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
/*

 <div className="xl:hidden max-w-screen w-full h-full space-y-3  ">
        {props.data.map((dados) => (
          <>
            <div className="border-b border-sky-400 shadow-md  w-full flex flex-col items-center justify-center gap-2 rounded-md bg-white p-4">
              <div className="flex flex-col items-center justify-center">
                <p className="font-bold">{props.array[0]}</p>
                <p>{dados[props.contentArray[0]]}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="font-bold">{props.array[1]}</p>
                <p>{dados[props.contentArray[1]]}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="font-bold">{props.array[2]}</p>
                <p>{dados[props.contentArray[2]]}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="font-bold">{props.array[3]}</p>
                <p>{formatarData(dados[props.contentArray[3]])}</p>
              </div>

              {arrayLengh >= 5 ? (
                <div className="flex flex-col items-center justify-center">
                  <p className="font-bold">{props.array[4]}</p>
                  {props.currentPage === 'filhos' ? (
                    <>
                      {dados.usuarios_estabelecimentos.map(
                        (usuarioEstabelecimento: Array, idx: string) => (
                          <p key={idx}>
                            {usuarioEstabelecimento.usuario.email}
                          </p>
                        ),
                      )}
                    </>
                  ) : (
                    <p>{dados[props.contentArray[4]]}</p>
                  )}
                </div>
              ) : null}
            </div>
          </>
        ))}
      </div>
*/
