import React from 'react'
import { Container, Content } from './styles'
import {
  FaTimes,
  FaUserAlt, FaFolderOpen,
  FaChartBar, FaLaptopHouse, FaCartPlus
} from 'react-icons/fa'

import SidebarItem from '../SidebarItem'
import { useRouter } from 'next/router'

type SidebarProps = {
  active: boolean
  onClick: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ active, onClick }) => {
  const router = useRouter();

  const closeSidebar = () => {
    active(false)
  }

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />
      <Content>
        <SidebarItem onClick={onClick} Icon={FaChartBar} Text="Dashboard" href={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`} />
        <SidebarItem onClick={onClick} Icon={FaCartPlus} Text="Vendas" href={`${process.env.NEXT_PUBLIC_BASE_URL}/vendas`} />
        <SidebarItem onClick={onClick} Icon={FaLaptopHouse} Text="Marketplaces" href={`${process.env.NEXT_PUBLIC_BASE_URL}/marketplaces`} />
        <SidebarItem onClick={onClick} Icon={FaFolderOpen} Text="Crons" href={`${process.env.NEXT_PUBLIC_BASE_URL}/crons`} />
      </Content>
    </Container>
  )
}

export default Sidebar
//FaUserAlt