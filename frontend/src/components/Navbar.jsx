import { HammerIcon, MenuIcon, XIcon } from 'lucide-react'
import { Link } from 'react-router'
import ThemeToggle from '../components/ThemeToggle'

const Navbar = () => {

  return (
    <div className="drawer drawer-end">
        <input id="nav-drawer" type="checkbox" className="drawer-toggle" />

        {/* navbar content */}
        <div className="drawer-content">
          <nav className='container mx-auto p-4 md:px-8'>
            <div className='flex items-center justify-between'>
              <Link to={'/'} className='flex items-center gap-2'>
                <HammerIcon size={36} />
                <h1 className='text-2xl font-bold'>JobBoard</h1>
              </Link>

              {/* hamburger - mobile only */}
              <label htmlFor="nav-drawer" className="btn btn-ghost md:hidden">
                <MenuIcon size={24} />
              </label>

              {/* desktop nav */}
              <div className='hidden md:flex gap-4 items-center'>
                <Link to={"/login"} className='btn btn-primary'>Login</Link>
                <Link to={"/register"} className='btn btn-primary'>Register</Link>
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </div>

        {/* offcanvas sidebar */}
        <div className="drawer-side z-50">
          <label htmlFor="nav-drawer" aria-label="close sidebar" className="drawer-overlay" />
          <div className="bg-base-100 min-h-full w-72 p-6 flex flex-col gap-4">
            
            {/* close button */}
            <div className="flex justify-between items-center mb-4">
              <div className='flex items-center gap-2'>
                <HammerIcon size={24} />
                <span className='font-bold text-lg'>JobBoard</span>
              </div>
              <label htmlFor="nav-drawer" className="btn btn-ghost btn-sm">
                <XIcon size={20} />
              </label>
            </div>

            <Link to={"/login"} className='btn btn-primary w-full'>Login</Link>
            <Link to={"/register"} className='btn btn-primary w-full'>Register</Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
  )
}

export default Navbar
