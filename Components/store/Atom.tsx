import { atom } from 'recoil'

export interface ItodoListState {
  id: number;
  title: string;
  detail: string;
  status: string;
}

export const todoListState = atom<ItodoListState[]>({
  key: 'todoListState',
  default: [
    {
      id: 0,
      title: 'Todoのタイトル',
      detail: 'Todoの詳細',
      status: 'TodoのStatus',
    }
  ]
});