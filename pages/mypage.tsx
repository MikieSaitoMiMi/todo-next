import { Container, Typography } from '@mui/material'
import React from 'react'

//フッターメニュー（ユーザー・TODO）、ユーザー情報
//機能→ユーザー情報編集
//ユーザー（ID、名前、最終ログイン日）
//ログインユーザーのみ

const mypage = () => {
  return (
    <Container maxWidth="md" sx={{ pt: 5 }} >
      <Typography
        component="h4" 
        variant="h4" 
      >
        My Page
      </Typography>
    </Container>
  )
}

export default mypage