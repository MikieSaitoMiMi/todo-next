import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import Header from '../Components/Header';
import { todoListState } from '../Components/store/Atom';
import NextLink from 'next/link';
import MuiLink from "@mui/material/Link"



//Todo:ソート、フィルター TODO作成ボタン、Todo一覧（タイトル・ステータス）
//機能→TODO詳細遷移、フィルター、ソート
//データ（五十文字以内）、内容（百文字以内）、ステータス（完了、途中、未完了）
//ログインユーザーのみ見れる

const sortTasksId = (
  arr: {id: number, title: string, detail: string, status: any}[],
  sortBy: 'id' ,
  order: 'asc' | 'desc'
) => arr.sort(
  (
    a: {id: number, title: string, detail: string, status: any},
    b: {id: number, title: string, detail: string, status: any},
  ) => (order === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy])
);

const TodosPage = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const todos = useRecoilValue(todoListState);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<'id' | 'status'>('id');

  const handleSort = (sortBy:'id' | 'status') => (
    e:React.MouseEvent
  ) => {
    const  newOrder: 'asc' | 'desc' =
    orderBy === sortBy ? (order === 'asc' ? 'desc' : 'asc') : 'asc';
    setOrderBy(sortBy);
    setOrder(newOrder);
    if(sortBy === 'id') setTodoList(sortTasksId(todoList.concat(), sortBy, newOrder));
    if(sortBy === 'status') setTodoList(sortTasksStatus(todoList.concat(), sortBy, newOrder));
  }

  return (
    <>
      <Header />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'id'}
                  direction={order === 'asc' ? 'desc' :'asc'}
                  onClick={handleSort('id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>タイトル</TableCell>
              <TableCell>内容</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'status'}
                  direction={order === 'asc' ? 'desc' :'asc'}
                  onClick={handleSort('status')}
                >
                  ステータス
                </TableSortLabel>
              </TableCell>
              <TableCell>詳細</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.id}</TableCell>
                <TableCell>{todo.title}</TableCell>
                <TableCell>{todo.detail}</TableCell>
                <TableCell>{todo.status}</TableCell>
                <TableCell>
                  {todo.id !== 0 ?
                    <MuiLink>
                      <NextLink
                        href={`/todos/${encodeURIComponent(todo.id)}`}
                      >
                        詳細
                      </NextLink>
                  </MuiLink>
                  :
                    <>詳細</>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      <NextLink href="/todos/create">
        <MuiLink
          underline='none'
        >
          <Button variant="contained">
            <Box>
              新規Todo作成
            </Box>
          </Button>
        </MuiLink>
      </NextLink>
      
      </TableContainer>
    </>
  )
}

export default TodosPage
