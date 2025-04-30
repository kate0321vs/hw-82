import React, { useState } from 'react';
import { IconButton, Menu, MenuItem} from '@mui/material';
import { IUser } from '../../../types';
import {NavLink} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
        <IconButton onClick={handleClick}>
            <AccountCircleIcon style={{color: 'white', fontSize: '2rem'}} />
        </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          <MenuItem disabled={true}>Hello, {user.username}!</MenuItem>
        <MenuItem component={NavLink} to='track_history'>Track history</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;