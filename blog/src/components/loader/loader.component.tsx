import Portal from "@/components/portal/portal.component";

const Loader = () => {
  return (
    <Portal targetId="loader">
      <div className="text-center text-xl py-4">Loading...</div>
    </Portal>
  );
};

export default Loader;
