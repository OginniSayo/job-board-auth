import { ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react'
import api from '../lib/axios';
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router';

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/register', {
        username,
        email,
        password
      });
      toast.success("Registration successful! Please login.");
      navigate('/login');

    } catch (error) {
      console.log("Error registering user: ", error);
      if(error.response?.status === 429) {
        toast.error(error.response?.data?.message || "Slow down! You are creating notes too fast", {
          duration: 4000,
          icon: '💀'
        });
      } else {
        toast.error(error.response?.data?.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={'/'} className='btn btn-primary mb-6 rounded-full py-4'>
            <ArrowLeftIcon className='size-5' />
            Back to Home
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-5">Register User</h2>

              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label mb-3" htmlFor="username">
                    <span className='label-text text-lg text-base-content'>Username</span>
                  </label>
                  <div>
                    <input 
                      id='username'
                      type="text"
                      placeholder='John Doe' 
                      className='input w-full rounded-xl text-base-content/90'
                      autoComplete="first-name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-control mb-4">
                  <label className="label mb-3" htmlFor="email">
                    <span className='label-text text-lg text-base-content'>Email</span>
                  </label>
                  <div>
                    <input 
                      id='email'
                      type="email" 
                      placeholder='johndoe@example.com' 
                      className='input w-full rounded-xl text-base-content/90'
                      autoComplete='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-control mb-8">
                  <label className="label mb-3" htmlFor="password">
                    <span className='label-text text-lg text-base-content'>Password</span>
                  </label>
                  <div>
                    <input 
                      id='password'
                      type="password"
                      className='input w-full rounded-xl text-base-content/90'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="card-actions justify-end">
                  <button 
                    type="submit" 
                    className='btn btn-primary'
                    disabled={loading}
                  >
                    {loading ? "Creating User..." : "Register User"}
                  </button>
                </div>
              </form>

              <p className="text-center mt-4 text-sm">
                Have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage

