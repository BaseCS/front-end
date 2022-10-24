import React from 'react'
import { DataGrid } from '@mui/x-data-grid';


const SubfieldSelector = ({name, rows}) => {

    const columns = [
        {
          field: 'area',
          headerName: name,
          sortable: false,
          width: 300,
        },
    ];

    let index = 1
    rows.forEach((row, index) => row.id = index + 1);
    
    return (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableColumnMenu
          />
      );
}

export default SubfieldSelector