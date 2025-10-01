import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-700">
        Oops! Page not found
      </h2>
      <p className="mt-2 text-gray-500 text-center max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 rounded-2xl bg-purple-600 text-white font-medium shadow hover:bg-purple-700 transition"
      >
        Go back home
      </Link>
    </div>
  );
}
