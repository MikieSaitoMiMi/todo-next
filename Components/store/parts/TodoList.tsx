import { atom } from 'recoil'

export const todoListState = atom({
  key: 'todoListState',
  default: [
    {
      id: null,
      title: 'dummy',
      detail: 'dummy',
      status: '未完了' || '途中' || '完了',
    }
  ]
});