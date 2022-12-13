import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { useRecoilValue } from 'recoil';
import Header from '../Components/Header';
import { todoListState } from '../Components/store/parts/TodoList';


//Todo:ソート、フィルター TODO作成ボタン、Todo一覧（タイトル・ステータス）
//機能→TODO詳細遷移、フィルター、ソート
//データ（五十文字以内）、内容（百文字以内）、ステータス（完了、途中、未完了）
//ログインユーザーのみ見れる

const createData =  (
  date : string,
  detail: string,
  status: string,
) => {
  return { date, detail, status }
}

const dummy = [
  createData('dummyのtodoです', 'このtodoはdummyです', '完了' ),
  createData('dummyのtodoです', 'このtodoはdummyです', '途中' ),
  createData('dummyのtodoです', 'このtodoはdummyです', '未完了' ),
];

const TodosPage = () => {
  const todoList = useRecoilValue(todoListState);
  return (
    <>
      <Header />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>データ</TableCell>
              <TableCell>内容</TableCell>
              <TableCell>ステータス</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todoList.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.title}</TableCell>
                <TableCell>{todo.detail}</TableCell>
                <TableCell>{todo.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TodosPage