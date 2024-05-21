import { atom } from "recoil";

export const TodosAtom = atom<TodoResponse[]>({
    key: "TodosAtom",
    default: []
})