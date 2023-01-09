import { FieldValue, serverTimestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface ItodoListState {
  id: number;
  title: string;
  detail: string;
  status: string;
  uuid: string;
  createdAt: FieldValue;
  updateAt: FieldValue;
}

export const todoListState = atom<ItodoListState[]>({
  key: "todoListState",
  default: [
    {
      id: 0,
      title: "Todoのタイトル",
      detail: "Todoの詳細",
      status: "TodoのStatus",
      uuid: "",
      createdAt: serverTimestamp(),
      updateAt: serverTimestamp(),
    },
  ],
});

export const uuid = atom({
  key: "uuid",
  default: "",
});
