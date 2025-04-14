import { Outlet } from '@tanstack/react-router'

export function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold">Tic-Tac-Emoji</h1>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <Outlet />
      </main>
      <footer className="py-2 px-6 bg-gray-800 text-white text-sm text-center">
        <p>© {new Date().getFullYear()} Jonathan Klaric</p>
      </footer>
    </div>
  )
}