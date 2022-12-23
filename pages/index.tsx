import type { NextPage } from 'next'
import { Button } from '@mui/material';
import Link from 'next/link';
import LogOutButton from '../Components/LogoutButton';

const Home: NextPage = () => {
  return (
    <>
      <Link href="/todos"><Button variant="contained">todos</Button></Link>
      <br />
      <Link href="/todos/create"><Button variant="contained">create</Button></Link>
      <br />
      <Link href="/todos/[id]"><Button variant="contained">todoDetail（仮）</Button></Link>
      <br />
      <Link href="/todos/signin"><Button variant="contained">todoSignin</Button></Link>
      <LogOutButton />
    </>
  )
}

export default Home