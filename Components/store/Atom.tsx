import { atom, selector } from 'recoil'

export interface ItodoListState {
  id:number;
  title: string;
  detail: string;
  status: string;
}

export const todoListState = atom<ItodoListState[]>({
  key: 'todoListState',
  default: [
    {
      id: 0,
      title: 'dummy',
      detail: 'dummy',
      status: '未完了',
    }
  ]
});