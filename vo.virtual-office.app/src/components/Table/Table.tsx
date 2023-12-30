
import { useState } from "react";
import { Stack, TablePagination } from '@mui/material';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import { useTheme } from "@table-library/react-table-library/theme";
import { CompactTable } from "@table-library/react-table-library/compact";
import { Input } from "../../components/UI/UiComponents";
import { usePagination } from "@table-library/react-table-library/pagination";
import style from "./Table.module.css"



export default function Table({ data, sort, COLUMNS }: { data: any, sort: any, COLUMNS: any }) {
    console.log(data);
    const materialTheme = getTheme(DEFAULT_OPTIONS);
    const customTheme = useTheme({
        Table: `
        --data-table-library_grid-template-columns:  30% repeat(2, minmax(0, 1fr)) 25% 100px;
      `,
    });
    const theme = useTheme([materialTheme, customTheme]);
    const pagination = usePagination(data, {
        state: {
            page: 0,
            size: 10,
        },
        onChange: onPaginationChange,
    });
    function onPaginationChange(action: any, state: any) {
        console.log(action, state);
    }

    return (
        <div>
            <CompactTable columns={COLUMNS} data={data} theme={theme} sort={sort} pagination={pagination} />
            <Stack spacing={10}>
                <TablePagination
                    count={data.nodes.length}
                    page={pagination.state.page}
                    rowsPerPage={pagination.state.size}
                    rowsPerPageOptions={[1, 2, 5, 10, 25, 100]}
                    onRowsPerPageChange={(event) =>
                        pagination.fns.onSetSize(parseInt(event.target.value, 10))
                    }
                    onPageChange={(_event, page) => pagination.fns.onSetPage(page)}
                />
            </Stack>
        </div>
    )
}
