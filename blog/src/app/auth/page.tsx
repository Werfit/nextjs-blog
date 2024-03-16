import Link from "next/link";

const Auth = () => {
  return (
    <div className="mt-4 flex flex-col gap-2 text-center">
      <Link
        className="w-full rounded-md bg-primary-500 py-2 text-white hover:bg-primary-400"
        href="/auth/signup"
      >
        Sign Up
      </Link>
      <Link
        className="w-full rounded-md bg-lightGray-200 py-2 hover:bg-lightGray-100"
        href="/auth/login"
      >
        Login
      </Link>
    </div>
  );
};

export default Auth;
