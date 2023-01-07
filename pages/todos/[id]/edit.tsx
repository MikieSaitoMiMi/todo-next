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
import { editTargetState, todoListState } from "../../../Components/store/Atom";
import NextLink from "next/link";
import MuiLink from "@mui/material/Link";
import { db } from "../../../lib/firebase";
import {
  Firestore,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

//Todoフォーム（タイトル・期限・ステータス）、保存ボタン
//Todo編集

const Edit = () => {
  //Form用
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDetail, setTodoDetail] = useState("");

  //編集target
  const [editTarget, setEditTarget] = useRecoilState(editTargetState);

  //todoステータス
  const [todoStatus, setTodoStatus] = useState("未完了" || "途中" || "完了");
  //todos
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const editTodo = async () => {
    //いずれかのフォームに入力があれば更新する
    if (todoTitle !== "" || todoDetail !== "" || todoStatus !== "") {
      const docRef = doc(db, "todos", editTarget.uuid);
      const newTodo = {
        title: todoTitle,
        detail: todoDetail,
        status: todoStatus,
      };
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
        <TextField minRows={1} label="タイトル" type="text" />
        <TextareaAutosize minRows={10} placeholder="内容" />
        <InputLabel id="status">Status</InputLabel>
        <Select
          labelId="status"
          label="Status"
          value={todoStatus}
          onChange={(e) => {
            setTodoStatus(e.target.value);
          }}
        >
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
