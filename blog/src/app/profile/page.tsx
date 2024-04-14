import { redirect } from "next/navigation";

import { auth } from "@/actions/user/helpers/auth";
import { Icon } from "@/components/icon/icon.component";

import { ProfileDataEditor } from "./_components/profile-data-editor.component";

const Profile = async () => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="grid grid-cols-4 gap-6">
      <aside className="col-span-1">
        <ul className="rounded-md border bg-white">
          <li className="flex cursor-pointer items-center gap-2 px-4 py-1 tracking-wide transition hover:bg-lightGray-50">
            <Icon name="account_circle" /> Profile
          </li>
          <li className="block h-[0.1rem] rounded-md bg-lightGray-100"></li>
          <li className="flex cursor-pointer items-center gap-2 px-4 py-1 tracking-wide transition hover:bg-lightGray-50">
            <Icon name="lock" /> Password
          </li>
          <li className="block h-[0.1rem] rounded-md bg-lightGray-100"></li>
          <li className="flex cursor-pointer items-center gap-2 px-4 py-1 tracking-wide transition hover:bg-lightGray-50">
            <Icon name="article" /> Articles
          </li>
        </ul>
      </aside>

      <ProfileDataEditor className="col-span-3" />
    </div>
  );
};

export default Profile;
