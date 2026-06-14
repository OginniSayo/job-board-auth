import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const JobCard = ({ job, setJobs }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // get rid of navigation behavior
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      api.delete(`/jobs/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id)); // get rid of the deleted note from the UI immediately
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error deleting job: ", error);
      toast.error("Failed to delete job");
    }
  };

  return (
    <div>
      <Link
        to={`/job/${job._id}`}
        className="card bg-base-300 hover:shadow-lg transition-all duration-200 
        border-t-4 border-solid border-base-content/70"
      >
        <div className="card-body">
          <h3 className="card-title text-primary capitalize">
            Company: <span className="text-base-content">{job.company}</span>
          </h3>
          <p className="text-primary text-base line-clamp-3 capitalize">
            Position: <span className="text-base-content">{job.position}</span>
          </p>
          <p className="text-primary text-base line-clamp-3 capitalize">
            Status: <span className="text-base-content">{job.status}</span>
          </p>

          <div className="card-actions justify-between items-center mt-4">
            <span className="text-base text-base-content/70">
              {formatDate(new Date(job.createdAt))}
            </span>
            <div className="flex items-center gap-1">
              <PenSquareIcon className="size-4" />
              <button
                className="btn btn-ghost btn-xs text-error"
                onClick={(e) => handleDelete(e, job._id)}
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default JobCard;
