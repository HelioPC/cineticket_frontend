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
import { BsTrashFill, BsFillArrowUpCircleFill } from 'react-icons/bs';

import { CinemaProps, EditMovieProps, UserType } from '../../types';
import { BACKENDADDRESS } from '../../data/dummy';
import { useUser } from '../../contexts/UserContext';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { AlertError } from '../Alerts';

const EditUser = ({ id, title, description, release_date, poster_path, genreId }: EditMovieProps) => {
	const [open, setOpen] = useState(false);
	const [cinemas, setCinemas] = useState<CinemaProps[]>([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedCinema, setSelectedCinema] = useState('');
    const [level, setLevel] = useState('');

	const handleSubmit = () => {}

	return (
		<div className='flex flex-col gap-5'>
			<div className='w-full flex items-center'>
				<img
					src={`https://image.tmdb.org/t/p/w300${poster_path}`}
					alt={title} className='w-10 h-10 rounded-full mr-2'
				/>
				<p className='font-bold'>{title}</p>
			</div>

			<TextField
                    name="fullName"
                    label="Nome"
                    className='my-2'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <TextField
                    name="email"
                    label="E-mail"
                    className='my-2'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    name="fullName"
                    label="Senha"
                    id="outlined-password-input"
                    type='password'
                    className='my-2'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <select
                    name="cinemas"
                    value={selectedCinema}
                    onChange={(e) => setSelectedCinema(e.target.value)}
                    className='rounded-md'
                >
                    <option value=''>Selecione um cinema</option>
                    {cinemas.map((item: CinemaProps, index) => (
                        <option key={index} value={item.ID_CINEMA}>{item.NOME}</option>
                    ))}
                </select>

                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Nível</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={(e) => setLevel(e.target.value)}
                    >
                        <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                        <FormControlLabel value="user" control={<Radio />} label="User" />
                    </RadioGroup>
                </FormControl>

			<div className='w-full'>
				<button
					className='px-2 py-1 w-full bg-[#B81D24] hover:bg-[#980D14] hover:scale-105 duration-500 text-white rounded-md'
					type='submit'
					onClick={handleSubmit}
				>
					SUBMIT
				</button>
			</div>
		</div>
	);
}

const UserList = () => {
    const [selectedUsersIds, setSelectedUsersIds] = useState<number[]>([]);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(0);
	const [users, setUsers] = useState<UserType[]>([]);
	const { user } = useUser();

	useEffect(() => {
		const getReservas = async () => {

			if(users.length !== 0) return;

			const req = await fetch(`${BACKENDADDRESS}cineticket/funcionarios`);
			const json = await req.json();

			json.map((item: UserType) => {
                users.push(
                    {
                        NOME: item.NOME,
                        NIVEL: item.NIVEL,
                        SENHA: item.SENHA,
                        EMAIL: item.EMAIL,
                        ID_FUNCIONARIO: item.ID_FUNCIONARIO,
                        ID_CINEMA: item.ID_CINEMA,
                        CINEMA: item.CINEMA
                    }
                )
			});

			console.log(users);
		}

		getReservas();
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
	const handleDeleteUser = ({...prop}: UserType) => {
		if(user.nivel !== 'admin') {
			AlertError({
				title: 'Acesso Negado',
				description: 'Você não tem permissão para realizar este tipo de ação, por favor contacte o seu administrador.'
			});

			return;
		}
	}

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
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
								ID
							</TableCell>
							<TableCell>
								Nome
							</TableCell>
                            <TableCell>
								E-mail
							</TableCell>
							<TableCell>
								Categoria
							</TableCell>
                            <TableCell>
								Cinema
							</TableCell>
							{
								user.nivel === 'admin' ?
								(
									<TableCell>
										Actions
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
                                    user.nivel === 'admin' ?
                                    (
                                        <TableCell>
                                            <div className='flex gap-2'>
                                                <Tooltip title='Delete' arrow placement='top'>
                                                    <button className='cursor-pointer'>
                                                        <BsTrashFill className='text-[#A00]' size={18} />
                                                    </button>
                                                </Tooltip>
                                                <Tooltip title='Promover' arrow placement='top'>
													<button className="flex">
														<BsFillArrowUpCircleFill className='text-[#005]' size={18} />
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
