import { Box, Button, Container, InputLabel, MenuItem, Select, TextareaAutosize, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import Header from '../../Components/Header'

//Todoフォーム（タイトル・内容・ステータス）、作成ボタン
//機能→Todoタイトル候補（？）、Todo作成
//ログインユーザーのみ
interface TodoFormData{
  title:  string
  detail: string
  status: string
}

const create = () => {
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
        />
        <TextareaAutosize
          minRows={10}
          placeholder="内容"
        />
        <InputLabel id="status">Status</InputLabel>
        <Select
          labelId="status"
          label="Status"
        >
          <MenuItem>未完了</MenuItem>
          <MenuItem>途中</MenuItem>
          <MenuItem>完了</MenuItem>
        </Select>
        <Button color="primary" variant="contained" size="large">作成</Button>
      </Stack>
    </Container>
  )
}

export default create