import Image from "next/image";

import { combineClassNames } from "@/utils/class-name.util";

export type AvatarProps = {
  imageUrl?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  className?: string;
};

const COLORS = [
  "bg-red-500",
  "bg-green-500",
  "bg-primary-500",
  "bg-emerald-500",
];

const alphabet = "abcdefghijklmnopqrstuvwxyz";

const getColor = (initial?: string): string => {
  if (!initial) {
    return COLORS[0];
  }

  const letterIndex = Math.min(
    alphabet
      .split("")
      .findIndex((character) => character === initial[0].toLowerCase()),
    0,
  );

  const colorIndex = Math.floor(
    letterIndex / Math.floor(alphabet.length / COLORS.length),
  );

  return COLORS[colorIndex];
};

const Avatar: React.FC<AvatarProps> = ({
  imageUrl,
  username,
  firstName,
  lastName,
  className,
}) => {
  const getInitials = () => {
    if (firstName && lastName) {
      return `${firstName[0]} ${lastName[0]}`;
    }

    if (username) {
      return username[0];
    }

    return "";
  };

  return imageUrl ? (
    <Image
      src={imageUrl}
      alt="Avatar"
      width={100}
      height={100}
      className={className}
      priority
    />
  ) : (
    <div
      className={combineClassNames(
        className,
        getColor(getInitials()),
        "flex items-center justify-center text-4xl text-white",
      )}
    >
      {getInitials().toUpperCase()}
    </div>
  );
};

export { Avatar };
