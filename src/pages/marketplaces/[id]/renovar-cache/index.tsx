import DropDownMenuCache from '@/components/dropdownmenu'
import { parseDate } from '@internationalized/date'
import { formatDateToYYYYMMDD, today } from '@/lib'
import { ChangeEvent, useEffect, useState } from 'react'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import axios from 'axios'
import { toast } from 'sonner'
import { DatePicker, DateRangePicker } from '@nextui-org/date-picker'
import { DateValue, RangeValue, CalendarDate } from '@nextui-org/react'

export type typeDataRenovarCache = {
  date: string | null
}

export default function RenovarCachePage() {
  const [valueDateRange, setValueDateRange] =
    useState<RangeValue<CalendarDate> | null>({
      start: parseDate(today), // Data atual
      end: parseDate(today), // Último dia do mês
    })

  const [data, setData] = useState<typeDataRenovarCache>({
    date: null,
  })

  const [valueDataRecebimento, setValueDataRecebimento] =
    useState<DateValue | null>(
      parseDate(today), // Inicializa com a data atual
    )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:4000/renovarcache', data)
      toast.success('Dados enviados com sucesso!')
    } catch (error) {
      toast.error('Erro ao enviar os dados.')
    }
  }

  useEffect(() => {
    if (
      valueDataRecebimento &&
      typeof valueDataRecebimento.toDate === 'function'
    ) {
      setData((prev) => ({
        ...prev,
        date: formatDateToYYYYMMDD(valueDataRecebimento),
        startDate: valueDateRange
          ? formatDateToYYYYMMDD(valueDateRange.start)
          : null,
        endDate: valueDateRange
          ? formatDateToYYYYMMDD(valueDateRange.end)
          : null,
      }))
    }
  }, [valueDataRecebimento, valueDateRange, setValueDateRange])

  return (
    <div className="max-w-screen w-full max-h-screen h-screen flex items-start justify-center    bg-gray-200 p-8 pt-12">
      <div className="w-full lg:w-2/4  flex flex-col items-center justify-start bg-white rounded-md shadow-xl ">
        <h1 className="border-b border-black w-full p-4 flex items-center justify-center text-xl font-semibold">
          Renovar Cache
        </h1>
        <div className="w-full  flex flex-col   h-full  p-4 lg:p-10 gap-4  ">
          <div className="flex flex-col   ">
            <div className=" flex flex-col lg:flex-row items-center justify-center gap-2 ">
              <DateRangePicker
                radius="sm"
                size="md"
                variant="flat"
                color="default"
                label="Selecione um intervalo"
                onChange={setValueDateRange} // Passando setValueDateRange para lidar com RangeValue<CalendarDate> | null
                value={valueDateRange}
              />
              <DatePicker
                radius="sm"
                color="primary"
                variant="faded"
                labelPlacement="inside"
                size="md"
                label={'Data de recebimento'}
                value={valueDataRecebimento}
                onChange={setValueDataRecebimento} // Passando setValueDataRecebimento que aceita DateValue | null
              />
            </div>
            <div className=" row-span-3 gap-4 ">
              <Input
                name="cliente"
                label="Cliente"
                variant="underlined"
                onChange={handleChange}
              />
              <Input
                name="estabelecimento"
                label="Estabelecimento"
                variant="underlined"
                onChange={handleChange}
              />
              <div className="flex lg:flex-row lg:gap-6">
                <Input
                  name="de"
                  type="number"
                  onChange={handleChange}
                  label="de"
                  variant="underlined"
                />
                <Input
                  name="ate"
                  type="number"
                  onChange={handleChange}
                  label="ate"
                  variant="underlined"
                />
              </div>
            </div>
          </div>
          <div className="pt-2 flex flex-col h-full  gap-2">
            <div className="flex flex-col    gap-2  ">
              <div className="flex lg:flex-row flex-col w-full   gap-4">
                <div className="flex flex-col w-full gap-1">
                  <p className="lg:text-lg">Tipo de venda</p>
                  <DropDownMenuCache
                    title={'Selecione o tipo de venda'}
                    setData={setData}
                    items={['Presencial', 'Online', 'Link de pagamento']}
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <span className="lg:text-lg">Status da venda</span>
                  <DropDownMenuCache
                    title="Selecione o status da venda"
                    setData={setData}
                    items={[
                      'Pendente',
                      'Aprovado',
                      'Falhado',
                      'Cancelado',
                      'Estornado',
                    ]}
                  />
                </div>
              </div>
              <div className="flex  flex-col lg:flex-row gap-4">
                <div className="flex flex-col w-full gap-1">
                  <span className="lg:text-lg">Bandeira</span>
                  <DropDownMenuCache
                    title="Selecione uma bandeira"
                    items={[
                      'American Express',
                      'Elo',
                      'Maestro',
                      'Mastercard',
                      'Visa',
                      'Visa electron',
                      'Diners Club',
                      'Hiper',
                      'Hipercard',
                      'Banescard',
                    ]}
                    setData={setData}
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <span className="lg:text-lg">Forma de pagamento</span>
                  <DropDownMenuCache
                    title={'Formas Pagamentos'}
                    setData={setData}
                    items={[
                      'Boleto',
                      'Débito',
                      'Pix',
                      'Crédito à Vista',
                      'Crédito parcelado',
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className=" flex items-end h-full">
              <Button color="primary" fullWidth={true} onClick={handleSubmit}>
                ENVIAR
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
