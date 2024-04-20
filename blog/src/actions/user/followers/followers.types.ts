import type { UserResponse } from "@/actions/common.types";

export type UserWithSubscribersCountResponse = UserResponse & {
  _count: {
    subscribers: number;
  };
};

/**
 * Regular UserResponse with a field for indicating if the currently authorized user is subscribed to the database user
 */
export type UserWithCurrentUserSubscriber = UserResponse & {
  isFollowed: boolean;
};

export type GetSearchUsersResponse =
  | UserResponse[]
  | UserWithCurrentUserSubscriber[];
