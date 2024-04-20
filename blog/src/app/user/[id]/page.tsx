import { UserWithCurrentUserSubscriber } from "@/actions/user/followers/followers.types";
import { auth } from "@/actions/user/helpers/auth";
import { getUserProfile } from "@/actions/user/profile/profile.action";

import { ProfileDataEditor } from "./_components/profile-data-editor.component";
import { ProfileDataViewer } from "./_components/profile-data-viewer.component";

type ProfileProps = {
  params: {
    id: string;
  };
};

const Profile: React.FC<ProfileProps> = async ({ params }) => {
  const user = await getUserProfile(params.id);
  const session = await auth();

  if (!user) {
    return;
  }

  return session?.user.id === params.id ? (
    <ProfileDataEditor className="col-span-3" user={user} />
  ) : (
    <ProfileDataViewer
      className="col-span-3"
      user={session?.user}
      profile={user as UserWithCurrentUserSubscriber}
    />
  );
};

export default Profile;
