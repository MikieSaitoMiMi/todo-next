import type { NextPage } from 'next'
import { Button } from '@mui/material';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <Link href="/todos"><Button variant="contained">todos</Button></Link>
      <br />
      <Link href="/todos/create"><Button variant="contained">create</Button></Link>
      <br />
      <Link href="/todos/[id]"><Button variant="contained">todoDetail（仮）</Button></Link>
    </>
  )
}

export default Home