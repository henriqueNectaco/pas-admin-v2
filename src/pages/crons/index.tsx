import { useState } from 'react'
import axios from 'axios'
import { Spinner } from '@nextui-org/react'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import nextCookies from 'next-cookies'
import Table from '@/components/table'
import { apiUrl } from '@/lib'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = nextCookies(context)
  const getCrons = await axios.get(`${apiUrl}/z1/crons/logs`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return { props: { data: getCrons.data.cronsLogs } }
}

export default function Crons({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [crons] = useState(data)

  return (
    <div className="h-full max-w-screen w-full text-black-500">
      <div className="lg:p-6 p-3 max-w-screen space-y-2 flex flex-col h-full bg-gray-200">
        <>
          {!crons.length ? (
            <Spinner color="primary" size="lg" />
          ) : (
            <div className="p-4 lg:grid-cols-1">
              <Table
                currentPage="crons"
                array={['crons', 'Scheduled', 'Mensagem', 'Data']}
                data={crons}
                ColsBody={4}
              />
            </div>
          )}
        </>
      </div>
    </div>
  )
}
