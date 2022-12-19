import { Box, Button, Container, Stack, TextField } from '@mui/material';
import React, { useState } from 'react'
import imageSrc from '../img/logo.png'
import Image from 'next/image';
import NextLink from 'next/link';
import MuiLink from "@mui/material/Link"

//IDパスワード入力欄、ユーザー名入力欄、新規登録ボタン、ログインはこちら
//機能→ユーザー登録
//データ→メールアドレス、パスワード（半角英数八文字以上）、Googleアカウント
//非ログインユーザーのみ

const SignUp = () => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  return (
    <Container maxWidth='sm' sx={{ mt:10, mb:0, ml:'auto', mr: 'auto' }}>
    <Stack 
      spacing={1}
      color='skyblue'
    >
      <Box 
        mb='25px'
        display="flex"
        justifyContent='center'
        sx={{ backgroundColor: '#4858b0', borderRadius: '16px'}}
      >
        <Image
          src={imageSrc} 
          alt="logo" 
          width='350'
        />
      </Box>
      <TextField
        minRows={1}
        placeholder="メールアドレス" 
        value={userId}
        type='email'
        onChange={(e) => {
          setUserId(e.target.value);
        }}
      />
      {/* Todo:8文字以上のバリデーション */}
      <TextField
        placeholder="パスワード"
        value={userPassword}
        type='password'
        onChange={(e) => {
          setUserPassword(e.target.value);
        }}
      />
      <Button variant="contained" fullWidth>
        新規登録
      </Button>
      <MuiLink
        display='flex'
        justifyContent='center'
        >
        <NextLink href='/signin'>
          ログインはこちら
        </NextLink>
      </MuiLink>
    </Stack>
  </Container>
  )
}

export default SignUp