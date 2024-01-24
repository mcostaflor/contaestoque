import React, { useState } from 'react';
import { downloadTxt, shareTxt } from '../../../helper/export/txt';
import { Button, Menu, MenuItem } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const ExportTxt = ({
    products,
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(anchorEl);

    const [, setLoading] = useState(false);

    const handleDownloadTxt = () => {
        setLoading(true);
        downloadTxt(products);
        setLoading(false);
        setAnchorEl(null)
    }

    const handleShareTxt = () => {
        setLoading(true);
        shareTxt(products);
        setLoading(false);
        setAnchorEl(null)
    }

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
                <DownloadIcon/>
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
                <MenuItem onClick={handleDownloadTxt}>
                    Download
                </MenuItem>
                <MenuItem onClick={handleShareTxt}>
                    Compartilhar
                </MenuItem>
            </Menu>
        </>
    )
}

export default ExportTxt;