import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, Checkbox, TableBody, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import { Loading } from "../../../components/Utils";
import { BACKENDADDRESS } from "../../../data/dummy";
import { AuditoriaType } from "../../../types";

const Auditoria = () => {
    const [auditorias, setAuditorias] = useState<AuditoriaType[]>([]);
    const [selectedReservasIds, setSelectedReservasIds] = useState<number[]>([]);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(0);

    useEffect(() => {
        const getAuditorias = async () => {
            if(auditorias.length !== 0) return;
            
            const req = await fetch(`${BACKENDADDRESS}cineticket/reservas/auditoria`);
			const json = await req.json();
            
            json.map((item: AuditoriaType) => {
                setAuditorias((auditorias) => [...auditorias, item]);
            });
            
            console.log(auditorias);
        }
        
        getAuditorias();
    }, []);

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
		let newSelectedMoviesIds: number[];

		if (event.target.checked) {
			newSelectedMoviesIds = auditorias.map((audit, index) => index);
		} else {
			newSelectedMoviesIds = [];
		}

		setSelectedReservasIds(newSelectedMoviesIds);
	};

	const handleSelectOne = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
		const selectedIndex = selectedReservasIds.indexOf(id);
		let newSelectedMoviesIds: number[] = [];

		if (selectedIndex === -1) {
			newSelectedMoviesIds = newSelectedMoviesIds.concat(selectedReservasIds, id);
		} else if (selectedIndex === 0) {
			newSelectedMoviesIds = newSelectedMoviesIds.concat(selectedReservasIds.slice(1));
		} else if (selectedIndex === selectedReservasIds.length - 1) {
			newSelectedMoviesIds = newSelectedMoviesIds.concat(selectedReservasIds.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelectedMoviesIds = newSelectedMoviesIds.concat(
				selectedReservasIds.slice(0, selectedIndex),
				selectedReservasIds.slice(selectedIndex + 1)
			);
		}

		setSelectedReservasIds(newSelectedMoviesIds);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLimit(+event.target.value);
		setPage(0);
	};
    
    if (auditorias.length === 0) return <Loading text='Connecting to CineTicket API...' />
    else console.log(auditorias);
    
    return (
        <div>
            <h1>Auditoria</h1>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
					<TableContainer sx={{ maxHeight: 440 }}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow className='bg-[#DDD]'>
									<TableCell padding="checkbox">
										<Checkbox
											checked={selectedReservasIds.length === auditorias.length}
											color="primary"
											indeterminate={
												selectedReservasIds.length > 0
												&& selectedReservasIds.length < auditorias.length
											}
											onChange={handleSelectAll}
										/>
									</TableCell>
									<TableCell>
										<p className="font-bold">ID</p>
									</TableCell>
                                    <TableCell>
                                        <p className="font-bold">ID da reserva</p>
                                    </TableCell>
									<TableCell>
										<p className="font-bold">Cliente</p>
									</TableCell>
									<TableCell>
										<p className="font-bold">Lugares</p>
									</TableCell>
                                    <TableCell>
										<p className="font-bold">Funcionário</p>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{auditorias.slice(page * limit, page * limit + limit).map((audit, index) => (
                                    <TableRow>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedReservasIds.indexOf(index) !== -1}
                                                onChange={(event) => handleSelectOne(event, index)}
                                                value="true"
                                            />
                                        </TableCell>
                                        <TableCell>{audit.ID_AUDITORIA}</TableCell>
                                        <TableCell>{audit.ID_RESERVA}</TableCell>
                                        <TableCell>{audit.CLIENTE}</TableCell>
                                        <TableCell>{audit.LUGARES}</TableCell>
                                        <TableCell>{audit.FUNCIONARIO}</TableCell>
                                    </TableRow>
                                ))}
							</TableBody>
						</Table>
					</TableContainer>

					<TablePagination
						component="div"
						count={auditorias.length}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
						page={page}
						rowsPerPage={limit}
						rowsPerPageOptions={[1, 5, 10]}
					/>
				</Paper>
        </div>
    );
}

export default Auditoria;
