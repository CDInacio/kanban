import { Itask } from "@/@types/task";

export const isObjectEmpty = (obj: Itask | Object) => {
    return Object.keys(obj).length === 0;
}
