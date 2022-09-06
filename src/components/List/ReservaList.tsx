import { useState, useEffect } from 'react';
import {
    Avatar,
    Box,
    Card,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField
} from '@mui/material';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { BsTrashFill, BsPersonCircle } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';

import { ReservaType } from '../../types';
import { Loading } from '../Utils';

import { SelectChangeEvent } from '@mui/material/Select';
import Modal from '../Modal';
import axios from "axios";
import { AlertSuccess } from '../Alerts/';
import { BACKENDADDRESS, GENRES } from '../../data/data';
import { useUser } from '../../contexts/UserContext';
/*
/cineticket/reservas/eliminar
/cineticket/reservas/confirmar
/cineticket/reservas/cancelar
*/

type ReservaState = {
	estado: string;
}

type HandleReservaAction = {
	id: string;
	id_funcionario?: string;
	action: string;
}

const Estado = ({ estado }: ReservaState) => {
	return (
		<div className={`
				px-1 py-2 rounded-md text-center text-white shadow-md
				${(estado === '1') && 'bg-green-600'}
				${(estado === '0') && 'bg-blue-600'}
				${(estado === '-1') && 'bg-red-600'}
			`}
		>
			{
				(estado === '-1') && <p>Cancelada</p>
			}
			{
				(estado === '1') && <p>Confirmada</p>
			}
			{
				(estado === '0') && <p>Pendente</p>
			}
		</div>
	);
}

const ReservaList = () => {
    const [selectedReservasIds, setSelectedReservasIds] = useState<number[]>([]);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(0);
	const [reservas, setReservas] = useState<ReservaType[]>([]);
	const { user } = useUser();

	useEffect(() => {
		const getMovies = async () => {

			if(reservas.length !== 0) return;

			//const req = await fetch('http://192.168.43.35/cineticket/filmes');
			const req = await fetch(`${BACKENDADDRESS}cineticket/reservas`);
			const json = await req.json();

			json.map((item: ReservaType) => {
                reservas.push(
                    {
                        ID_RESERVA: item.ID_RESERVA,
                        CLIENTE: item.CLIENTE,
                        FILME: item.FILME,
                        DATA: item.DATA,
                        LUGARES: item.LUGARES,
                        CINEMA: item.CINEMA,
                        SALA: item.SALA,
                        ESTADO: item.ESTADO
                    }
                )
			});

			console.log(reservas);
		}

		getMovies();
	} , []);

	const handleReservaAction = async ({ id, action, id_funcionario }: HandleReservaAction) => {
		const data = new FormData();
		
		if(id_funcionario !== undefined) {
			data.append('id_reserva', id);
			data.append('id_funcionario', id_funcionario);

			axios({
				method: 'POST',
				data: data,
				headers: { "Content-Type": "multipart/form-data" },
				url: `${BACKENDADDRESS}cineticket/reservas/${action}`
			}).then(function (response) {
				console.log(response);
				AlertSuccess({
					title: "Reserva Eliminada",
					description: `A reserva ${id} foi eliminada com sucesso`,
					confirm: () => {window.location.reload();}
				});
			}).catch(function (response) {
				// Handle error
				console.log(response);
			});
		} else {
			data.append('id_reserva', id);

			axios({
				method: 'POST',
				data: data,
				headers: { "Content-Type": "multipart/form-data" },
				url: `${BACKENDADDRESS}cineticket/reservas/${action}`
			}).then(function (response) {
				AlertSuccess({
					title: `Reserva ${action === 'confirmar' ? 'confirmada' : 'cancelada'}`,
					description: `A reserva ${id} foi ${action === 'confirmar' ? 'confirmada' : 'cancelada'} com sucesso`,
					confirm: () => {window.location.reload();}
				});
			}).catch(function (response) {
				// Handle error
				console.log(response);
			});
		}
	}


	const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
		let newSelectedMoviesIds: number[];

		if (event.target.checked) {
			newSelectedMoviesIds = reservas.map((res, index) => index);
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

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow className='bg-[#DDD]'>
							<TableCell padding="checkbox">
								<Checkbox
									checked={selectedReservasIds.length === reservas.length}
									color="primary"
									indeterminate={
										selectedReservasIds.length > 0
										&& selectedReservasIds.length < reservas.length
									}
									onChange={handleSelectAll}
								/>
							</TableCell>
							<TableCell>
								Cliente
							</TableCell>
							<TableCell>
								Filme
							</TableCell>
							<TableCell>
								Data
							</TableCell>
                            <TableCell>
								Sala
							</TableCell>
                            <TableCell>
								Cinema
							</TableCell>
                            <TableCell>
								Estado
							</TableCell>
							<TableCell>
								Actions
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{reservas.slice(page * limit, page * limit + limit)
						.map((res, index) => (
							<TableRow
								hover
								key={index}
								selected={selectedReservasIds.indexOf(index) !== -1}
							>
								<TableCell>{res.ID_RESERVA}</TableCell>
								<TableCell>{res.CLIENTE}</TableCell>
								<TableCell>
									<div className="w-10">
										<p>{res.FILME}</p>
									</div>
								</TableCell>
								<TableCell className='w-40'>{res.DATA}</TableCell>
								<TableCell>{res.SALA}</TableCell>
								<TableCell>
									<div className='w-10'>
										<p>{res.CINEMA}</p>
									</div>
								</TableCell>
								<TableCell className="w-10">
									<Estado estado={res.ESTADO} />
								</TableCell>
								<TableCell>
									<div className='flex gap-3'>
										{
											res.ESTADO === '0' ?
											(
												<>
													<Tooltip title='Confirmar' arrow placement='top'>
														<button
															className='cursor-pointer'
															onClick={() => handleReservaAction({ id: res.ID_RESERVA, action: 'confirmar' })}
														>
															<AiFillCheckCircle className='text-green-600 hover:text-green-800' size={24} />
														</button>
													</Tooltip>
													<Tooltip title='Cancelar' arrow placement='top'>
														<button
															className='cursor-pointer'
															onClick={() => handleReservaAction({ id: res.ID_RESERVA, action: 'cancelar' })}
														>
															<AiFillCloseCircle className='text-orange-400 hover:text-orange-600' size={24} />
														</button>
													</Tooltip>
												</>
											) : null
										}
										<Tooltip title='Eliminar' arrow placement='top'>
											<button
												className='cursor-pointer'
												onClick={() => handleReservaAction({ id: res.ID_RESERVA, action: 'eliminar', id_funcionario: user.id.toString() })}
											>
												<BsTrashFill className='text-red-600 hover:text-red-800' size={24} />
											</button>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			
			<TablePagination
				component="div"
				count={reservas.length}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				page={page}
				rowsPerPage={limit}
				rowsPerPageOptions={[1, 5, 10]}
			/>
		</Paper>
	);
}

export default ReservaList

/*
<TableCell>
									<div className='flex'>
										<Tooltip title='Delete' arrow placement='top'>
											<button className='cursor-pointer'>
												<BsTrashFill className='text-[#A00]' size={18} />
											</button>
										</Tooltip>
										<Tooltip title='Edit' arrow placement='top'>
											<button
												className='cursor-pointer ml-5'
												onClick={() => {}}
											>
												<FaEdit className='text-[#00A]' size={18} />
											</button>
										</Tooltip>
									</div>
								</TableCell>
*/
