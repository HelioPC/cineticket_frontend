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
import { BsTrashFill, BsPersonCircle } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';

import { EditMovieProps, MovieProps, MyList } from '../../types';
import { Loading } from '../Utils';

import { SelectChangeEvent } from '@mui/material/Select';
import Modal from '../Modal';
import axios from "axios";
import { AlertSuccess } from '../Alerts/';
import { BACKENDADDRESS, GENRES } from '../../data/data';

const EditMovie = ({ id, title, description, release_date, poster_path, genreId }: EditMovieProps) => {
	const [open, setOpen] = useState(false);
	const [titleValue, setTitleValue] = useState(title);
	const [descriptionValue, setDescriptionValue] = useState(description);
	const [release_dateValue, setRelease_dateValue] = useState(release_date);
	const [poster_pathValue, setPoster_pathValue] = useState(poster_path);
	const [genreIdValue, setGenreIdValue] = useState(genreId);

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
				label='Título'
				value={titleValue}
				onChange={(event) => setTitleValue(event.target.value)}
				className='mt-2'
			/>
			
			<TextareaAutosize
				placeholder='Descrição'
				value={descriptionValue}
				onChange={(event) => setDescriptionValue(event.target.value)}
				className='mt-2'
				maxRows={5}
			/>
			
			<TextField
				label='Lançamento'
				value={release_dateValue}
				onChange={(event) => setRelease_dateValue(event.target.value)}
				className='mt-2'
			/>

			<TextField
				label='Poster'
				value={poster_pathValue}
				onChange={(event) => setPoster_pathValue(event.target.value)}
				className='mt-2'
			/>
			
			<FormControl className='mt-2' variant='outlined'>
				<InputLabel id='demo-simple-select-outlined-label'>Gênero</InputLabel>
				<Select
					labelId='demo-simple-select-outlined-label'
					id='demo-simple-select-outlined'
					value={genreIdValue.toString()}
					onChange={(event: SelectChangeEvent<string>) => setGenreIdValue(parseInt(event.target.value))}
					label='Gênero'
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
					SUBMIT
				</button>
			</div>
		</div>
	);
}

export const MoviesList = () => {
	const [selectedMoviesIds, setSelectedMoviesIds] = useState<number[]>([]);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(0);
	const [movie, setMovie] = useState<EditMovieProps>();
	const [backendMovies, setBackendMovies] = useState<MovieProps[]>([]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const getMovies = async () => {

			if(backendMovies.length !== 0) return;

			//const req = await fetch('http://192.168.43.35/cineticket/filmes');
			const req = await fetch(`${BACKENDADDRESS}cineticket/filmes`);
			const json = await req.json();

			json.map((item: MovieProps) => {
			backendMovies.push(
				{
				ID_FILME: item.ID_FILME,
				ANO: item.ANO,
				TITULO: item.TITULO,
				DESCRICAO: item.DESCRICAO,
				GENERO: item.GENERO,
				CLASSIFICACAO: item.CLASSIFICACAO,
				CAPA_URL: item.CAPA_URL
				}
			)
			}
			);
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

	const handleDisplayEditMovie = ({ id, title, description, release_date, poster_path, genreId }: EditMovieProps) => {
		setMovie({ id, title, description, release_date, poster_path, genreId });
		setOpen(true);
	}

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
							<TableCell style={{ minWidth: 170 }}>
								Título
							</TableCell>
							<TableCell>
								Gênero
							</TableCell>
							<TableCell>
								Classificação
							</TableCell>
							<TableCell>
								Lançamento
							</TableCell>
							<TableCell>
								Actions
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
										<Avatar src={movie.CAPA_URL} alt={movie.TITULO} sx={{ mr: '2' }} />
									) : (
										<BsPersonCircle size={24} className='mr-2' />
									)
									)}
									<p className='sm:block hidden'>{movie.TITULO}</p>
								</Box>
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
									<Tooltip title='Delete' arrow placement='top'>
										<button className='cursor-pointer'>
											<BsTrashFill className='text-[#A00]' size={18} />
										</button>
									</Tooltip>
									<Tooltip title='Edit' arrow placement='top'>
										<button
											className='cursor-pointer ml-5'
											onClick={() => handleDisplayEditMovie({ id: parseInt(movie.ID_FILME), title: movie.TITULO, description: movie.DESCRICAO, release_date: movie.ANO, poster_path: movie.CAPA_URL, genreId: parseInt(movie.GENERO) })}
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
					<EditMovie {...movie} />
				)
				}
			</Modal>
		</Paper>
	);
};

