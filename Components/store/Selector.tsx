import { selector } from "recoil";
import { todoListState } from "./Atom";

export const todoListStatus = selector({
  key: "todoListStatus",
  get: ({ get }) => {
    const todoList = get(todoListState);
  },
});
