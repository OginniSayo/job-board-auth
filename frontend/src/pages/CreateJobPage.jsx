import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";
import { useAuthGuard } from "../hooks/useAuthGuard";

const CreateJobPage = () => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useAuthGuard();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!company.trim() || !position.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/jobs", {
        company,
        position,
        status,
      });
      toast.success("Job created successfully");
      navigate(`/jobs/${user.name.toLowerCase()}`); // Redirect to job page after successful creation
    } catch (error) {
      console.log("Error creating job: ", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You are creating jobs too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create job");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link
            to={`/jobs/${user.name.toLowerCase()}`}
            className="btn btn-secondary btn-outline mb-6"
          >
            <ArrowLeftIcon className="size-5" />
            Back to Jobs
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Job</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label block text-lg font-medium text-primary mb-3">
                    <span className="label-text">Company</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Company name"
                    className="input input-bordered"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
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
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </div>

                <div className="sm:col-span-3 mb-5">
                  <label
                    htmlFor="status"
                    className="block text-lg font-medium text-primary"
                  >
                    Status
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="status"
                      name="status"
                      className="select select-bordered w-[60%]"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="interview">Interview</option>
                      <option value="declined">Declined</option>
                    </select>
                  </div>
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Job"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJobPage;
