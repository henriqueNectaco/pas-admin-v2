import { useRouter } from 'next/router'
import Header from '@/components/cadastroMarketplace/filepond/Header'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Spinner } from '@nextui-org/react'
import TableTestes from '../table'
export default function IdMarketplaces() {
  const router = useRouter()
  const token = Cookies.get('token')
  const { id } = router.query
  const [marketplacesChilds, setMarketplacesChilds] = useState()
  const fetchMarketplacesChilds = async () => {
    try {
      const res = await axios.get(
        `
https://api.zsystems.com.br/marketplaces/${id}/filhos`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      setMarketplacesChilds(res.data.estabelecimentos)
    } catch (error) {
      console.error(error)
    }
  }
  const auth = async () => {
    try {
      const res = await axios.post(
        `https://api.zsystems.com.br/z1/autenticar`,
        { token },
      )
      if (res.data.success === true) {
        fetchMarketplacesChilds()
      } else {
        toast.error('Sua sessão expirou faça login novamente')
        router.push('/')
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    auth()
  }, [])

  return (
    <div className="h-screen max-w-screen w-full bg-gray-50">
      <Header />
      <>
        {!marketplacesChilds ? (
          <Spinner size="lg" color="primary" />
        ) : (
          <div className=" max-w-screen w-full h-full  space-y-4    p-4 ">
            <TableTestes marketplace={marketplacesChilds} />
          </div>
        )}
      </>
    </div>
  )
}