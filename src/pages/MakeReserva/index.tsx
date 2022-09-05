import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImTicket } from "react-icons/im";

import api from "../../api";
import Header from "../../components/Header";
import { Loading } from "../../components/Utils";
import { BACKENDADDRESS, GENRES } from "../../data/data";
import { CinemaProps, LugarType, Movie, MovieProps, MyList, SessionType } from "../../types";
import Modal from "../../components/Modal";
import SelectPlace from "../../components/SelectPlace";

type SessionProps = {
    ID_SESSAO: string;
    ID_SALA: string;
    ID_FILME: string;
    ESTADO: string;
    HORARIO: string;
    PRECO: string;
}

const SESSOES: SessionProps[] = [
    {
        ID_SESSAO: '',
        ID_SALA: '7',
        ID_FILME: '',
        ESTADO: '',
        HORARIO: '2022-12-12',
        PRECO: '8000 kz'
    },
    {
        ID_SESSAO: '',
        ID_SALA: '7',
        ID_FILME: '',
        ESTADO: '',
        HORARIO: '2022-12-12',
        PRECO: '8000 kz'
    },
    {
        ID_SESSAO: '',
        ID_SALA: '7',
        ID_FILME: '',
        ESTADO: '',
        HORARIO: '2022-12-12',
        PRECO: '8000 kz'
    },
    {
        ID_SESSAO: '',
        ID_SALA: '7',
        ID_FILME: '',
        ESTADO: '',
        HORARIO: '2022-12-12',
        PRECO: '8000 kz'
    }
];

type ReservaProp = {
    
}

const CINEMAS: CinemaProps[] = [
    {
        ID_CINEMA: 'Luanda',
        NOME: '',
        LOCALIZACAO: ''
    },
    {
        ID_CINEMA: 'Benguela',
        NOME: '',
        LOCALIZACAO: ''
    },
    {
        ID_CINEMA: 'Lubango',
        NOME: '',
        LOCALIZACAO: ''
    },
    {
        ID_CINEMA: 'Huambo',
        NOME: '',
        LOCALIZACAO: ''
    },
    {
        ID_CINEMA: 'Namibe',
        NOME: '',
        LOCALIZACAO: ''
    }
];

