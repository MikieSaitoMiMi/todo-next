import { Alert, Box, Button, Container, Snackbar, Stack, TextField } from '@mui/material';
import React, {  useState } from 'react'
import imageSrc from '../img/logo.png'
import Image from 'next/image';
import NextLink from 'next/link';
import MuiLink from "@mui/material/Link"
import { app, db } from '../lib/firebase';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useAuthContext } from "../Components/context/AuthContext"
import { addDoc, collection, getDocs} from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

const SignUp = () => {
  //フォーム用
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');

  //パスワードエラーフラグ
  const [passwordLengthErrFlg, setPasswordLengthErrFlg] = useState(false);
  const [noPasswordErrFlg, setNoPasswordErrFlg] = useState(false);
  //ユーザ名エラーフラグ
  const [noUserNameErrFlg, setNoUserNameErrFlg] = useState(false);
  //IDエラーフラグ
  const [userIdDupeErrFlg, setUserIdDupeErrFlg] = useState(false);
  const [noUserIdErrFlg, setNoUserIdErrFlg] = useState(false);
  const [userIdIllegalErrFlg, setUserIdIllegalErrFlg] = useState(false);
  //全ユーザーデータ取得用（メールアドレス重複チェック）
  const [users, setUsers] = useState<{ [x: string]: any; }[]>([]);

  const usersData = collection(db, 'users');

  const { user } = useAuthContext();
  const router = useRouter();
  const auth = getAuth(app);
  const isLoggedIn = !!user;

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {

    const usersCollectionRef = collection(db, 'users');
    //バリデーション用
    const idValidation = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

    //パスワードが空の場合はエラー
    if(userPassword === ''){
      setNoPasswordErrFlg(true);
    }else{
      setNoPasswordErrFlg(false);
      //パスワードが八文字以下の場合はエラー
      if(userPassword.length < 8){
        setPasswordLengthErrFlg(true);
      }else {
        setPasswordLengthErrFlg(false);
      }
    }
    //userNameが空の場合はエラー
    if(userName === ''){
      setNoUserNameErrFlg(true);
    }else{
      setNoUserNameErrFlg(false);
    }
    //IDが空の場合はエラー
    if(userId === ''){
      setNoUserIdErrFlg(true);
    }else{
      //IDがメールアドレスの形式ではない場合はエラー
      if(!idValidation.test(userId)){
        setUserIdIllegalErrFlg(true);
      }else{
        setUserIdIllegalErrFlg(false);
      }
      setNoUserIdErrFlg(false);
    }
    FirebaseError
    if(
      !noUserNameErrFlg ||
      !passwordLengthErrFlg ||
      !noPasswordErrFlg ||
      !userIdDupeErrFlg ||
      !noUserIdErrFlg ||
      !userIdIllegalErrFlg
    ){
      try{

      await createUserWithEmailAndPassword(auth, userId, userPassword)
      } catch (err:any) {
          if(err.toString() === 
              'FirebaseError: Firebase: Error (auth/email-already-in-use).'){
            setUserIdDupeErrFlg(true);
            return;
          }
          else{
            console.log(err);
            setUserIdDupeErrFlg(false);
          }
        }
    
      const documentRef = await addDoc(usersCollectionRef,
        {
          name: userName,
          mail: userId,
          password: userPassword,
        });
      router.push('/');
    }
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

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
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
      {userIdDupeErrFlg ?
        <TextField
          minRows={1}
          placeholder="メールアドレス" 
          value={userId}
          type='email'
          error
          helperText='既に登録されています'
          onChange={handleChangeUserId}
        />
      :
      userIdIllegalErrFlg ?
        <TextField
          minRows={1}
          placeholder="メールアドレス" 
          value={userId}
          type='email'
          error
          helperText='正しいメールアドレスを入力してください'
          onChange={handleChangeUserId}
        />
      :
      noUserIdErrFlg ?
        <TextField
          minRows={1}
          placeholder="メールアドレス" 
          value={userId}
          type='email'
          error
          helperText='必須項目です'
          onChange={handleChangeUserId}
        />
      :
        <TextField
          minRows={1}
          placeholder="メールアドレス" 
          value={userId}
          type='email'
          onChange={handleChangeUserId}
        />
      }
      {passwordLengthErrFlg ?
        <TextField
          placeholder="パスワード"
          value={userPassword}
          type='password'
          error
          helperText='8文字以上で入力してください'
          onChange={handleChangeUserPassword}
        />
      :
      noPasswordErrFlg ?
        <TextField
          placeholder="パスワード"
          value={userPassword}
          type='password'
          error
          helperText='必須項目です'
          onChange={handleChangeUserPassword}
        />
      :
        <TextField
          placeholder="パスワード"
          value={userPassword}
          type='password'
          onChange={handleChangeUserPassword}
        />
      }
      {noUserNameErrFlg ?
        <TextField
          placeholder="ユーザー名"
          value={userName}
          type='text'
          error
          helperText='必須項目です'
          onChange={handleChangeUserName}
        />
      :
        <TextField
          placeholder="ユーザー名"
          value={userName}
          type='text'
          onChange={handleChangeUserName}
        />
      }
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