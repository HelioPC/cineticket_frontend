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
    TableRow} from '@mui/material';
import { SessionType } from '../../types';
import FloatingAddButton from '../FloatingAddButton';
import Modal from '../Modal';
import { Loading } from '../Utils';
import NewSessions from '../NewSessions';
import { BACKENDADDRESS } from '../../data/dummy';
import { useUser } from '../../contexts/UserContext';

const SessionsList = () => {
    const [selectedSessionIds, setSelectedSessionIds] = useState<number[]>([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);
    const [sessions, setSessions] = useState<SessionType[]>([]);
    const { user } = useUser();

    useEffect(() => {
        const getSessions = async () => {
            const req = await fetch(`${BACKENDADDRESS}cineticket/sessoes`);
            const json = await req.json();

            if(sessions.length === 0) {
                json.map((sess: SessionType) => {
                    if(user.nivel === 'admin') {
                        setSessions(sessions => [...sessions, sess]);
                    } else {
                        if(sess.ID_CINEMA === user.id_cinema) {
                            setSessions(sessions => [...sessions, sess]);
                        }
                    }
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

    if(sessions.length === 0) return (<Loading text="Connecting to CineTicket API..." />);
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
