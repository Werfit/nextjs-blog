import { redirect } from "next/navigation";

import { auth } from "@/actions/user/helpers/auth";

type SecurityLayoutProps = {
  children: React.ReactElement;
  params: {
    id: string;
  };
};

const SecurityLayout: React.FC<SecurityLayoutProps> = async ({
  children,
  params,
}) => {
  const session = await auth();

  if (!session?.user || session.user.id !== params.id) {
    redirect(`/user/${params.id}`);
  }
  return children;
};

export default SecurityLayout;
