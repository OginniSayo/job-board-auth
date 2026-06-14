import { HammerIcon, MenuIcon, PlusIcon, XIcon } from "lucide-react";
import { Link } from "react-router";
import ThemeToggle from "./ThemeToggle";

const JobsNavbar = () => {
  return (

    <div className="drawer drawer-end">
      <input id="nav-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <nav className="container flex items-center justify-between p-4 mx-auto md:px-8">
          <Link to={'/'} className='flex items-center gap-2'>
            <HammerIcon size={36}/>
            <h1 className='text-2xl font-bold'>JobBoard</h1>
          </Link>

          <label htmlFor="nav-drawer" className="btn btn-ghost md:hidden">
            <MenuIcon size={24} />
          </label>

          <div className="hidden md:flex gap-4 items-center">
            <Link to={"/job/create"} className='btn btn-primary'>
              <PlusIcon className='size-5'/>
              <span>New Job</span>
            </Link>
            <ThemeToggle />
          </div>
        </nav>

      </div>

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

          <Link to={"/job/create"} className='btn btn-primary'>
            <PlusIcon className='size-5'/>
            <span>New Job</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    
    </div>
  );
};

export default JobsNavbar;
