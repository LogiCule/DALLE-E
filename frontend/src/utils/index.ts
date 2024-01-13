import { surpriseMePrompts } from "../constants";
import FileSaver from "file-saver";

export const getRandomPrompts = (): string => {
  const len = surpriseMePrompts.length;
  return surpriseMePrompts[Math.floor(Math.random() * len)];
};

export async function downloadImage(id: string, photo: string) {
  FileSaver.saveAs(photo, `download-${id}.jpg`);
}
