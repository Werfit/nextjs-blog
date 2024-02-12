import AuthButtons from "@/components/navigation/auth-buttons.component";

const Navigation = async () => {
  return (
    <nav className="flex justify-between px-20 items-center py-5">
      <div className="flex-grow justify-center flex gap-10">
        <button className="tracking-wider transition hover:text-gray-700">
          Blog
        </button>
        <button className="tracking-wider transition hover:text-gray-700">
          Another page
        </button>
      </div>

      <div className="flex gap-3 items-center">
        <AuthButtons />
      </div>
    </nav>
  );
};

export default Navigation;
