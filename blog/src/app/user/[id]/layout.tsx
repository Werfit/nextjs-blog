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

      <div className="!col-start-[full-screen] col-end-[full-screen] grid gap-6 px-4 md:!col-start-[container-start] md:!col-end-[container-end] md:grid-cols-6">
        <AsideNavigation
          className="md:col-span-2"
          params={params}
          user={data?.user}
        />

        <div className="md:col-span-4">{children}</div>
      </div>
    </main>
  );
};

export default ProfileLayout;
