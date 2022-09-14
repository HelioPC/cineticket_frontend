// Function Props

type ChangePageProps = {
    event: unknown;
    newPage: number;
    setPage: (page: number) => void;
}

type ChangeRowsPerPageProps = {
    event: React.ChangeEvent<HTMLInputElement>;
    setLimit: (limit: number) => void;
    setPage: (page: number) => void;
}

// Functions

export const handleChangePage = ({ event, newPage, setPage }: ChangePageProps) => {
    setPage(newPage);
};

export const handleChangeRowsPerPage = ({ event, setLimit, setPage }: ChangeRowsPerPageProps) => {
    setLimit(+event.target.value);
    setPage(0);
};