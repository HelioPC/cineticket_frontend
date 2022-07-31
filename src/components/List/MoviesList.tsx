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
    Typography
} from '@mui/material';
import { BsTrashFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';

import { MyList } from '../../types';
import api from '../../api';
import { Loading } from '../Utils';

export const MoviesList = () => {
  const [selectedMoviesIds, setSelectedMoviesIds] = useState<number[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [movies, setMovies] = useState<MyList[]>([]);

    useEffect(() => {
        const loadMovies = async () => {
            let list: MyList[] = await api.getHomeList();

            // Remove results whose results doen't have a first_air_date
            list = list.filter(item => item.items.results.filter(result => result.first_air_date === undefined).length > 0);

            // Pop elements with first_air_date
            list = list.map(item => {
                item.items.results = item.items.results.filter(result => result.first_air_date === undefined);
                return item;
            }
            );

            setMovies(list);
            console.log(movies[0]);
        }
        loadMovies();
    } , []);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newSelectedMoviesIds: number[];

    if (event.target.checked) {
      newSelectedMoviesIds = movies[0].items.results.map((movie, index) => index);
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

  if(movies.length === 0) return <Loading text="Connecting to CineTicket API..." />;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className='bg-[#DDD]'>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedMoviesIds.length === movies[0].items.results.length}
                    color="primary"
                    indeterminate={
                      selectedMoviesIds.length > 0
                      && selectedMoviesIds.length < movies[0].items.results.length
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
              {movies[0].items.results.slice(page * limit, page * limit + limit)
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
                      <Avatar
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        sx={{ mr: 2 }}
                      >
                        {movie.title}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {movie.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    1
                  </TableCell>
                  <TableCell>
                    1
                  </TableCell>
                  <TableCell>
                    1
                  </TableCell>
                  <TableCell>
                      <div className='flex'>
                        <Tooltip title='Delete' arrow placement='top'>
                            <button className='cursor-pointer'>
                                <BsTrashFill className='text-[#A00]' size={18} />
                            </button>
                        </Tooltip>
                        <Tooltip title='Edit' arrow placement='top'>
                            <button className='cursor-pointer ml-5'>
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
        count={movies[0].items.results.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[10, 25, 100]}
      />
    </Paper>
  );
};

