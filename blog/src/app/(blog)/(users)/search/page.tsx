import { getUsers } from "@/actions/user/followers/followers.action";

import { UsersList } from "./_components/users-list.component";
import { SearchParamsInput } from "./search-params-input";

type UserSearchPageProps = {
  searchParams: {
    username?: string;
  };
};

const UserSearchPage: React.FC<UserSearchPageProps> = async ({
  searchParams,
}) => {
  const users = searchParams.username
    ? await getUsers(searchParams.username)
    : [];

  return (
    <div className="flex flex-col gap-10">
      <SearchParamsInput defaultValue={searchParams.username ?? ""} />

      <UsersList users={users} />
    </div>
  );
};

export default UserSearchPage;
