import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import imageSrc from '../img/logo.png';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { Box } from '@mui/system';
import { AppBar, Toolbar, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '100px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#57D1C9"
    }
  },
});


const Header = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar color="primary">
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              Todo
            </Typography>
            <Box
              display="flex"
              justifyContent="flex-end"
            >
              <Image 
                src={imageSrc} 
                alt="logo" 
                width='60px' 
                height='60px'
              />
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}

export default Header;