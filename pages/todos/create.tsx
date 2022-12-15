import { Box, Button, Container, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import Header from '../../Components/Header'
import { todoListState } from '../../Components/store/Atom'

//Todoフォーム（タイトル・内容・ステータス）、作成ボタン　完了
//機能→Todoタイトル候補（？）、Todo作成　タイトル候補以外完了
//ログインユーザーのみ　未完了

type Atoms = {

}

const Create = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDetail, setTodoDetail] = useState('');
  const [todoStatus, setTodoStatus] = useState('未完了' || '途中' || '完了');

  const [todoList, setTodoList] = useRecoilState(todoListState);

  const addTodo = () => {
    setTodoList((todo) => [
      ...todo,
      {
        id: todo.length + 1 ,
        title: todoTitle,
        detail: todoDetail,
        status: todoStatus,
      },
    ]);
    setTodoTitle('');
    setTodoDetail('');
    setTodoStatus('');
  };

  return (
    <Container maxWidth="md" sx={{ pt: 5 }} >
      <Header />
      <Box marginTop="35px">
        <Typography
          component="h4" 
          variant="h4"
        >
          Todo Create
        </Typography>
      </Box>
      <Stack spacing={1}>
        <TextField
          minRows={1}
          label="タイトル" 
          type="text"
          value={todoTitle}
          onChange={(e) => {
            setTodoTitle(e.target.value);
          }}
        />
        <TextareaAutosize
          minRows={10}
          placeholder="内容"
          value={todoDetail}
          onChange={(e) => {
            setTodoDetail(e.target.value);
          }}
        />
        <InputLabel id="status">Status</InputLabel>
        <Select
          labelId="status"
          label="Status"
          value={todoStatus}
          onChange={(e) => {
            setTodoStatus(e.target.value);
          }}
        >
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
        <Button 
          color="primary" 
          variant="contained" 
          size="large"
          onClick={(e)=>{
            addTodo();
          }}
        >
          作成
        </Button>
      </Stack>
    </Container>
  )
}

export default Create