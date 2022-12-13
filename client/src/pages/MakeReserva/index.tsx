import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImTicket } from "react-icons/im";

import Header from "../../components/Header";
import { Loading } from "../../components/Utils";
import { BACKENDADDRESS } from "../../data/dummy";
import { LugarType, MovieProps, SessionType } from "../../types";
import Modal from "../../components/Modal";
import SelectPlace from "../../components/SelectPlace";
import Footer from "../../components/Footer";

const MakeReserva = () => {
    const path = useParams();
    const [selectedCinema, setSelectedCinema] = useState('');
    const [open, setOpen] = useState(false);
    const [movie, setMovie] = useState<MovieProps>();
    const [sessions, setSessions] = useState<SessionType[]>([]);
    const [filteredSessions, setFilteredSessions] = useState<SessionType[]>([]);
    const [lugares, setLugares] = useState<LugarType[]>([]);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const getMovies = async () => {
			//const req = await fetch('http://192.168.43.35/cineticket/filmes'); await fetch(`${BACKENDADDRESS}`);
            const req = await fetch(`${BACKENDADDRESS}cineticket/filmes`);
			const json = await req.json();

			json.data.map(async (item: MovieProps) => {
                
                if(item.titulo === path.id) {
                    setMovie(item);
                    let selectedMovie: MovieProps = item;

                    //const req1 = await fetch(`http://192.168.43.35/cineticket/filmes/${selectedMovie.ID_FILME}/sessoes`);
                    const req1 = await fetch(`${BACKENDADDRESS}cineticket/filmes/${selectedMovie.id_filme}/sessions`);
                    const json1 = await req1.json();

                    if(sessions.length === 0) {
                        json1.data.map((sess: SessionType) => {
                            setSessions((sessions) => [...sessions, sess]);
                        });
                    }
                }
			});
		}

		getMovies();
    } , []);

    useEffect(() => {
        const filterSessionsByCinema = () => {
            if(selectedCinema === '' || selectedCinema === 'Selecione o cinema') return;
            
            setFilteredSessions([]);
            sessions.map((item, index) => {
                if(item.CINEMA === selectedCinema) {
                    setFilteredSessions((sessions) => [...sessions, item]);
                }
            });
        }

        filterSessionsByCinema();
    }, [selectedCinema]);

    const getLugares = async (id: string) => {
        //const req2 = await fetch(`http://192.168.43.35/cineticket/sessoes/${id}/lugares`);
        const req2 = await fetch(`${BACKENDADDRESS}cineticket/sessions/${id}/lugares`);
        const json2 = await req2.json();

        if(lugares.length === 0) {
            json2.data.map((lg: LugarType) => {
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
    }

    useEffect(() => {
        if(lugares.length !== 0) setOpen(true);
    }, [lugares]);

    useEffect(() => {
        if(!open) setLugares([]);
    }, [open]);

    if(!movie || sessions.length === 0) return <Loading text="Getting the movie..." />;
    if(lugares.length === 0 && open) return <Loading text="Loading..." />;

    return (
        <div className="w-screen min-h-screen bg-[#111] scroll">
            <Header />
            
            <div className="w-full h-full flex flex-col">
                <div
                    className="w-full h-[720px] rounded-b-lg bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${movie.capa_url})`,
                        display: `block`
                    }}
                >
                    <div className="w-full h-full bg-[linear-gradient(to_top,#111_10%,transparent_80%)]">
                        <div className="w-full h-full flex flex-col justify-center pl-8 pb-36 bg-[linear-gradient(to_right,#111_30%,transparent_70%)]">
                            <div className="text-[60px] font-bold max-w-[60%] text-white">
                                {movie.titulo}
                                </div>
                            <div className="text-[18px] mt-[35px] md:max-w-[30%] sm:max-w-[60%] text-white">
                                {movie.descricao}
                                </div>
                        </div>
                    </div>
                </div>

                <div className="flex md:flex-row flex-col gap-x-10 gap-y-10 mt-20 sm:px-16 px-10">
                    <img
                        src={`${movie.capa_url}`}
                        alt={movie.titulo}
                        className="md:w-52 w-full h-80 rounded-lg object-fill md:hover:shadow-lg md:hover:shadow-[#FFF] duration-300"
                    />

                    <div className="flex flex-col gap-y-2 w-full">
                        <h1 className="text-3xl font-bold mb-5">{movie.titulo}</h1>

                        <div className="flex gap-2">
                            <p className="font-bold">Estreia:</p>
                            <p>{movie.ano}</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Género:</p>
                            <p>{movie.genero}</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Classificação:</p>
                            <p>{movie.classificacao}</p>
                        </div>
                        
                        <div className="mt-5 md:w-4/5 w-full">
                            <select
                                name="cinemas"
                                className="w-full text-black rounded-md"
                                value={selectedCinema}
                                onChange={(e) => setSelectedCinema(e.target.value)}
                            >
                                <option key={999} value="Selecione o cinema">
                                    Selecione o cinema
                                </option>
                                {
                                    removeSessionsWithDuplicateCinema(sessions).map((cine, index) => (
                                        <option key={index} value={cine.CINEMA}>
                                            {cine.CINEMA}
                                        </option>
                                    ))
                                }
                            </select>

                            {
                                selectedCinema === '' || selectedCinema === 'Selecione o cinema' ?
                                null : (
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
                                                        filteredSessions.map((sess, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell>{sess.SALA}</TableCell>
                                                                <TableCell>{sess.DATA}</TableCell>
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

            <Footer />
        </div>
    );
}

export default MakeReserva;
