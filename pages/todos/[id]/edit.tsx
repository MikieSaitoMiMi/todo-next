import { Box, Button, Container, InputLabel, MenuItem, Select, Stack, TextareaAutosize, TextField, Typography } from '@mui/material'
import React from 'react'
import Header from '../../../Components/Header'

//Todoフォーム（タイトル・期限・ステータス）、保存ボタン
//Todo編集

const edit = () => {
  return (
    <Container maxWidth="md" sx={{ pt: 5 }} >
      <Header />
      <Box marginTop="35px">
        <Typography
          component="h4" 
          variant="h4"
        >
          Todo Edit
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
        <Button color="primary" variant="contained" size="large">保存</Button>
      </Stack>
    </Container>
  )
}

export default edit