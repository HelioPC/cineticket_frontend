import { useState, useEffect } from 'react';
import {
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField, FormControlLabel, FormLabel, Radio, RadioGroup
} from '@mui/material';
import { BsTrashFill, BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs';

import { CinemaProps, EditMovieProps, UserType } from '../../types';
import { BACKENDADDRESS } from '../../data/dummy';
import { useUser } from '../../contexts/UserContext';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { AlertError, AlertSuccess } from '../Alerts';
import { Loading } from '../Utils';

const UserList = () => {
    const [selectedUsersIds, setSelectedUsersIds] = useState<number[]>([]);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(0);
	const [users, setUsers] = useState<UserType[]>([]);
	const { user } = useUser();

	useEffect(() => {
		const getUsers = async () => {

			if(users.length !== 0) return;

			const req = await fetch(`${BACKENDADDRESS}cineticket/funcionarios`);
			const json = await req.json();

			console.log(json)

			json.data.map((item: UserType) => {
				setUsers((users => [...users, item]));
			});
		}

		getUsers();
	} , []);

	const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
		let newSelectedMoviesIds: number[];

		if (event.target.checked) {
			newSelectedMoviesIds = users.map((res, index) => index);
		} else {
			newSelectedMoviesIds = [];
		}

		setSelectedUsersIds(newSelectedMoviesIds);
	};

	const handleSelectOne = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
		const selectedIndex = selectedUsersIds.indexOf(id);
		let newSelectedMoviesIds: number[] = [];

		if (selectedIndex === -1) {
			newSelectedMoviesIds = newSelectedMoviesIds.concat(selectedUsersIds, id);
		} else if (selectedIndex === 0) {
			newSelectedMoviesIds = newSelectedMoviesIds.concat(selectedUsersIds.slice(1));
		} else if (selectedIndex === selectedUsersIds.length - 1) {
			newSelectedMoviesIds = newSelectedMoviesIds.concat(selectedUsersIds.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelectedMoviesIds = newSelectedMoviesIds.concat(
			selectedUsersIds.slice(0, selectedIndex),
			selectedUsersIds.slice(selectedIndex + 1)
			);
		}

		setSelectedUsersIds(newSelectedMoviesIds);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLimit(+event.target.value);
		setPage(0);
	};

	// Remoção de funcionário
	const handleDeleteUser = async ({...prop}: UserType) => {
		if(user.nivel !== 'admin') {
			AlertError({
				title: 'Acesso Negado',
				description: 'Você não tem permissão para realizar este tipo de ação, por favor contacte o seu administrador.'
			});

			return;
		}
		
		const req = await fetch(`${BACKENDADDRESS}cineticket/funcionario/${prop.ID_FUNCIONARIO}/delete`);
		const json = await req.json();

		console.log(json);

		if(json.status === 'sucesso') {
			AlertSuccess({
				title: 'Sucesso',
				description: `Usuário ${prop.NOME} removido com sucesso`,
				confirm: () => window.location.reload()
			});
		} else {
			AlertError({
				title: 'Erro',
				description: 'Falha na conexão com a Cinteticket API',
				confirm: () => window.location.reload()
			})
		}

	}

	const handlePromoteUser = async ({...prop}: UserType) => {
		if(user.nivel !== 'admin') {
			AlertError({
				title: 'Acesso Negado',
				description: 'Você não tem permissão para realizar este tipo de ação, por favor contacte o seu administrador.'
			});

			return;
		}

		if(prop.NIVEL === 'admin') {
			AlertError({
				title: 'Erro',
				description: `${prop.NOME} já é administrador.`
			});

			return;
		}
		
		const req = await fetch(`${BACKENDADDRESS}cineticket/funcionario/${prop.ID_FUNCIONARIO}/promote`);
		const json = await req.json();

		console.log(json);

		if(json.status === 'sucesso') {
			AlertSuccess({
				title: 'Sucesso',
				description: `Usuário ${prop.NOME} promovido com sucesso`,
				confirm: () => window.location.reload()
			});
		} else {
			AlertError({
				title: 'Erro',
				description: 'Falha na conexão com a Cinteticket API',
				confirm: () => window.location.reload()
			})
		}

	}

	const handleDespromoteUser = async ({...prop}: UserType) => {
		if(user.nivel !== 'admin') {
			AlertError({
				title: 'Acesso Negado',
				description: 'Você não tem permissão para realizar este tipo de ação, por favor contacte o seu administrador.'
			});

			return;
		}

		if(prop.NIVEL === 'user') {
			AlertError({
				title: 'Erro',
				description: `${prop.NOME} já está na menor categoria possível.`
			});

			return;
		}
		
		const req = await fetch(`${BACKENDADDRESS}cineticket/funcionario/${prop.ID_FUNCIONARIO}/despromote`);
		const json = await req.json();

		console.log(json);

		if(json.status === 'sucesso') {
			AlertSuccess({
				title: 'Sucesso',
				description: `Usuário ${prop.NOME} despromovido com sucesso`,
				confirm: () => window.location.reload()
			});
		} else {
			AlertError({
				title: 'Erro',
				description: 'Falha na conexão com a Cinteticket API',
				confirm: () => window.location.reload()
			})
		}

	}

	if(users.length === 0) return <Loading text='Connecting to CineTicket API...' />

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow className='bg-[#DDD]'>
							<TableCell padding="checkbox">
								<Checkbox
									checked={selectedUsersIds.length === users.length}
									color="primary"
									indeterminate={
										selectedUsersIds.length > 0
										&& selectedUsersIds.length < users.length
									}
									onChange={handleSelectAll}
								/>
							</TableCell>
							<TableCell>
								<p className="font-bold">ID</p>
							</TableCell>
							<TableCell>
								<p className="font-bold">Nome</p>
							</TableCell>
                            <TableCell>
								<p className="font-bold">E-mail</p>
							</TableCell>
							<TableCell>
								<p className="font-bold">Categoria</p>
							</TableCell>
                            <TableCell>
								<p className="font-bold">Cinema</p>
							</TableCell>
							{
								user.nivel === 'admin' ?
								(
									<TableCell>
										<p className="font-bold">Actions</p>
									</TableCell>
								):null
							}
						</TableRow>
					</TableHead>
					<TableBody>
                        {users.slice(page * limit, page * limit + limit)
                        .map((u, index) => (
                            <TableRow
                                hover
								key={index}
								selected={selectedUsersIds.indexOf(index) !== -1}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedUsersIds.indexOf(index) !== -1}
                                        onChange={(event) => handleSelectOne(event, index)}
                                        value="true"
                                    />
                                </TableCell>
                                <TableCell>
                                    {u.ID_FUNCIONARIO}
                                </TableCell>
                                <TableCell>
                                    {u.NOME}
                                </TableCell>
                                <TableCell>
                                    {u.EMAIL}
                                </TableCell>
                                <TableCell>
                                    {u.NIVEL}
                                </TableCell>
                                <TableCell>
                                    {u.CINEMA}
                                </TableCell>
                                {
                                    user.nivel === 'admin' && user.id != u.ID_FUNCIONARIO ?
                                    (
                                        <TableCell>
                                            <div className='flex gap-2'>
                                                <Tooltip title='Delete' arrow placement='top'>
                                                    <button className='cursor-pointer' onClick={() => handleDeleteUser(u)}>
                                                        <BsTrashFill className='text-[#A00]' size={18} />
                                                    </button>
                                                </Tooltip>
                                                <Tooltip title='Promover' arrow placement='top'>
													<button className="cursor-pointer" onClick={() => handlePromoteUser(u)}>
														<BsFillArrowUpCircleFill className='text-green-700' size={18} />
													</button>
                                                </Tooltip>
												<Tooltip title='Despromover' arrow placement='top'>
													<button className="cursor-pointer" onClick={() => handleDespromoteUser(u)}>
														<BsFillArrowDownCircleFill className='text-blue-700' size={18} />
													</button>
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    ): (<TableCell></TableCell>)
                                }
                            </TableRow>
                        ))}
					</TableBody>
				</Table>
			</TableContainer>
			
			<TablePagination
				component="div"
				count={users.length}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				page={page}
				rowsPerPage={limit}
				rowsPerPageOptions={[1, 5, 10]}
			/>
		</Paper>
	);
}

export default UserList;
