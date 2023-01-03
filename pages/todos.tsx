import { Button, Checkbox, ListItemText, MenuItem, OutlinedInput, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, SelectChangeEvent, FormControl, FormControlLabel } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import Header from '../Components/Header';
import { ItodoListState, todoListState } from '../Components/store/Atom';
import NextLink from 'next/link';
import MuiLink from "@mui/material/Link"
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';


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
  

  //ソート用
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<'id' | 'status'>('id');

  //フィルター用
  const [filter, setFilter] = useState('全て表示' || '未完了' || '途中' || '完了');
  const [filterTodos, setFilterTodos] = useRecoilState(todoListState);

  const handleSort = (sortBy:'id' | 'status') => (
    e:React.MouseEvent
  ) => {
    const  newOrder: 'asc' | 'desc' =
    orderBy === sortBy ? (order === 'asc' ? 'desc' : 'asc') : 'asc';
    setOrderBy(sortBy);
    setOrder(newOrder);
    if(sortBy === 'id') setTodoList(sortTasksId(todoList.concat(), sortBy, newOrder));
  }

  //モーダルで選択されたステータスのtodoのみを表示する
  //コンソールログの時点で、ステータスが切り替わっていない
  const filterHandler = async(e:SelectChangeEvent<string>) => {
    setFilter(e.target.value);
    todos.map((todo) => {
      console.log(todo);
      if(todo.status === filter && todo.id !== 0){
        setFilterTodos([todo]);
      }
    })
    console.log(filterTodos);
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
              <TableCell></TableCell>
              <TableCell></TableCell>
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
                <TableCell>
                  {todo.id !== 0 ?
                    <MuiLink>
                      <NextLink
                        href={`/todos/${encodeURIComponent(todo.id)}/edit`}
                      >
                        編集
                      </NextLink>
                    </MuiLink>
                  :
                    <>編集</>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box
          margin='10px'
        >
          <NextLink href="/todos/create">
            <MuiLink
              underline='none'
              marginTop='10px'
              marginRight='10px'
            >
              <Button variant="contained">
                <Box>
                  新規Todo作成
                </Box>
              </Button>
            </MuiLink>
          </NextLink>
          <Select
          multiline
          value={filter}
          onChange={filterHandler}
          >
            <MenuItem 
              value={'全て表示'}
            >
              全て表示
            </MenuItem>
            <MenuItem 
              value={'未完了'}
            >
              未完了
            </MenuItem>
            <MenuItem
              value={'途中'}
            >
              途中
            </MenuItem>
            <MenuItem
              value={'完了'}
            >
              完了
            </MenuItem>
          </Select>
        </Box>
      </TableContainer>
    </>
  )
}

export default TodosPage
