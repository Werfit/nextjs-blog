export type DropdownAction = {
  title: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
};

export const allowedLevels: DropdownAction["level"][] = [1, 2];

export const HeaderDropdownActions: DropdownAction[] = [
  {
    level: 1,
    title: "H1",
  },
  {
    level: 2,
    title: "H2",
  },
  {
    level: 3,
    title: "none",
  },
];
