import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { parseDate } from '@internationalized/date'
import { useRouter } from 'next/router'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  useDisclosure,
  DateValue,
  RangeValue,
} from '@nextui-org/react'
import { DotsThreeOutlineVertical } from 'phosphor-react'
import ModalMine from '@/components/modal'
import axios from 'axios'
import { apiPas, apiUrl, formatDateToYYYYMMDD, localUrl, today } from '@/lib'
import { toast } from 'sonner'

type TypeProps = {
  id: number
  nomeFantasia: string
}
const token = Cookies.get('token')
export default function DropdownButton(props: TypeProps) {
  const [dataTaxTransaction, setDataTaxTransaction] = useState({
    email: undefined,
    amount: undefined,
    cobrancaPorTransacao: undefined,
  })
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [modalProps, setModalProps] = useState({
    action: 'Confirmar',
    useTaxForTransaction: false,
    useDatePicker: true,
    useDesativar: false,
  })
  const [value, setValue] = useState<RangeValue<DateValue>>({
    start: parseDate(today),
    end: parseDate(today),
  })
  const router = useRouter()
  const handleChangeTaxTransaction = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    setDataTaxTransaction((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  const cobrancaTransacao = async () => {
    try {
      await axios.post(
        `${localUrl}/cobrancaportransacao`,
        {
          id: props.id,
          amount: dataTaxTransaction.amount,
          email: dataTaxTransaction.email,
        },
        //  { headers: { Authorization: `Bearer ${token}` } },
      )
      // api/marketplaces/id/cobranca-por-transacao
    } catch (error) {
      console.error(error)
    }
  }
  const importarECs = async () => {
    try {
      const res = await axios.post(
        `${apiPas}/marketplace/import-establishment`,
        {
          startDate: formatDateToYYYYMMDD(value.start),
          endDate: formatDateToYYYYMMDD(value.end),
          marketplaceId: props.id,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      if (res.data.success === true) {
        toast.success('Adicionado a fila com sucesso')
        onClose()
      }
    } catch (error) {
      console.error(error)
    }
  }
  const importarVendas = async () => {
    try {
      const res = await axios.post(
        `${apiPas}/marketplaces/${props.id}/importar-pedidos`,
        {
          startDate: formatDateToYYYYMMDD(value.start),
          endDate: formatDateToYYYYMMDD(value.end),
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      if (res.data.success === true) {
        toast.success('Adicionado a fila!')
        onClose()
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleTurnOffMarketplace = async () => {
    try {
      const res = await axios.put(
        `${apiUrl}/marketplaces/desabilitar/${props.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      )
      if (res.data.success === true) {
        toast.success('Marketplace desativado com sucesso')
        onClose()
      }
    } catch (error) {
      console.error(error)
    }
  }
  const reprocessarVendas = async () => {
    try {
      await axios.post(
        `${apiUrl}/marketplaces/reprocessar-pedidos/${props.id}`,
        {
          startDate: formatDateToYYYYMMDD(value.start),
          endDate: formatDateToYYYYMMDD(value.end),
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      console.log(value)
    } catch (error) {
      console.error(error)
    }
  }

  const handleFuncoes = async () => {
    switch (modalProps.action) {
      case 'Reprocessar Vendas':
        reprocessarVendas()
        break
      case 'Desativar':
        handleTurnOffMarketplace()
        break
      case 'Importar Vendas':
        importarVendas()
        break
      case `Importar EC's`:
        importarECs()
        break
      case 'Cobrança por transação':
        cobrancaTransacao()
        break
      case 'teste':
        onClose()
        break
      default:
        console.log('outro')
        break
    }
  }

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="light">
            <DotsThreeOutlineVertical size={20} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Action event example"
          onAction={(key) => {
            if (key === 'showmarketplaceschilds') {
              router.push(`/marketplaces/${props.id}/filhos`)
            } else if (key === 'showestabelecimentschilds') {
              router.push(`/marketplaces/${props.id}/estabelecimentos`)
            } else if (key === 'reprocessSales') {
              setModalProps((prev) => ({
                ...prev,
                action: 'Reprocessar Vendas',
                useDatePicker: true,
                useTaxTransaction: false,
                useDesativar: false,
              }))
              onOpen()
            } else if (key === 'importEc') {
              setModalProps((prev) => ({
                ...prev,
                action: `Importar EC's`,
                useDatePicker: true,
                useTaxTransaction: false,
                useDesativar: false,
              }))
              onOpen()
            } else if (key === 'importSales') {
              onOpen()
              setModalProps((prev) => ({
                ...prev,
                action: 'Importar Vendas',
                useDesativar: false,
                useDatePicker: true,
                useTaxTransaction: false,
              }))
            } else if (key === 'addssl') {
              router.push(
                `/marketplaces/${props.id}/${props.nomeFantasia}/adicionar-ssl`,
              )
            } else if (key === 'cadastrarMarketplaceFilho') {
              router.push(`/marketplaces/${props.id}/cadastrar-filho`)
            } else if (key === 'taxfortransaction') {
              setModalProps((prev) => ({
                ...prev,
                action: 'Cobrança por transação',
                useDatePicker: false,
                useTaxForTransaction: true,
                useDesativar: false,
              }))
              onOpen()
            } else if (key === 'renewcache') {
              router.push(`/marketplaces/${props.id}/renovar-cache`)
            } else if (key === 'desativar') {
              setModalProps((prev) => ({
                ...prev,
                action: 'Desativar',
                useDesativar: true,
                useDatePicker: false,
                useTaxTransaction: false,
              }))
              onOpen()
            }
            // else if (key === 'teste') {
            //   setModalProps((prev) => ({
            //     ...prev,
            //     action: 'teste',
            //     useDatePicker: true,
            //     useTaxForTransaction: false,
            //     useDesativar: false,
            //   }))
            //   onOpen()
            //   alert('menor gay')
            // }
          }}
          color="primary"
          variant="solid"
        >
          <DropdownItem key="cadastrarMarketplaceFilho">
            Cadastrar Marketplace filho
          </DropdownItem>
          <DropdownItem key="showmarketplaceschilds">
            Visualizar Marketplaces filhos
          </DropdownItem>
          <DropdownItem key="showestabelecimentschilds">
            Visualizar Estabelecimentos filhos
          </DropdownItem>
          <DropdownItem key="addssl">Adicionar SSL</DropdownItem>
          <DropdownItem key="reprocessSales">Reprocessar Vendas</DropdownItem>
          <DropdownItem key="importEc">Importar EC&apos;s</DropdownItem>
          <DropdownItem key="taxfortransaction">
            Cobrança por transação
          </DropdownItem>
          <DropdownItem key="importSales">Importar Vendas</DropdownItem>
          <DropdownItem key="renewcache">Renovar Cache</DropdownItem>
          <DropdownItem key="desativar">Desativar</DropdownItem>
          {/* <DropdownItem key="teste">teste</DropdownItem> */}
        </DropdownMenu>
      </Dropdown>
      <ModalMine
        modalProps={modalProps}
        action={modalProps.action}
        onClick={handleFuncoes}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        value={value}
        setValue={setValue}
        onChangeTaxTransaction={handleChangeTaxTransaction}
      />
    </>
  )
}
