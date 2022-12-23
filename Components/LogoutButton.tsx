import React from 'react'
import { app } from '../lib/firebase'
import { useRouter } from 'next/router'
import { getAuth, signOut } from 'firebase/auth';
import { Box } from '@mui/system';
import { Button } from '@mui/material';

const LogOutButton = () => {
  const router= useRouter();
  const auth = getAuth(app);
  const handleLogout = async () => {
    await signOut(auth);
    await router.push('/signin');
  }
  return (
    <Box>
      <Button
        variant="contained" 
        onClick={handleLogout}
      >
        ログアウト
      </Button>
    </Box>
  )
}

export default LogOutButton