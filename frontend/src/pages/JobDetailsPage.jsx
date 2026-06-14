import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { useAuthGuard } from "../hooks/useAuthGuard";

const JobDetailsPage = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { jobId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  useAuthGuard()

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${jobId}`);
        setJob(res.data.job);
        
      } catch (error) {
        console.log("Error fetching job: ", error);
        toast.error("Failed to fetch the job");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);
  

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await api.delete(`/jobs/${jobId}`);
      toast.success("Job deleted successfully");
      navigate(`/jobs/${user.name.toLowerCase()}`);
    } catch (error) {
      console.log("Error deleting job: ", error);
      toast.error("Failed to delete the job");
    }
  };

  const handleSave = async () => {
    if (!job.company.trim() || !job.position.trim()) {
      toast.error("Please add a company and position");
      return;
    }

    setSaving(true);

    try {
      await api.patch(`/jobs/${jobId}`, job);
      toast.success("Job updated successfully");
      navigate(`/jobs/${user.name.toLowerCase()}`);
    } catch (error) {
      console.log("Error updating job: ", error);
      toast.error("Failed to update the job");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }
  

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link 
              to={`/jobs/${user.name.toLowerCase()}`} 
              className="btn btn-secondary btn-outline"
            >
              <ArrowLeftIcon className="size-5" />
              Back to Jobs
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="size-5" />
              Delete Job
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label block text-lg font-medium text-primary mb-3">
                  <span className="label-text">Company</span>
                </label>
                <input
                  type="text"
                  placeholder="Company name"
                  className="input input-bordered"
                  value={job.company}
                  onChange={(e) => setJob({ ...job, company: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label block text-lg font-medium text-primary mb-3">
                  <span className="label-text">Position</span>
                </label>
                <input
                  type="text"
                  placeholder="Job position"
                  className="input input-bordered"
                  value={job.position}
                  onChange={(e) => setJob({ ...job, position: e.target.value })}
                />
              </div>

              <div className="sm:col-span-3 mb-5">
                <label htmlFor="status" className="block text-lg font-medium text-primary">Status</label>
                <div className="mt-2 grid grid-cols-1">
                  <select 
                    id="status" 
                    name="status" 
                    className="select select-bordered w-[60%]"
                    value={job.status}
                    onChange={(e) => setJob({ ...job, status: e.target.value })}
                  >
                    <option value="pending">Pending</option>
                    <option value="interview">Interview</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetailsPage
