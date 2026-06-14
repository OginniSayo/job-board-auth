import { useState, useEffect } from "react"
import { useParams } from "react-router"
import RateLimitedUI from "../components/RateLimitedUI"
import api from "../lib/axios"
import toast from "react-hot-toast"

import JobsNavbar from "../components/JobsNavbar"
import JobCard from "../components/JobCard"
import JobsNotFound from "../components/JobsNotFound"

import { useAuthGuard } from "../hooks/useAuthGuard";

const JobsPage = () => {

  const [isRateLimited, setIsRateLimited] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { name: paramName } = useParams();

  useAuthGuard(paramName);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs");
        setJobs(res.data.jobs)
        console.log(jobs);
        
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching jobs", error);
        if(error.response?.status === 429) {
          setIsRateLimited(true);
          toast.error("Too many requests! Slow down and try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    
    fetchJobs();
  }, []);
  
  

  return (
    <>
      <div className="min-h-screen">
        <JobsNavbar />


        <div className="max-w-7xl mx-auto p-4 mt-6">
          {loading && <div className='text-center text-primary py-10'>Loading jobs...</div>}

          {!loading && isRateLimited && <RateLimitedUI />}
          
          {!loading && !isRateLimited && jobs.length === 0 && <JobsNotFound />}

          {!loading && !isRateLimited && jobs.length > 0 && (
            <>
              <h1 className="text-3xl font-bold text-center mb-15 capitalize">Hello {paramName}</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} setJobs={setJobs} />
                ))}
              </div>         
            </>

          )}

        </div>

      </div>
    
    </>
  )
}

export default JobsPage
