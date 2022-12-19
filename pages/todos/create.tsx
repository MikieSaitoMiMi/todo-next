import { Box, Button, Container, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import NextLink from 'next/link';
import MuiLink from "@mui/material/Link"
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import Header from '../../Components/Header'
import { todoListState } from '../../Components/store/Atom'


//ログインユーザーのみ　未完了

const Create = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDetail, setTodoDetail] = useState('');
  const [todoStatus, setTodoStatus] = useState('未完了' || '途中' || '完了');

  const [emptyErrFlg, setEmptyErrFlg] = useState(false);

  const [todoList, setTodoList] = useRecoilState(todoListState);


  useEffect(() => {
    if(todoTitle === '' && todoDetail === ''){
      //タイトルと内容どちらにも入力がない場合はエラー
      setEmptyErrFlg(true);
    }else {
      setEmptyErrFlg(false);
    }
  }, [emptyErrFlg, todoDetail, todoTitle])

  const addTodo = () => {
    if(emptyErrFlg !== true){
      setTodoList((todo) => [
        ...todo,
        {
          id: todo.length,
          title: todoTitle,
          detail: todoDetail,
          status: todoStatus,
        },
      ]);
      //入力がない場合は初期化処理は不要なので省く
      if(todoTitle !== ''){
        setTodoTitle('');
      }
      if(todoDetail !== ''){
        setTodoDetail('');
      }
      setTodoStatus('');
    }
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
        {emptyErrFlg ?
          <TextField
          minRows={1}
          placeholder="候補に無いTodoはこちらにじかに入力してください" 
          type="text"
          value={todoTitle}
          inputProps={{ maxLength:50 }}
          error
          helperText='タイトルか内容の入力は必須です'
          onChange={(e) => {
            setTodoTitle(e.target.value);
          }}
        />
        :
          <TextField
          minRows={1}
          label="候補に無いTodoはこちらにじかに入力してください" 
          type="text"
          value={todoTitle}
          inputProps={{ maxLength:50 }}
          onChange={(e) => {
            setTodoTitle(e.target.value);
          }}
        />
      }

      <InputLabel id="sample">Detail</InputLabel>
      {emptyErrFlg ? 
      <TextField
        rows={2}
        maxRows={2}
        multiline
        placeholder="内容"
        value={todoDetail}
        inputMode='text'
        inputProps={{ maxLength:100 }}
        onChange={(e) => {
          setTodoDetail(e.target.value);
        }}
        error
        helperText='タイトルか内容の入力は必須です'
      />
      :
        <TextField
          rows={2}
          maxRows={2}
          multiline
          placeholder="内容"
          value={todoDetail}
          inputMode='text'
          inputProps={{ maxLength:100 }}
          onChange={(e) => {
            setTodoDetail(e.target.value);
          }}
        />
      }
        
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
        {emptyErrFlg ?
          <Button 
            color="primary" 
            variant="contained" 
            size="large"
            fullWidth
            disabled={emptyErrFlg}
            onClick={(e)=>{
              addTodo();
            }}
          >
            作成
          </Button>
          :
            <NextLink href="/todos" >
              <MuiLink
                underline='none'
              >
                <Button 
                  color="primary" 
                  variant="contained" 
                  size="large"
                  fullWidth
                  onClick={(e)=>{
                    addTodo();
                  }}
                >
                  作成
                </Button>
              </MuiLink>
          </NextLink>
        }
      <NextLink href="/todos">
        <MuiLink
          underline='none'
        >
          <Button variant="contained" fullWidth>
            戻る
          </Button>
        </MuiLink>
      </NextLink>
      </Stack>
    </Container>
  )
}

export default Create