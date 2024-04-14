import { ReactNode } from "react";

import { Navigation } from "@/components/navigation/navigation.component";

type ProfileLayoutProps = {
  children: ReactNode;
};

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  return (
    <main className="grid-container gap-10 pb-10">
      <Navigation className="container mx-auto" />

      {children}
    </main>
  );
};

export default ProfileLayout;
