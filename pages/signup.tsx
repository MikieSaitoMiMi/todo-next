import { Alert, Box, Button, Container, Snackbar, Stack, TextField } from '@mui/material';
import React, { useState } from 'react'
import imageSrc from '../img/logo.png'
import Image from 'next/image';
import NextLink from 'next/link';
import MuiLink from "@mui/material/Link"
import { app } from '../lib/firebase';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useAuthContext } from "../Components/context/AuthContext"

//IDパスワード入力欄、ユーザー名入力欄、新規登録ボタン、ログインはこちら
//機能→ユーザー登録
//データ→メールアドレス、パスワード（半角英数八文字以上）、Googleアカウント
//非ログインユーザーのみ

const SignUp = () => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const { user } = useAuthContext();
  const router = useRouter();
  const auth = getAuth(app);
  const isLoggedIn = !!user;

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, userId, userPassword);
    router.push('/');
  }

  const handleClose = async () => {
    await router.push('/');
  }

  const handleChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  }
  const handleChangeUserPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
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
        anchorOrigin={{ vertical: 'bottom', horizontal: "center" }}
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
      {/* Todo:8文字以上のバリデーション */}
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
        新規登録
      </Button>
      <NextLink href='/signin'>
        <MuiLink
        display='flex'
        justifyContent='center'
        >
          登録済みの方はこちら
        </MuiLink>
      </NextLink>
    </Stack>
  </Container>
  )
}

export default SignUp