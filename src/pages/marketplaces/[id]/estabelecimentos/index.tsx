import FilterEstabeleciments from '@/components/marketplaces/filterEstabeleciments'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { toast } from 'sonner'
import Table from '@/components/table'
import { Spinner } from '@nextui-org/react'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import nextCookies from 'next-cookies'
import Paginator from '@/components/marketplaces/pagination'
import { objectMarketplace } from '@/types/marketplaces'
import { apiUrl } from '@/lib'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = nextCookies(context)

  const authRes = await axios.post(`${apiUrl}/autenticar`, { token })

  if (authRes.data.success === false) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const { id } = context.query
  const res = await axios.get(
    `${apiUrl}/z1/marketplace/${id}/estabelecimentos?limit=30&page=1`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )

  return {
    props: {
      dataEstabeleciments: res.data.estabelecimentos,
      totalPages: res.data.pagination.pages,
    },
  }
}

export default function Estabelecimentos({
  dataEstabeleciments,
  totalPages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isFirstRenderization, setIsFirstRenderization] = useState(true)
  const [marketplacesPai, setMarketplacesPai] = useState<
    Array<objectMarketplace> | undefined
  >(undefined)
  const [page, setPage] = useState(1)
  const [totalPagess, setTotalPagess] = useState(totalPages)
  const [token] = useState(Cookies.get('token'))
  const [estabeleciments, setEstabeleciments] = useState(dataEstabeleciments)
  const [data, setData] = useState({
    id_estabelecimento: '',
    identificacao_fatura: '',
    nome_fantasia: '',
  })

  const router = useRouter()
  const { id } = router.query
  const fetchChilds = async () => {
    try {
      const res = await axios.get(`${apiUrl}/marketplaces/${id}/filhos`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.data.success === true) {
        setMarketplacesPai(res.data.estabelecimentos)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const queryParams = {
    limit: 30,
    page,
    id_estabelecimento: data.id_estabelecimento,
    identificacao_fatura: data.identificacao_fatura,
    nome_fantasia: data.nome_fantasia,
  }

  const handleFilter = async () => {
    try {
      setEstabeleciments(null)
      const res = await axios.get(
        `${apiUrl}/z1/marketplace/${id}/estabelecimentos`,
        {
          params: queryParams,
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      if (res.data.success === true) {
        setEstabeleciments(res.data.estabelecimentos)
        setTotalPagess(res.data.pagination.pages)
      } else {
        toast.warning('algo inesperado aconteceu')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleCleanFilter = () => {
    setData((prev) => ({
      ...prev,
      id_estabelecimento: '',
      identificacao_fatura: '',
      nome_fantasia: '',
    }))
    setPage(1)
  }
  useEffect(() => {
    setIsFirstRenderization(false)
    fetchChilds()
  }, [])

  useEffect(() => {
    if (isFirstRenderization === false) {
      handleFilter()
    }
  }, [page])

  return (
    <div className="max-w-screen w-full  bg-gray-300">
      <div
        className={`w-full p-4 bg-gray-200 ${estabeleciments === null || estabeleciments.length <= 10 ? 'h-screen' : 'h-full'}`}
      >
        <FilterEstabeleciments
          onChange={handleChange}
          filtrar={() => {
            setPage(1)
            handleFilter()
          }}
          limparFiltro={handleCleanFilter}
          data={data}
        />
        {estabeleciments !== null ? (
          <div className="gap-4 flex flex-col items-center justify-center  ">
            <Table
              array={['Id', 'Nome', 'Nome na Fatura', 'Data de criação', '']}
              ColsBody={5}
              currentPage="estabelecimentosFilhos"
              data={estabeleciments}
              MarketplacesArray={marketplacesPai}
            />
            <Paginator
              total={totalPagess}
              onCickPrevious={() => {
                setIsFirstRenderization(false)
                setPage(page - 1)
              }}
              onChangeCurrentPage={setPage}
              page={page}
              onClickNext={() => {
                setIsFirstRenderization(false)
                setPage(page + 1)
              }}
            />
          </div>
        ) : (
          <div className="flex  h-full items-center justify-center w-full border ">
            <Spinner size="lg" />
          </div>
        )}
      </div>
    </div>
  )
}
