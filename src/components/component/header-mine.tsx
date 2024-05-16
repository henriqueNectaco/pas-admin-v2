import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import Link from "next/link"

export default function HeaderMine() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500 text-white w-full">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-start justify-between h-full">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="text-white mt-4 w-auto lg:hidden" size="icon" variant="outline">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full" side="top">
              <div className="grid gap-4 p-4">
                <Link className="font-medium hover:text-blue-200" href="#">
                  Dashboard
                </Link>
                <Link className="font-medium hover:text-blue-200" href="#">
                  Vendas
                </Link>
                <Link className="font-medium hover:text-blue-200" href="#">
                  Marketplace
                </Link>
                <Link className="font-medium hover:text-blue-200" href="#">
                  Crons
                </Link>
                <Link className="font-medium hover:text-blue-200" href="#">
                  Validar taxas e SSL's
                </Link>
                <Button className="text-white hover:bg-blue-600" variant="outline">
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center justify-between w-full py-6 md:py-8">
            <Link className="font-medium hover:text-blue-200 hidden lg:flex items-center" href="#">
              <MountainIcon className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 justify-center w-full h-full">
              <Link className="font-medium hover:text-blue-200" href="#">
                Dashboard
              </Link>
              <Link className="font-medium hover:text-blue-200" href="#">
                Vendas
              </Link>
              <Link className="font-medium hover:text-blue-200" href="#">
                Marketplace
              </Link>
              <Link className="font-medium hover:text-blue-200" href="#">
                Crons
              </Link>
              <Link className="font-medium hover:text-blue-200" href="#">
                Validar taxas e SSL's
              </Link>
            </nav>
            <div className="hidden md:block">
              <Button className="text-white hover:bg-blue-600" variant="outline">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 md:px-6 flex-1 w-[25%]" />
    </div>
  )
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}