import { redirect } from "next/navigation";

import { getUserProfile } from "@/actions/user/profile.action";

import { ProfileDataEditor } from "./_components/profile-data-editor.component";

type ProfileProps = {
  params: {
    id: string;
  };
};

const Profile: React.FC<ProfileProps> = async ({ params }) => {
  const user = await getUserProfile(params.id);

  if (!user) {
    return redirect("/");
  }

  return <ProfileDataEditor className="col-span-3" user={user} />;
};

export default Profile;
