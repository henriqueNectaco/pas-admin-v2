import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  // try {
  //   const response = await axios.post(`${apiUrl}/z1/autenticar`, {
  //     token,
  //   })

  //   if (response.data.success === false) {
  //     return NextResponse.redirect(new URL('/', req.url))
  //   }
  // } catch (error) {
  //   console.error('Erro ao autenticar:', error)
  //   return NextResponse.redirect(new URL('/', req.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard',
    '/vendas',
    '/marketplaces',
    '/crons',
    '/marketplaces/cadastrar',
    '/marketplaces/:id/filhos',
    '/marketplaces/:id/estabelecimentos',
    '/marketplaces/:id/:nomefantasia/adicionar-ssl',
    '/marketplaces/:id/cadastrar-filho',
  ],
}
