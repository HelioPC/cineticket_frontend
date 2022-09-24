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
import { AiOutlinePlus } from 'react-icons/ai';
import { BsPlusCircleFill } from 'react-icons/bs';
import { AlertError, AlertSuccess } from "../../../components/Alerts";
import axios from "axios";
import { BACKENDADDRESS } from "../../../data/dummy";
import { Loading } from "../../../components/Utils";

type CinemaProps = {
    name: string;
    setOpen: (open: boolean) => void;
}

type SalaType = {
    ID_SALA: string;
    NUMERO: string;
    ID_CINEMA: string;
    CAPACIDADE: string;
}

const Cinema = ({ name, setOpen }: CinemaProps) => {
    const [selectedSalaIds, setSelectedSalaIds] = useState<number[]>([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [salas, setSalas] = useState<SalaType[]>([]);
    const [salaId, setSalaId] = useState('');
    const [salaTamanho, setsalaTamanho] = useState(1);

    useEffect(() => {
        const getSalas = async () => {
            if(salas.length !== 0) return;
            
            const req = await fetch(`${BACKENDADDRESS}cineticket/cinemas/${name}/salas`);
			const json = await req.json();

            json.map((item: SalaType) => {
                setSalas(salas => [...salas, item]);
            })
        }

        getSalas();
    }, []);

    const handleSubmit = () => {
        var sameNumber = false;
        
        if(salaId === '' || salaTamanho === 0) {
            AlertError({
                title: 'Erro',
                description: 'Preencha todos os campos para continuar'
            });
            setOpen(false);
            return;
        }

        salas.map((sala) => {
            if(sala.NUMERO === salaId) {
                sameNumber = true;
            }
        });

        if(sameNumber) {
            AlertError({
                title: 'Erro',
                description: 'Número da sala já existe'
            })
            setOpen(false);
            return;
        }

        const data = new FormData();
        data.append('number', salaId);
        data.append('id_cinema', name);
        data.append('capacity', salaTamanho+'');

        axios({
            method: 'POST',
            data: data,
            url: `${BACKENDADDRESS}cineticket/salas/store`,
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(function (response) {
            //handle success
            AlertSuccess({
                title: 'Success',
                description: `Sala ${salaId} adicionada ao cinema ${name} com sucesso.`,
                confirm: () => window.location.reload()
            });
            console.log(response);
          })
          .catch(function (response) {
            //handle error
            AlertError({
                title: "Error",
                description: "Ocorreu um erro inesperado! 😭",
                confirm: () => window.location.reload()
            });
          });
        setOpen(false);
    }

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

    const handleTamanho = (e: any) => {
        const newValue = Math.min(Math.max(e.target.value, 1), 50)
        setsalaTamanho(previousValue => newValue)
    }

    //if(salas.length === 0) return <Loading text="Loading..." />

    return (
        <div className="h-screen">
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
                            <TableCell>
                                Número
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
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell>
                                    <span className="text-green-700 font-bold text-lg">Nova</span>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        value={salaId}
                                        name="num"
                                        label="Número da sala"
                                        onChange={(e) => setSalaId(e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        value={salaTamanho}
                                        name="tam"
                                        label="Quantidade de lugares"
                                        type="number"
                                        onChange={handleTamanho}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Tooltip title='Adicionar sala' arrow placement="top">
                                        <button onClick={() => handleSubmit()}>
                                            <span className="flex items-center gap-3 bg-green-700 py-1 px-2 rounded-xl hover:scale-105 duration-500">
                                                <BsPlusCircleFill size={20} className="text-white font-bold" />
                                                <p className="text-white">Add sala</p>
                                            </span>
                                        </button>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
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
        </div>
    );
}

export default Cinema;