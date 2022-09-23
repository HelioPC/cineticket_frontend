import React, { useState, useEffect } from 'react';
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
    Tooltip
} from '@mui/material';
import { BsTrashFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import Modal from '../Modal';
import NewCinema from '../NewCinema';
import FloatingAddButton from '../FloatingAddButton';
import { CinemaProps, RuaProps, CidadeProps } from '../../types';
import { BACKENDADDRESS } from '../../data/dummy';
import { Loading } from '../Utils';
import Cinema from '../../pages/profile/pages/Cinema';

const CinemaList = () => {
    const [selectedCinemaIds, setSelectedCinemaIds] = useState<number[]>([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
	const [cinemas, setCinemas] = useState<CinemaProps[]>([]);
    const [cinemaId, setCinemaId] = useState('');
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const { user } = useUser();
    const navigate = useNavigate();
    const [cidades, setCidades] = useState<CidadeProps[]>([]);
    const [ruas, setRuas] = useState<RuaProps[]>([]);
    const [cidade, setCidade] = useState('');

    useEffect(() => {
        // Get cidades
        const getCidades = async () => {
            const req = await fetch(`${BACKENDADDRESS}cineticket/cidades`);
            const json = await req.json();

            json.map((cidade: CidadeProps) => {
                setCidades(cidades => [...cidades, cidade]);
            });
        }

        getCidades();
    } , []);

    useEffect(() => {
        // Get ruas
        const getRuas = async () => {
                const req = await fetch(`${BACKENDADDRESS}cineticket/ruas`);
                const json = await req.json();

                if(ruas.length === 0) {
                    json.map((rua: RuaProps) => {
                        setRuas(ruas => [...ruas, rua]);
                    });
                }
        }
        getRuas();
        if(ruas.length > 0) console.log(ruas);
    } , [cidade]);

    useEffect(() => {

		const getCinemas = async () => {
            if(cinemas.length !== 0) return;
			
            const req = await fetch(`${BACKENDADDRESS}cineticket/cinemas`);
			const json = await req.json();

			json.map((item: CinemaProps) => {
				setCinemas(cinemas => [...cinemas, item]);
			});
		}

		getCinemas();
    } , []);

	const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
		let newSelectedCinemasIds: number[];

		if (event.target.checked) {
			newSelectedCinemasIds = cinemas.map((cine, index) => index);
		} else {
			newSelectedCinemasIds = [];
		}

		setSelectedCinemaIds(newSelectedCinemasIds);
};

  const handleSelectOne = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const selectedIndex = selectedCinemaIds.indexOf(id);
    let newSelectedCinemasIds: number[] = [];

    if (selectedIndex === -1) {
      newSelectedCinemasIds = newSelectedCinemasIds.concat(selectedCinemaIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCinemasIds = newSelectedCinemasIds.concat(selectedCinemaIds.slice(1));
    } else if (selectedIndex === selectedCinemaIds.length - 1) {
      newSelectedCinemasIds = newSelectedCinemasIds.concat(selectedCinemaIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCinemasIds = newSelectedCinemasIds.concat(
        selectedCinemaIds.slice(0, selectedIndex),
        selectedCinemaIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCinemaIds(newSelectedCinemasIds);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(+event.target.value);
    setPage(0);
  };

  if(cinemas.length === 0) return <Loading text='Connecting to CineTicket API...' />

    return (
        <React.Fragment>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow className='bg-[#DDD]'>
                                <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedCinemaIds.length === cinemas.length}
                                    color="primary"
                                    indeterminate={
                                    selectedCinemaIds.length > 0
                                    && selectedCinemaIds.length < cinemas.length
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
                                    <p className="font-bold">Localização</p>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cinemas.slice(page * limit, page * limit + limit)
                            .map((cine, index) => (
                                <TableRow
                                    hover
                                    key={index}
                                    selected={selectedCinemaIds.indexOf(index) !== -1}
                                    className="cursor-pointer"
                                    onClick={() => {setCinemaId(cine.ID_CINEMA);setOpen2(true);}}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedCinemaIds.indexOf(index) !== -1}
                                            onChange={(event) => handleSelectOne(event, index)}
                                            value="true"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {cine.ID_CINEMA}
                                    </TableCell>
                                    <TableCell>
                                        {cine.NOME}
                                    </TableCell>
                                    <TableCell>
                                        {cine.LOCALIZACAO}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    component="div"
                    count={cinemas.length}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[1, 5, 10]}
                />
            </Paper>

            <FloatingAddButton onClick={() => setOpen(true)} title='Adicionar cinema' />

            <Modal
                open={open}
                setOpen={setOpen}
                title='Formulário Cinemas'
            >
                <NewCinema cidades={cidades} ruas={ruas} setOpen={setOpen} setCidade={setCidade} />
            </Modal>

            <Modal
                open={open2}
                setOpen={setOpen2}
                title={`Adicionar sala ao cinema ${cinemaId}`}
                maxWidth='xl'
            >
                <Cinema name={cinemaId} setOpen={setOpen2} />
            </Modal>
        </React.Fragment>
    );
}

export default CinemaList;
