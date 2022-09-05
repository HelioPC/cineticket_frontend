import { useParams } from "react-router-dom";
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
    Tooltip,
    FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField
} from '@mui/material';
import { BsTrashFill, BsPersonCircle } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import Modal from "../../../components/Modal";
import FloatingAddButton from "../../../components/FloatingAddButton";
import { AlertError, AlertSuccess } from "../../../components/Alerts";
import axios from "axios";

type CinemaProps = {
    name: string;
}

type SalaType = {
    ID_SALA: string;
    NUMERO: string;
    ID_CINEMA: string;
    CAPACIDADE: string;
}

interface AddSalaInterface {
    setOpen: (open: boolean) => void;
}

//

const AddSala = ({ setOpen }: AddSalaInterface) => {
    const [num, setNum] = useState('');
    const [tam, setTam] = useState('');
    const path = useParams();

    const handleSubmit = () => {
        if(num === '' || tam === '' || path.id === undefined) {
            AlertError({
                title: 'Erro',
                description: 'Preencha todos os campos para continuar'
            });
            setOpen(false);
            return;
        }

        const data = new FormData();
        data.append('number', num);
        data.append('id_cinema', path.id === undefined ? '' : path.id);
        data.append('capacity', tam);

        axios({
            method: 'POST',
            data: data,
            url: 'http://192.168.43.35/cineticket/salas/store',
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(function (response) {
            //handle success
            AlertSuccess({
                title: 'Success',
                description: 'Report sent successfully!'
            });
            console.log(response);
          })
          .catch(function (response) {
            //handle error
            console.log(response);
          });
        setOpen(false);
    }

    return (
        <div className='flex flex-col gap-6'>
            <TextField
                name="fullName"
                label="Número"
                className='my-2'
                value={num}
                onChange={e => setNum(e.target.value)}
            />

            <TextField
                name="cpcd"
                label="Capacidade"
                className='my-2'
                value={tam}
                onChange={e => setTam(e.target.value)}
            />

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
    )
}

const Cinema = () => {
    const [selectedSalaIds, setSelectedSalaIds] = useState<number[]>([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [salas, setSalas] = useState<SalaType[]>([]);
    const path = useParams();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const getSalas = async () => {
            const req = await fetch(`http://192.168.43.35/cineticket/cinemas/${path.id}/salas`);
			const json = await req.json();

            json.map((item: SalaType) => {
                salas.push(
                    {
                        ID_SALA: item.ID_SALA,
                        ID_CINEMA: item.ID_CINEMA,
                        NUMERO: item.NUMERO,
                        CAPACIDADE: item.CAPACIDADE
                    }
                )
            })
        }

        getSalas();
    }, [])

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
		let newSelectedsalasIds: number[];

		if (event.target.checked) {
			newSelectedsalasIds = salas.map((sala, index) => index);
		} else {
			newSelectedsalasIds = [];
		}

		setSelectedSalaIds(newSelectedsalasIds);
    };

    const handleSelectOne = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const selectedIndex = selectedSalaIds.indexOf(id);
        let newSelectedsalasIds: number[] = [];

        if (selectedIndex === -1) {
            newSelectedsalasIds = newSelectedsalasIds.concat(selectedSalaIds, id);
        } else if (selectedIndex === 0) {
            newSelectedsalasIds = newSelectedsalasIds.concat(selectedSalaIds.slice(1));
        } else if (selectedIndex === selectedSalaIds.length - 1) {
            newSelectedsalasIds = newSelectedsalasIds.concat(selectedSalaIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedsalasIds = newSelectedsalasIds.concat(
                selectedSalaIds.slice(0, selectedIndex),
                selectedSalaIds.slice(selectedIndex + 1)
            );
        }

        setSelectedSalaIds(newSelectedsalasIds);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLimit(+event.target.value);
        setPage(0);
    };

    return (
        <React.Fragment>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                        <TableRow className='bg-[#DDD]'>
                            <TableCell padding="checkbox">
                            <Checkbox
                                checked={selectedSalaIds.length === salas.length}
                                color="primary"
                                indeterminate={
                                selectedSalaIds.length > 0
                                && selectedSalaIds.length < salas.length
                                }
                                onChange={handleSelectAll}
                            />
                            </TableCell>
                            <TableCell style={{ minWidth: 170 }}>
                                ID
                            </TableCell>
                            <TableCell>
                                Capacidade
                            </TableCell>
                            <TableCell>
                                Actions
                            </TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {salas.slice(page * limit, page * limit + limit)
                        .map((sala, index) => (
                            <TableRow
                                hover
                                key={index}
                                selected={selectedSalaIds.indexOf(index) !== -1}
                                className='cursor-pointer'
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedSalaIds.indexOf(index) !== -1}
                                        onChange={(event) => handleSelectOne(event, index)}
                                        value="true"
                                    />
                                </TableCell>
                                <TableCell>
                                    {sala.NUMERO}
                                </TableCell>
                                <TableCell>
                                    {sala.CAPACIDADE}
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
                    count={salas.length}
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
                title={`Adicionar sala no cinema - ${path.id}`}
            >
                <AddSala setOpen={setOpen} />
            </Modal>
        </React.Fragment>
    );
}

export default Cinema;