import { TaskI } from "@/@types/task";

export const isObjectEmpty = (obj: TaskI | Object) => {
    return Object.keys(obj).length === 0;
}
