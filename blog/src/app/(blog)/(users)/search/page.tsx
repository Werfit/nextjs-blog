import { getUsers } from "@/actions/user/followers.action";
import { User } from "@/components/user/user.component";

import { SearchParamsInput } from "./search-params-input";

type UserSearchPageProps = {
  searchParams: {
    username?: string;
  };
};

const UserSearchPage: React.FC<UserSearchPageProps> = async ({
  searchParams,
}) => {
  const users = await getUsers(searchParams.username);

  return (
    <div className="flex flex-col gap-10">
      <SearchParamsInput defaultValue={searchParams.username ?? ""} />

      <div className="flex flex-col gap-2">
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserSearchPage;
