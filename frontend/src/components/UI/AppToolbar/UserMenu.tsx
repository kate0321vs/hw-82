import React, { useState } from 'react';
import { IconButton, Menu, MenuItem} from '@mui/material';
import { IUser } from '../../../types';
import {NavLink} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useAppDispatch} from "../../../app/hooks.ts";
import {logout} from "../../../features/Users/usersThunk.ts";
import {fetchArtists} from "../../../features/Artists/ArtistsThunk.ts";
import Avatar from '@mui/material/Avatar';
import {baseURL} from "../../../globalConstants.ts";

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    const handleLogout = async () => {
        await dispatch(logout());
        await dispatch(fetchArtists());
    }

  return (
    <>
        <IconButton onClick={handleClick}>
            {user.avatar ?
            <Avatar src={user.googleID ? user.avatar : `${baseURL}/${user.avatar}`} alt={`${user.displayName} picture`} /> :
            <AccountCircleIcon fontSize='large' style={{color: 'white', fontSize: '2rem'}} />}
        </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          <MenuItem disabled={true}>Hello, {user.displayName}!</MenuItem>
        <MenuItem component={NavLink} to='track_history'>Track history</MenuItem>
          <MenuItem component={NavLink} to='artists/new'>Add Artist</MenuItem>
          <MenuItem component={NavLink} to='albums/new'>Add Album</MenuItem>
          <MenuItem component={NavLink} to='tracks/new'>Add Track</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;