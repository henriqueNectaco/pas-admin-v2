import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url))
  }
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
