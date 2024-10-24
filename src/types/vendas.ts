import { Dispatch, SetStateAction } from 'react'

type EstabelecimentoType = {
  razao_social: string
  nome_fantasia: string
  marketplace: {
    nome: string
  }
}
export type typePagamentos = {
  valor_recebido: number
  data_recebimento: Date
  valor: number
  taxa: number
  markup: null | number
}
export type typeResponseData = {
  markup: null
  pagamentos: Array<typePagamentos>
  pedidos_splits: Array<object>
  parcelas: number
  id: string
  valor_bruto: number
  valor_liquido: number
  estabelecimento: EstabelecimentoType
  status_pedido: {
    titulo: string
  }
}

export interface ZoopTransaction {
  created_at: Date
  payment_method: {
    card_brand: string
  }
  payment_type: string
  //
}
export interface typePagament {
  status_pagamento_id: string
}
export type FormVendasTypes = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  Isloading: boolean
  setInputIdDaVenda: Dispatch<SetStateAction<string | undefined>>
  vendaId: string | undefined
  handleCleanInput: () => void
}

export type splits = {
  id: string
  valor: number
  tipo_split: number
  estabelecimento: {
    nome_fantasia: string
  }
}

export type splitsTypes = {
  id: string
  valor: number
  tipo_split: number
  estabelecimento: {
    nome_fantasia: string
  }
}
