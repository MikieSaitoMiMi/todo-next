import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';
import imageSrc from '.././img/logo.png';
import { createMuiTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { Box } from '@mui/system';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#57D1C9"
    }
  },
});

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
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
              <Image src={imageSrc} alt="logo" width="60" />
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>

    </div>
  );
}

export default Header;