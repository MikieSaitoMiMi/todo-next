import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import imageSrc from "../img/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { app } from "../lib/firebase";
import NextLink from "next/link";
import MuiLink from "@mui/material/Link";
import { useAuthContext } from "../Components/context/AuthContext";

const Signin = () => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [notUserErrFlg, setNotUserErrFlg] = useState(false);
  const [userIdIllegalErrFlg, setUserIdIllegalErrFlg] = useState(false);
  const [userPasswordIllegalErrFlg, setUserPasswordIllegalErrFlg] =
    useState(false);
  const [internalErrorFlg, setInternalErrorFlg] = useState(false);

  const { user } = useAuthContext();
  const router = useRouter();
  const auth = getAuth(app);
  const isLoggedIn = !!user;

  const handleEmailLoginSubmit = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, userId, userPassword);
    } catch (err: any) {
      console.log(err);
      if (
        err.toString() ===
        "FirebaseError: Firebase: Error (auth/invalid-email)."
      ) {
        setUserIdIllegalErrFlg(true);
        return;
      } else {
        setUserIdIllegalErrFlg(false);
      }
      if (
        err.toString() ===
        "FirebaseError: Firebase: Error (auth/user-not-found)."
      ) {
        setNotUserErrFlg(true);
        return;
      } else {
        setNotUserErrFlg(false);
      }
      if (
        err.toString() ===
        "FirebaseError: Firebase: Error (auth/wrong-password)."
      ) {
        setUserPasswordIllegalErrFlg(true);
        return;
      } else {
        setUserPasswordIllegalErrFlg(false);
      }
      if (
        err.toString() ===
        "FirebaseError: Firebase: Error (auth/internal-error)."
      ) {
        setInternalErrorFlg(true);
        return;
      } else {
        setInternalErrorFlg(false);
      }
    }
    router.push("/todos");
  };

  const handleGoogleLoginSubmit = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
    router.push("/todos");
  };

  const handleClose = async () => {
    await router.push("/todos");
  };

  const handleChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.currentTarget.value);
  };
  const handleChangeUserPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.currentTarget.value);
  };
  return (
    <Container maxWidth="sm" sx={{ mt: 10, mb: 0, ml: "auto", mr: "auto" }}>
      <Stack spacing={1} color="skyblue">
        <Box
          mb="25px"
          display="flex"
          justifyContent="center"
          sx={{ backgroundColor: "#4858b0", borderRadius: "16px" }}
        >
          <Image src={imageSrc} alt="logo" width="350" />
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
          type="email"
          onChange={handleChangeUserId}
        />
        <TextField
          placeholder="パスワード"
          value={userPassword}
          type="password"
          onChange={handleChangeUserPassword}
        />
        {notUserErrFlg ? (
          <Alert>ユーザーが存在しません</Alert>
        ) : userIdIllegalErrFlg ? (
          <Alert>正しいメールアドレスを入力してください</Alert>
        ) : userPasswordIllegalErrFlg ? (
          <Alert>正しいパスワードを入力してください</Alert>
        ) : internalErrorFlg ? (
          <Alert>メールアドレスとパスワードを入力してください</Alert>
        ) : (
          <></>
        )}
        <Button variant="contained" fullWidth onClick={handleEmailLoginSubmit}>
          ログイン
        </Button>
        <Button variant="contained" fullWidth onClick={handleGoogleLoginSubmit}>
          Googleでログイン
        </Button>
        <NextLink href="/signup">
          <MuiLink underline="none">
            <Button variant="contained" fullWidth>
              アカウント作成
            </Button>
          </MuiLink>
        </NextLink>
      </Stack>
    </Container>
  );
};

export default Signin;
