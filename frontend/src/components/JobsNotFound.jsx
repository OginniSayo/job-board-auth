import { WrenchIcon } from "lucide-react";
import { Link } from "react-router";

const JobsNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <WrenchIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">No jobs yet</h3>
      <p className="text-base-content/70">
        Ready to start organizing your personal job applications? Start by creating a job.
      </p>
      <Link to="/job/create" className="btn btn-primary">
        Create Your First Job
      </Link>
    </div>
  );
};
export default JobsNotFound;