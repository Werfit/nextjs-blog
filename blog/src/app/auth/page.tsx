import Link from "next/link";

const Auth = () => {
  return (
    <div className="mt-4 flex flex-col gap-2 text-center">
      <Link
        className="bg-primary-500 py-2 w-full text-white rounded-md hover:bg-primary-400"
        href="/auth/signup"
      >
        Sign Up
      </Link>
      <Link
        className="bg-lightGray-200 py-2 w-full rounded-md hover:bg-lightGray-100"
        href="/auth/login"
      >
        Login
      </Link>
    </div>
  );
};

export default Auth;
