import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import imageSrc from '../img/logo.png'
import Image from 'next/image';

//サービス名/ロゴ（フリーサイトから引っ張ってくる）、
//ログインフォーム（IDPW入力欄・ログインボタン・Googleログインボタン）、新規ユーザー登録ボタン、ローダー
//IDPWログイン、Googleログイン
//データ→ユーザーID PW
//非ログインユーザーのみ


const Signin = () => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
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
      <TextField
        placeholder="パスワード"
        value={userPassword}
        type='password'
        onChange={(e) => {
          setUserPassword(e.target.value);
        }}
      />
      <Button variant="contained" fullWidth>
        ログイン
      </Button>
      <Button variant="contained" fullWidth>
        アカウント作成
      </Button>
    </Stack>
  </Container>
  )
}

export default Signin