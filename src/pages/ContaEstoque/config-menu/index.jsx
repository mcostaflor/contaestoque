import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const ConfigMenu = ({
    products,
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(anchorEl);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
      };

    return (
        <>
            <Button
                id="basic-button"
                aria-controls={menuOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? 'true' : undefined}
                variant="outlined"
                onClick={handleOpenMenu}
            >
                <SettingsIcon/>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleCloseMenu}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {}}>
                    Colocar usuário
                </MenuItem>
            </Menu>
        </>
    )
}

export default ConfigMenu;