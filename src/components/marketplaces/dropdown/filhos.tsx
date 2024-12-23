import ModalMine from '@/components/modal'
import { Button } from '@nextui-org/button'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'
import { DotsThreeOutlineVertical } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { parseDate } from '@internationalized/date'
import { DateValue, RangeValue, useDisclosure } from '@nextui-org/react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { objectMarketplace } from '@/types/marketplaces'
import router from 'next/router'
import { today, formatDateToYYYYMMDD, apiUrl } from '@/lib'

interface ModalProps {
  useDatePicker: boolean
  useDesativar: boolean
  useTaxForTransaction: boolean
  useDropdownChangeParents: boolean
  action: string
}

type typeProps = {
  items: string[] // O tipo já estava correto, mas agora explícito como string[]
  onAction?: () => void
  fullWidth?: boolean
  MarketplacesArray?: objectMarketplace[] // `undefined` é opcional, mas pode ser mais explícito
  id?: string
  nomefantasia?: string
}

export default function DropDownMenuFilhos(props: typeProps) {
  const [id, setId] = useState<string | undefined>(undefined)

  const [modalProps, setModalProps] = useState<ModalProps>({
    useDatePicker: false,
    useDesativar: false,
    useTaxForTransaction: false,
    useDropdownChangeParents: false,
    action: '',
  })

  const token = Cookies.get('token')
  const [value, setValue] = useState<RangeValue<DateValue> | null>({
    start: parseDate(today),
    end: parseDate(today),
  })
  const [action, setAction] = useState('Confirmar')
  const [date, setDate] = useState({
    startDate: parseDate(today),
    endDate: parseDate(today),
  })
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const changeParent = async () => {
    try {
      await axios.put(
        `${apiUrl}/${props.id}/change-parent`,
        { parentId: id },
        { headers: { Authorization: `Bearer ${token}` } },
      )
    } catch (error) {
      console.error(error)
    }
  }

  const reprocessarPedidos = async () => {
    try {
      await axios.post(
        `${apiUrl}/estabelecimentos/${props.id}/reprocessar-pedidos?startDate=${date.startDate}&endDate=${date.endDate}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleFuncoes = async () => {
    switch (action) {
      case 'Reprocessar pedidos':
        reprocessarPedidos()
        break
      case 'Trocar de parent':
        changeParent()
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (value) {
      setDate((prev) => ({
        ...prev,
        startDate: parseDate(formatDateToYYYYMMDD(value.start)),
        endDate: parseDate(formatDateToYYYYMMDD(value.end)),
      }))
    }
  }, [value])

  return (
    <>
      <Dropdown shouldBlockScroll={true}>
        <DropdownTrigger>
          <Button
            size="md"
            variant="light"
            color="default"
            fullWidth={props.fullWidth}
          >
            <DotsThreeOutlineVertical size={20} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          className="max-h-56 overflow-auto"
          aria-label="Action event example"
          onAction={(key) => {
            if (key === 'Trocar de parent') {
              setAction('Trocar de parent')
              setModalProps((prev) => ({
                ...prev,
                useDropdownChangeParents: true,
                useDatePicker: false,
                action: 'Trocar de parent',
              }))
              onOpen()
            } else if (key === 'Reprocessar pedidos') {
              setAction('Reprocessar pedidos')
              setModalProps((prev) => ({
                ...prev,
                useDropdownChangeParents: false,
                useDatePicker: true,
                useDesativar: false,
                useTaxForTransaction: false,
              }))
              onOpen()
            } else if (key === 'Adicionar SSL') {
              router.push(
                `/marketplaces/${props.id}/${props.nomefantasia}/adicionar-ssl`,
              )
            }
          }}
          color="primary"
          variant="solid"
        >
          {props.items.map((i) => (
            <DropdownItem key={i}>{i}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <ModalMine
        modalProps={modalProps}
        setId={setId}
        action={action}
        onClick={handleFuncoes}
        value={value}
        setValue={setValue}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        MarketplacesArray={props.MarketplacesArray}
      />
    </>
  )
}
