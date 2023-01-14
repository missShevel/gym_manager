import { File } from 'domains';

export function formatFileName(file: File) {
  return `${file.name}${file.extention}`;
}
