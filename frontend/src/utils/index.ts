import { surpriseMePrompts } from "../constants";

export const getRandomPrompts = (): string => {
  const len = surpriseMePrompts.length;
  return surpriseMePrompts[Math.floor(Math.random() * len)];
};
