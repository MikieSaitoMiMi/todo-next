import {
  Box,
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Header from "../Components/Header";
import { ItodoListState, uuid, todoListState } from "../Components/store/Atom";
import NextLink from "next/link";
import MuiLink from "@mui/material/Link";
import { useRouter } from "next/router";
import {
  CollectionReference,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const TodosPage = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [todos, setTodos] = useState(todoList);
  const todoData = collection(
    db,
    "todos"
  ) as CollectionReference<ItodoListState>;
  const router = useRouter();

  //フィルター用
  const [filter, setFilter] = useState(
    "全て表示" || "未完了" || "途中" || "完了"
  );

  const [filterTodos, setFilterTodos] = useState(todoList);

  //編集用
  const [editUuid, setEditUuid] = useRecoilState(uuid);

  //フィルター
  const filterHandler = async (filter: string) => {
    const targetTodos = todos.filter((todo) => todo.status === filter);
    if (filter === "全て表示") {
      setFilterTodos(todos);
    } else {
      setFilterTodos(targetTodos);
    }
  };

  //データ取得
  useEffect(() => {
    onSnapshot(todoData, (todo) => {
      setTodos(todo.docs.map((doc) => ({ ...doc.data() })));
    });
    onSnapshot(todoData, (todo) => {
      setTodoList(todo.docs.map((doc) => ({ ...doc.data() })));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editHandler = async (id: number, uuid: string) => {
    await setEditUuid(uuid);
    setFilter("全て表示");
    router.push({
      pathname: `/todos/${encodeURIComponent(id)}/edit`,
    });
  };

  return (
    <>
      <Header />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>タイトル</TableCell>
              <TableCell>内容</TableCell>
              <TableCell>ステータス</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filter === "全て表示"
              ? todos.map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell>{todo.id}</TableCell>
                    <TableCell>{todo.title}</TableCell>
                    <TableCell>{todo.detail}</TableCell>
                    <TableCell>{todo.status}</TableCell>
                    <TableCell>
                      {todo.id !== 0 ? (
                        <MuiLink>
                          <NextLink
                            href={`/todos/${encodeURIComponent(todo.id)}`}
                          >
                            <Button>詳細</Button>
                          </NextLink>
                        </MuiLink>
                      ) : (
                        <Button>詳細</Button>
                      )}
                    </TableCell>
                    <TableCell>
                      {todo.id !== 0 ? (
                        <Button
                          onClick={(e) => editHandler(todo.id, todo.uuid)}
                        >
                          編集
                        </Button>
                      ) : (
                        <Button>編集</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              : filterTodos.map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell>{todo.id}</TableCell>
                    <TableCell>{todo.title}</TableCell>
                    <TableCell>{todo.detail}</TableCell>
                    <TableCell>{todo.status}</TableCell>
                    <TableCell>
                      {todo.id !== 0 ? (
                        <MuiLink>
                          <NextLink
                            href={`/todos/${encodeURIComponent(todo.id)}`}
                          >
                            <Button>詳細</Button>
                          </NextLink>
                        </MuiLink>
                      ) : (
                        <Button>詳細</Button>
                      )}
                    </TableCell>
                    <TableCell>
                      {todo.id !== 0 ? (
                        <Button
                          onClick={(e) => editHandler(todo.id, todo.uuid)}
                        >
                          編集
                        </Button>
                      ) : (
                        <Button>編集</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <Box margin="10px">
          <NextLink href="/todos/create">
            <MuiLink underline="none" marginTop="10px" marginRight="10px">
              <Button variant="contained">
                <Box>新規Todo作成</Box>
              </Button>
            </MuiLink>
          </NextLink>
          <Select
            multiline
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              filterHandler(e.target.value);
            }}
          >
            <MenuItem value={"全て表示"}>全て表示</MenuItem>
            <MenuItem value={"未完了"}>未完了</MenuItem>
            <MenuItem value={"途中"}>途中</MenuItem>
            <MenuItem value={"完了"}>完了</MenuItem>
          </Select>
        </Box>
      </TableContainer>
    </>
  );
};

export default TodosPage;
