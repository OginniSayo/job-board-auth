import Navbar from '../components/Navbar'

const HomePage = () => {
  return (
    <div className='min-h-screen'>
      <Navbar />
      <h1 className="text-3xl font-bold text-center mt-10 font-grotesk">
        Welcome to JobBoard!
      </h1>
    </div>
  )
}

export default HomePage