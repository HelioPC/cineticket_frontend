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
    FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField, FormControlLabel, FormLabel, Radio, RadioGroup
} from '@mui/material';
import { BsTrashFill, BsPersonCircle } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';

import { EditMovieProps, MovieProps, MyList } from '../../types';
import { Loading } from '../Utils';

import { SelectChangeEvent } from '@mui/material/Select';
import Modal from '../Modal';
import axios from "axios";
import { AlertError, AlertSuccess } from '../Alerts/';
import { BACKENDADDRESS, GENRES } from '../../data/dummy';

const EditMovie = ({ TITULO, DESCRICAO, DURACAO, ANO, CAPA_URL, CLASSIFICACAO, ID_FILME, setOpen }: EditMovieProps) => {
	const [title, setTitle] = useState(TITULO);
	const [description, setDescription] = useState(DESCRICAO);
	const [year, setYear] = useState(ANO);
	const [image, setImage] = useState(CAPA_URL);
	const [genre, setGenre] = useState('28');
	const [duration, setDuration] = useState(DURACAO);
	const [selectOption, setSelectOption] = useState(CLASSIFICACAO);
	const options = [
        { id: '1', title: '7' },
        { id: '2', title: '12' },
        { id: '3', title: '14' },
        { id: '4', title: '16' },
        { id: '5', title: '18' }
    ];

	const handleSubmit = () => {
		// Check if all fields aren't filled
        if (title === '' || image === '' || description === '' || year === '' || parseInt(year) < 1930 || genre === '' || selectOption === '' || duration === '') {
            AlertError({
                title: 'Erro',
                description: 'Preencha todos os campos para continuar'
            });
			setOpen(false);
            return;
        }

        // Check if the year is valid
        if (year.length !== 4) {
            AlertError({
                title: 'Erro',
                description: 'Ano inválido'
            });
			setOpen(false);
            return;
        }

		console.log( title, description, year, image, GENRES[genre], selectOption );

        const data = new FormData();
        data.append('titulo', title);
        data.append('ano', year);
		data.append('duracao', duration);
        data.append('descricao', description);
        data.append('genero', GENRES[genre]);
        data.append('capa', image);
        data.append('classificacao', selectOption);
    
        console.log(data.values());
    
        axios({
            method: 'POST',
            data: data,
            url: `${BACKENDADDRESS}cineticket/filmes/${ID_FILME}/update`,
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(function (response) {
			console.log(response);
            //handle success
            if(response.data.status === 'sucesso') {
				AlertSuccess({
					title: 'Success',
					description: `Filme ${TITULO} atualizado com sucesso`,
					confirm: () => window.location.reload()
				});
			} else {
				AlertError({
					title: 'Erro',
					description: 'Erro na conexão com CineTicket API ⛔️',
					confirm: () => window.location.reload()
				});
			}
          })
          .catch(function (response) {
            //handle error
			AlertError({
				title: 'Erro',
				description: 'Erro inesperado 😥'
			});
            console.log(response);
        });
        setOpen(false);
	}

	const handleYear = (e: any) => {
        const newValue = Math.min(Math.max(e.target.value, 0), 2022)
        setYear(previousValue => newValue+'');
    }
	
	const handleDuration = (e: any) => {
        const newValue = Math.min(Math.max(e.target.value, 65), 280);
        setDuration(previousValue => newValue+'');
    }

	return (
		<div className='flex flex-col gap-5'>
			<div className='w-full flex items-center'>
				<img
					src={`https://image.tmdb.org/t/p/w300${image}`}
					alt={title} className='w-10 h-10 rounded-full mr-2'
				/>
				<p className='font-bold'>{title}</p>
			</div>

			<TextField
				label='Título'
				className='mt-2'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>

			<TextField
                name="duration"
                label="Duração (em minutos)"
                className='my-2 w-full'
                type='number'
                value={duration}
                onChange={handleDuration}
            />
			
			<TextareaAutosize
				placeholder='Descrição'
				className='mt-2'
				maxRows={5}
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			
			<TextField
				label='Lançamento'
				className='mt-2'
				value={year}
				onChange={(e) => handleYear(e)}
			/>

			<TextField
				label='Url'
				className='mt-2'
				value={image}
				onChange={(e) => setImage(e.target.value)}
			/>

			<FormControl variant="outlined">
				<InputLabel>Classificação</InputLabel>
				<Select
					label='Department'
					name='departmentId'
					value={selectOption}
					onChange={(e) => setSelectOption(e.target.value)}
				>
					{
						options.map(
							item => (<MenuItem key={item.id} value={item.title}>{item.title}</MenuItem>)
						)
					}
				</Select>
			</FormControl>
			
			<FormControl className='mt-2' variant='outlined'>
				<InputLabel id='demo-simple-select-outlined-label'>Gênero</InputLabel>
				<Select
					labelId='demo-simple-select-outlined-label'
					id='demo-simple-select-outlined'
					label='Gênero'
					value={genre}
					onChange={(e) => setGenre(e.target.value)}
				>
					{Object.keys(GENRES).map((key) => (
						<MenuItem key={key} value={key}>{GENRES[key]}</MenuItem>
					))}
				</Select>
			</FormControl>

			<div className='w-full'>
				<button
					className='px-2 py-1 w-full bg-[#B81D24] hover:bg-[#980D14] hover:scale-105 duration-500 text-white rounded-md'
					type='submit'
					onClick={handleSubmit}
				>
					Salvar
				</button>
			</div>
		</div>
	);
}

export const MoviesList = () => {
	const [selectedMoviesIds, setSelectedMoviesIds] = useState<number[]>([]);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(0);
	const [movie, setMovie] = useState<MovieProps>();
	const [backendMovies, setBackendMovies] = useState<MovieProps[]>([]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const getMovies = async () => {
			if(backendMovies.length !== 0) return;
			
			const req = await fetch(`${BACKENDADDRESS}cineticket/filmes`);
			const json = await req.json();

			json.map((item: MovieProps) => {
				setBackendMovies((movies => [...movies, item]));
			});
		}

		getMovies();
	} , []);


	const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
		let newSelectedMoviesIds: number[];

		if (event.target.checked) {
			newSelectedMoviesIds = backendMovies.map((movie, index) => index);
		} else {
			newSelectedMoviesIds = [];
		}

		setSelectedMoviesIds(newSelectedMoviesIds);
	};

	const handleSelectOne = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
		const selectedIndex = selectedMoviesIds.indexOf(id);
		let newSelectedMoviesIds: number[] = [];

		if (selectedIndex === -1) {
			newSelectedMoviesIds = newSelectedMoviesIds.concat(selectedMoviesIds, id);
		} else if (selectedIndex === 0) {
			newSelectedMoviesIds = newSelectedMoviesIds.concat(selectedMoviesIds.slice(1));
		} else if (selectedIndex === selectedMoviesIds.length - 1) {
			newSelectedMoviesIds = newSelectedMoviesIds.concat(selectedMoviesIds.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelectedMoviesIds = newSelectedMoviesIds.concat(
			selectedMoviesIds.slice(0, selectedIndex),
			selectedMoviesIds.slice(selectedIndex + 1)
			);
		}

		setSelectedMoviesIds(newSelectedMoviesIds);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLimit(+event.target.value);
		setPage(0);
	};

	const handleDisplayEditMovie = ({ ID_FILME, ANO, TITULO, DESCRICAO, GENERO, CLASSIFICACAO, CAPA_URL, DURACAO }: MovieProps) => {
		setMovie({ ID_FILME, ANO, TITULO, DESCRICAO, GENERO, CLASSIFICACAO, CAPA_URL, DURACAO });
		setOpen(true);
	}

	if(backendMovies.length === 0) return <Loading text="Connecting to CineTicket API..." />;

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow className='bg-[#DDD]'>
							<TableCell padding="checkbox">
								<Checkbox
								checked={selectedMoviesIds.length === backendMovies.length}
								color="primary"
								indeterminate={
									selectedMoviesIds.length > 0
									&& selectedMoviesIds.length < backendMovies.length
								}
								onChange={handleSelectAll}
								/>
							</TableCell>
							<TableCell>
								<p className="font-bold">Título</p>
							</TableCell>
							<TableCell>
								<p className="font-bold">Duração</p>
							</TableCell>
							<TableCell>
								<p className="font-bold">Gênero</p>
							</TableCell>
							<TableCell>
								<p className="font-bold">Classificação</p>
							</TableCell>
							<TableCell>
								<p className="font-bold">Lançamento</p>
							</TableCell>
							<TableCell>
								<p className="font-bold">Actions</p>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{backendMovies.slice(page * limit, page * limit + limit)
						.map((movie, index) => (
						<TableRow
							hover
							key={index}
							selected={selectedMoviesIds.indexOf(index) !== -1}
							className='cursor-pointer'
						>
							<TableCell padding="checkbox">
								<Checkbox
									checked={selectedMoviesIds.indexOf(index) !== -1}
									onChange={(event) => handleSelectOne(event, index)}
									value="true"
								/>
							</TableCell>
							<TableCell>
								<Box
									sx={{
										alignItems: 'center',
										display: 'flex'
									}}
								>
									{movie.CAPA_URL && (
										movie.CAPA_URL.includes('http') ? (
											<Avatar src={movie.CAPA_URL} alt={movie.TITULO} sx={{ mr: '20px' }} />
										) : (
											<BsPersonCircle size={24} className='mr-2' />
										)
									)}
									<p className='sm:block hidden'>{movie.TITULO}</p>
								</Box>
							</TableCell>
							<TableCell>
								{movie.DURACAO} min
							</TableCell>
							<TableCell>
								{movie.GENERO}
							</TableCell>
							<TableCell>
								{movie.CLASSIFICACAO}
							</TableCell>
							<TableCell>
								{movie.ANO}
							</TableCell>
							<TableCell>
								<div className='flex'>
									<Tooltip title='Edit' arrow placement='top'>
										<button
											className='cursor-pointer ml-5'
											onClick={() => handleDisplayEditMovie({ ...movie })}
										>
											<FaEdit className='text-[#00A]' size={18} />
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
				count={backendMovies.length}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				page={page}
				rowsPerPage={limit}
				rowsPerPageOptions={[1, 5, 10]}
			/>

			<Modal
				open={open}
				setOpen={setOpen}
				title='Edição de Filme'
			>
				{movie === undefined ? 
				(
					<div>Falhou</div>
				) : (
					<EditMovie
						TITULO={movie.TITULO} ANO={movie.ANO} CAPA_URL={movie.CAPA_URL}
						CLASSIFICACAO={movie.CLASSIFICACAO} setOpen={setOpen}
						ID_FILME={movie.ID_FILME} DESCRICAO={movie.DESCRICAO}
						GENERO={movie.GENERO} DURACAO={movie.DURACAO}
					/>
				)
				}
			</Modal>
		</Paper>
	);
};

