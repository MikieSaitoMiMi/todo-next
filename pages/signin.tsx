import { Box, Button, Container, Stack, TextareaAutosize, TextField, } from '@mui/material'
import React from 'react'

//サービス名/ロゴ（フリーサイトから引っ張ってくる）、
//ログインフォーム（IDPW入力欄・ログインボタン・Googleログインボタン）、新規ユーザー登録ボタン、ローダー
//IDPWログイン、Googleログイン
//データ→ユーザーID PW
//非ログインユーザーのみ

const SignIn = () => {
  return (
    <Container maxWidth="md" sx={{ pt: 5 }} >
    <Box marginTop="35px">
      <Box
        component="h1" 
        display='flex'
        
      >
        Todo Web
      </Box>
    </Box>
    <Stack spacing={1}>
      <TextField
        minRows={1}
        label="ID"
        type="text"
      />
      <TextField
        minRows={1}
        label="Password"
        type="password"
      />
      
      <Button color="primary" variant="contained" size="large">保存</Button>
    </Stack>
  </Container>
  )
}

export default SignIn