const MakeReserva = () => {
    const path = useParams();
    const [selectedCinema, setSelectedCinema] = useState('');
    const [open, setOpen] = useState(false);
    const [movie, setMovie] = useState<MovieProps>();
    const [cinemas, setCinemas] = useState<CinemaProps[]>([]);
    const [sessions, setSessions] = useState<SessionType[]>([]);
    const [selectedSession, setSelectedSession] = useState<SessionType>();
    const [lugares, setLugares] = useState<LugarType[]>([]);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const getMovies = async () => {
			//const req = await fetch('http://192.168.43.35/cineticket/filmes'); await fetch(`${BACKENDADDRESS}`);
            const req = await fetch(`${BACKENDADDRESS}cineticket/filmes`);
			const json = await req.json();

			json.map(async (item: MovieProps) => {
                
                if(item.TITULO === path.id) {
                    setMovie(item);
                    let selectedMovie: MovieProps = item;

                    //const req1 = await fetch(`http://192.168.43.35/cineticket/filmes/${selectedMovie.ID_FILME}/sessoes`);
                    const req1 = await fetch(`${BACKENDADDRESS}cineticket/filmes/${selectedMovie.ID_FILME}/sessoes`);
                    const json1 = await req1.json();

                    if(sessions.length === 0) {
                        json1.map((sess: SessionType) => {
                            setSessions(sessions => [...sessions, sess]);
                        });
                    }
                }
			});
		}

		getMovies();
    } , []);

    const getLugares = async (id: string) => {
        //const req2 = await fetch(`http://192.168.43.35/cineticket/sessoes/${id}/lugares`);
        const req2 = await fetch(`${BACKENDADDRESS}cineticket/sessoes/${id}/lugares`);
        const json2 = await req2.json();

        if(lugares.length === 0) {
            json2.map((lg: LugarType) => {
                setLugares(lugares => [...lugares, lg]);
            });
        }
    }

    // Remove Sessions with same CINEMA
    const removeSessionsWithDuplicateCinema = (sessions: SessionType[]) => {
        const uniqueSessions = sessions.filter((session, index) => {
            return sessions.findIndex(({ CINEMA }) => CINEMA === session.CINEMA) === index;
        }).map((session) => {
            return session;
        })
        return uniqueSessions;
    }


    const handleChooseLugares = async (session: SessionType) => {
        await getLugares(session.ID);
        setPrice(parseInt(session.PRECO));

        console.log(lugares);
        if(lugares.length !== 0) setOpen(true);
    }

    if(!movie || sessions.length === 0) return <Loading text="Getting the movie..." />;
    console.log(removeSessionsWithDuplicateCinema(sessions));

    return (
        <div className="w-screen min-h-screen bg-[#111] py-20 scroll sm:px-16 px-10">
            <Header />
            
            <div className="w-full h-full flex flex-col">
                <div className="w-full h-[450px]">
                    <img
                        src={movie.CAPA_URL}
                        alt={movie.TITULO}
                        className="w-full h-full rounded-lg object-fill"
                    />
                </div>

                <div className="flex md:flex-row flex-col gap-x-10 gap-y-10 mt-20">
                    <img
                        src={`${movie.CAPA_URL}`}
                        alt={movie.TITULO}
                        className="md:w-52 w-full h-80 rounded-lg object-fill md:hover:shadow-lg md:hover:shadow-[#FFF] duration-300"
                    />

                    <div className="flex flex-col gap-y-2 w-full">
                        <h1 className="text-3xl font-bold mb-5">{movie.TITULO}</h1>

                        <div className="flex gap-2">
                            <p className="font-bold">Estreia:</p>
                            <p>{movie.ANO}</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Género:</p>
                            <p>{movie.GENERO}</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Classificação:</p>
                            <p>{movie.CLASSIFICACAO}</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold"></p>
                            <p></p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold"></p>
                            <p></p>
                        </div>
                        
                        <div className="mt-5 md:w-4/5 w-full">
                            <select
                                name="cinemas"
                                className="w-full text-black rounded-md"
                                value={selectedCinema}
                                onChange={(e) => setSelectedCinema(e.target.value)}
                            >
                                <option key={999}>
                                    Selecione o cinema
                                </option>
                                {
                                    removeSessionsWithDuplicateCinema(sessions).map((cine, index) => (
                                        <option key={index}>
                                            {cine.CINEMA}
                                        </option>
                                    ))
                                }
                            </select>

                            {
                                selectedCinema === '' || selectedCinema === 'Selecione o cinema' ?
                                (
                                    null
                                )
                                :
                                (
                                    <div className="w-full h-auto bg-[#FFF] rounded-lg mt-3 p-2">
                                        <TableContainer>
                                            <Table >
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell><p className="font-bold">SALA</p></TableCell>
                                                        <TableCell><p className="font-bold">DATA/HORÁRIO</p></TableCell>
                                                        <TableCell><p className="font-bold">PREÇO</p></TableCell>
                                                        <TableCell><p className="font-bold">LUGARES DISPONÍVEIS</p></TableCell>
                                                        <TableCell><p className="font-bold">RESERVE JÁ</p></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        sessions.map((sess, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell>{sess.SALA}</TableCell>
                                                                <TableCell>{sess.HORA}</TableCell>
                                                                <TableCell>{sess.PRECO}</TableCell>
                                                                <TableCell>{sess.DISPONIVEIS}</TableCell>
                                                                <TableCell>
                                                                    <ImTicket
                                                                        size={25}
                                                                        className='cursor-pointer hover:scale-105 duration-500 hover:text-[#F00]'
                                                                        onClick={() => handleChooseLugares(sess)}
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>

            <Modal
                open={open}
                setOpen={setOpen}
                title="Selecione os seus lugares e os seus dados"
            >
                <SelectPlace lugares={lugares} price={price} setOpen={setOpen} />
            </Modal>
        </div>
    );
}

export default MakeReserva;
