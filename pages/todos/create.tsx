import { Box, Button, Container, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import NextLink from 'next/link';
import MuiLink from "@mui/material/Link"
import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import Header from '../../Components/Header'
import { todoListState } from '../../Components/store/Atom'

export interface ErrorFlag {
  titleNone : boolean,
  titleOver: boolean,
  detailOver: boolean
}

//ログインユーザーのみ　未完了

const Create = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDetail, setTodoDetail] = useState('');
  const [todoStatus, setTodoStatus] = useState('未完了' || '途中' || '完了');

  const [todoList, setTodoList] = useRecoilState(todoListState);

  const addTodo = () => {
    if(todoTitle.length < 1)
    {
    }
    if(todoTitle.length > 50){
    }
    if(todoDetail.length > 10){
    }
    setTodoList((todo) => [
      ...todo,
      {
        id: todo.length,
        title: todoTitle,
        detail: todoDetail,
        status: todoStatus,
      },
    ]);
    }
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
        <InputLabel id="sample">Todo</InputLabel>
        <Select
            labelId="candidate"
            label="sample"
            value={todoTitle}
            onChange={(e) => {
              setTodoTitle(e.target.value);
            }}
          >
            <MenuItem 
              value={'買い物'}
            >
              買い物
            </MenuItem>
            <MenuItem
              value={'勉強'}
            >
              勉強
            </MenuItem>
            <MenuItem
              value={'家事'}
            >
              家事
            </MenuItem>
            <MenuItem
              value={'休暇'}
            >
              休暇
            </MenuItem>
          </Select>
        <InputLabel id="sample"></InputLabel>
          <TextField
            minRows={1}
            label="候補に無いTodoはこちらにじかに入力してください" 
            type="text"
            value={todoTitle}
            onChange={(e) => {
              setTodoTitle(e.target.value);
            }}
            inputProps={{ maxLength: 50 }}
          />
        <InputLabel id="sample">Detail</InputLabel>
          <TextareaAutosize
            minRows={10}
            placeholder="内容"
            value={todoDetail}
            onChange={(e) => {
              setTodoDetail(e.target.value);
            }}
            required
          />
          <InputLabel id="status">Status</InputLabel>
          <Select
            labelId="status"
            label="Status"
            value={todoStatus}
            onChange={(e) => {
              setTodoStatus(e.target.value);
            }}
            inputProps={{ maxLength: 100 }}
            
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
        <NextLink href="/todos" >
          <MuiLink
            underline='none'
          >
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
          </MuiLink>
        </NextLink>
      </Stack>
      <Box margin='5px'>
        <NextLink href="/todos">
          <MuiLink
            underline='none'
          >
            <Button variant="contained">
              戻る
            </Button>
          </MuiLink>
        </NextLink>
      </Box>
    </Container>
  )
}

export default Create