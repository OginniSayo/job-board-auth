import { Link } from "react-router";
import { FrownIcon } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <FrownIcon className="size-20 text-primary mx-auto mt-4" />
        <p className="text-2xl mt-4 mb-8">Oops! Route Does not Exist</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
