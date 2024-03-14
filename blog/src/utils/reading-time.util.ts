const TIME_TO_READ_COEFFICIENT = 200;

export const calculateTimeToRead = (content: string) =>
  Math.ceil(content.split(" ").length / TIME_TO_READ_COEFFICIENT);
