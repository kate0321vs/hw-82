import { AppBar, styled, Toolbar, Typography} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link as NavLink } from 'react-router-dom';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const AppToolbar = () => {
  return (
    <AppBar position="sticky" sx={{mb: 2}}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            <Link to="/"></Link>
          </Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;