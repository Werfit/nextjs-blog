import {
  UserWithCurrentUserSubscriber,
  UserWithSubscribersCountResponse,
} from "./followers/followers.types";

export const replaceCountWithIsFollowed = (
  user: UserWithSubscribersCountResponse,
): UserWithCurrentUserSubscriber => {
  const { _count, ...data } = user;
  return { ...data, isFollowed: _count.subscribers > 0 };
};
