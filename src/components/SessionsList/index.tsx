import React, { useState, useEffect } from 'react';
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
    Tooltip
} from '@mui/material';
import { BsTrashFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { CinemaProps, CidadeProps, RuaProps, SessionType } from '../../types';
import FloatingAddButton from '../FloatingAddButton';
import NewCinema from '../NewCinema';
import Modal from '../Modal';
import { Loading } from '../Utils';
import NewSessions from '../NewSessions';

const SessionsList = () => {
    const [selectedSessionIds, setSelectedSessionIds] = useState<number[]>([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);
    const [sessions, setSessions] = useState<SessionType[]>([]);

    useEffect(() => {
        const getSessions = async () => {
            const req = await fetch('http://192.168.43.35/cineticket/sessoes');
            const json = await req.json();

            if(sessions.length === 0) {
                json.map((sess: SessionType) => {
                    setSessions(sessions => [...sessions, sess]);
                });
            }
        }

        getSessions();
    }, []);

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
		let newSelectedSessionsIds: number[];

		if (event.target.checked) {
			newSelectedSessionsIds = sessions.map((sess, index) => index);
		} else {
			newSelectedSessionsIds = [];
		}

		setSelectedSessionIds(newSelectedSessionsIds);
    };

    const handleSelectOne = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const selectedIndex = selectedSessionIds.indexOf(id);
        let newSelectedSessionsIds: number[] = [];

        if (selectedIndex === -1) {
            newSelectedSessionsIds = newSelectedSessionsIds.concat(selectedSessionIds, id);
        } else if (selectedIndex === 0) {
            newSelectedSessionsIds = newSelectedSessionsIds.concat(selectedSessionIds.slice(1));
        } else if (selectedIndex === selectedSessionIds.length - 1) {
            newSelectedSessionsIds = newSelectedSessionsIds.concat(selectedSessionIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedSessionsIds = newSelectedSessionsIds.concat(
                selectedSessionIds.slice(0, selectedIndex),
                selectedSessionIds.slice(selectedIndex + 1)
            );
        }

        setSelectedSessionIds(newSelectedSessionsIds);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLimit(+event.target.value);
        setPage(0);
    };

    if(sessions.length === 0) return (<Loading text="Fetching..." />);
    console.log(sessions);
    
    return (
        <React.Fragment>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow className='bg-[#DDD]'>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedSessionIds.length === sessions.length}
                                        color="primary"
                                        indeterminate={
                                        selectedSessionIds.length > 0
                                        && selectedSessionIds.length < sessions.length
                                        }
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                <TableCell>
                                    <p className='font-bold'>ID</p>
                                </TableCell>
                                <TableCell>
                                    <p className='font-bold'>Cinema</p>
                                </TableCell>
                                <TableCell>
                                    <p className='font-bold'>Data</p>
                                </TableCell>
                                <TableCell>
                                    <p className='font-bold'>Hora</p>
                                </TableCell>
                                <TableCell>
                                    <p className='font-bold'>Preco</p>
                                </TableCell>
                                <TableCell>
                                    <p className='font-bold'>Sala</p>
                                </TableCell>
                                <TableCell>
                                    <p className='font-bold'>Filme</p>
                                </TableCell>
                                <TableCell>
                                    <p className='font-bold'>Actions</p>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sessions.slice(page * limit, page * limit + limit)
                            .map((sess, index) => (
                                <TableRow
                                    hover
                                    key={index}
                                    selected={selectedSessionIds.indexOf(index) !== -1}
                                    className='cursor-pointer'
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedSessionIds.indexOf(index) !== -1}
                                            onChange={(event) => handleSelectOne(event, index)}
                                            value="true"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {sess.ID}
                                    </TableCell>
                                    <TableCell>
                                        {sess.CINEMA}
                                    </TableCell>
                                    <TableCell>
                                        {sess.DATA}
                                    </TableCell>
                                    <TableCell>
                                        {sess.HORA}
                                    </TableCell>
                                    <TableCell>
                                        {sess.PRECO}
                                    </TableCell>
                                    <TableCell>
                                        {sess.SALA}
                                    </TableCell>
                                    <TableCell>
                                        {sess.TITULO}
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
                    count={sessions.length}
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
                title='Formulário de Sessões'
            >
                <NewSessions setOpen={setOpen} />
            </Modal>
        </React.Fragment>
    );
}

export default SessionsList;
