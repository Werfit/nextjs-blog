"use client";

import { Loader } from "@/components/loader/loader.component";
import { Navigation } from "@/components/navigation/navigation.component";
import { usePrivateRoute } from "@/hooks/use-private-route.hook";

type ProfileLayoutProps = {
  children: React.ReactNode;
};

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  const { isLoading } = usePrivateRoute();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="grid-container gap-10 pb-10">
      <Navigation className="container mx-auto" />

      {children}
    </main>
  );
};

export default ProfileLayout;
