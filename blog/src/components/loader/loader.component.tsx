import { Portal } from "@/components/portal/portal.component";

const Loader = () => {
  return (
    <Portal targetId="loader">
      <div className="py-4 text-center text-xl">Loading...</div>
    </Portal>
  );
};

export { Loader };
