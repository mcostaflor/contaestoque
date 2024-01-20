import React, { useState } from 'react';
import { exportCsv } from '../../../helper/export/csv';
import { Button, CircularProgress } from '@mui/material';

const ExportCsv = ({
    products,
}) => {

    const [loading, setLoading] = useState(false);

    const handleExportCSV = () => {
        setLoading(true);
        exportCsv(products);
        setLoading(false);
    }

    return (
        <>
            <Button variant="contained" onClick={handleExportCSV}>
                Exportar (CSV)
                {loading &&
                    <CircularProgress/>
                }
            </Button>
        </>
    )
}

export default ExportCsv;