import { ReactNode } from "react";

import { auth } from "@/actions/user/helpers/auth";
import { Navigation } from "@/components/navigation/navigation.component";

import { AsideNavigation } from "./_components/aside-navigation.component";

type ProfileLayoutProps = {
  children: ReactNode;
  params: {
    id: string;
  };
};

const ProfileLayout: React.FC<ProfileLayoutProps> = async ({
  children,
  params,
}) => {
  const data = await auth();

  return (
    <main className="grid-container gap-10 pb-10">
      <Navigation className="container mx-auto" />

      <div className="grid grid-cols-4 gap-6">
        <AsideNavigation
          className="col-span-1"
          params={params}
          user={data?.user}
        />

        {children}
      </div>
    </main>
  );
};

export default ProfileLayout;
