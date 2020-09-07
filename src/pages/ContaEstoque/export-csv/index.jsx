import React, { useState } from 'react';
import { Button, Spinner } from 'reactstrap';
import { exportCsv } from '../../../helper/export/csv';

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
            <Button onClick={handleExportCSV}>
                Exportar (CSV)
                {loading &&
                    <Spinner size='sm' />
                }
            </Button>
        </>
    )
}

export default ExportCsv;