import { Alert, Box, Button, Container, Snackbar, Stack, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'
import imageSrc from '../img/logo.png'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../lib/firebase';
import NextLink from 'next/link';
import MuiLink from "@mui/material/Link"
import { useAuthContext } from "../Components/context/AuthContext"

//サービス名/ロゴ（フリーサイトから引っ張ってくる）、
//ログインフォーム（IDPW入力欄・ログインボタン・Googleログインボタン）、新規ユーザー登録ボタン、ローダー
//IDPWログイン、Googleログイン
//データ→ユーザーID PW
//非ログインユーザーのみ


const Signin = () => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const { user } = useAuthContext();
  const router = useRouter();
  const auth = getAuth(app);
  const isLoggedIn = !!user;

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, userId, userPassword);
    router.push('/');
  }

  const handleClose = async () => {
    await router.push('/');
  }

  const handleChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.currentTarget.value);
  }
  const handleChangeUserPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.currentTarget.value);
  }
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
      <Snackbar
        open={isLoggedIn}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={3000}
        key={"bottom" + "center"}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning">
          すでにログインしています
        </Alert>
      </Snackbar>
      <TextField
        minRows={1}
        placeholder="メールアドレス" 
        value={userId}
        type='email'
        onChange={handleChangeUserId}
      />
      <TextField
        placeholder="パスワード"
        value={userPassword}
        type='password'
        onChange={handleChangeUserPassword}
      />
      <Button 
        variant="contained" 
        fullWidth
        onClick={handleSubmit}
      >
        ログイン
      </Button>
      <NextLink href='/signup'>
        <MuiLink
        underline='none'
        >
          <Button variant="contained" fullWidth>
          アカウント作成
          </Button>
        </MuiLink>
      </NextLink>
    </Stack>
  </Container>
  )
}

export default Signin