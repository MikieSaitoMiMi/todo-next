import {
  Box,
  Button,
  Container,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Header from "../../../Components/Header";
import { useRecoilState, useRecoilValue } from "recoil";
import { uuid, todoListState } from "../../../Components/store/Atom";
import NextLink from "next/link";
import MuiLink from "@mui/material/Link";
import { db } from "../../../lib/firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

//Todoフォーム（タイトル・期限・ステータス）、保存ボタン
//Todo編集

const Edit = () => {
  //編集target
  const [editUuid, setEditUuid] = useRecoilState(uuid);

  //Form用
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDetail, setTodoDetail] = useState("");

  //todoステータス
  const [todoStatus, setTodoStatus] = useState("未完了" || "途中" || "完了");

  const editTodo = async () => {
    const docRef = doc(db, "todos", editUuid);

    //フォームに入力があれば更新する
    if (todoTitle !== "") {
      await updateDoc(docRef, {
        title: todoTitle,
        updateAt: serverTimestamp(),
      });
    }
    if (todoDetail !== "") {
      await updateDoc(docRef, {
        detail: todoDetail,
        updateAt: serverTimestamp(),
      });
    }
    if (todoStatus !== "") {
      await updateDoc(docRef, {
        status: todoStatus,
        updateAt: serverTimestamp(),
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ pt: 5 }}>
      <Header />
      <Box marginTop="35px">
        <Typography component="h4" variant="h4">
          Todo Edit
        </Typography>
      </Box>
      <Stack spacing={1}>
        <TextField
          minRows={1}
          label="タイトル"
          type="text"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <TextareaAutosize
          minRows={10}
          placeholder="内容"
          value={todoDetail}
          onChange={(e) => setTodoDetail(e.target.value)}
        />
        <InputLabel id="status">Status</InputLabel>
        <Select
          labelId="status"
          label="Status"
          value={todoStatus}
          onChange={(e) => {
            setTodoStatus(e.target.value);
          }}
        >
          <MenuItem value={""}>　</MenuItem>
          <MenuItem value={"未完了"}>未完了</MenuItem>
          <MenuItem value={"途中"}>途中</MenuItem>
          <MenuItem value={"完了"}>完了</MenuItem>
        </Select>
        <NextLink href="/todos">
          <MuiLink underline="none">
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              onClick={(e) => {
                editTodo();
              }}
            >
              保存
            </Button>
          </MuiLink>
        </NextLink>
        <NextLink href="/todos">
          <MuiLink underline="none">
            <Button variant="contained" fullWidth>
              戻る
            </Button>
          </MuiLink>
        </NextLink>
      </Stack>
    </Container>
  );
};

export default Edit;
