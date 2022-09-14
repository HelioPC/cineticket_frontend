import {
    TextField, FormControl, FormLabel, RadioGroup as MuiRadioGroup,
    Radio, Select, MenuItem, InputLabel, TextareaAutosize
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BACKENDADDRESS } from '../../data/dummy';
import { strToDate, addZeroToDate, formatDate } from '../../helpers/date';
import { CinemaProps, MovieProps } from '../../types';
import { AlertError, AlertSuccess } from '../Alerts';
import { Loading } from '../Utils';

type SalaType = {
    ID_SALA: string;
    NUMERO: string;
    ID_CINEMA: string;
    CAPACIDADE: string;
}

type Props = {
    setOpen: (open: boolean) => void;
}

const NewSessions = ({ setOpen }: Props) => {
    const [cinemas, setCinemas] = useState<CinemaProps[]>([]);
    const [backendMovies, setBackendMovies] = useState<MovieProps[]>([]);
    const [salas, setSalas] = useState<SalaType[]>([]);
    const [selectedCinema, setSelectedCinema] = useState('');
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedSala, setSelectedSala] = useState('');
    const [fetchedMovie, setFetchedMovie] = useState(false);
    const [fetchedSalas, setFetchedSalas] = useState(false);
    const [fetchedCinemas, setFetchedCinemas] = useState(false);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('');
    const tomorrow = (new Date()).getDate() + 1;
    const month = (new Date()).getMonth() + 1;
    const year = (new Date()).getFullYear();
    
    const handleSubmit = () => {
        if(selectedCinema === '' || selectedMovie === '' || selectedSala === '' || date === '' || time === '' || price === '') {
            AlertError({
                title: 'Error',
                description: 'Please fill all fields!'
            });
            return;
        }

        const data = new FormData();
        data.append('id_filme', selectedMovie);
        data.append('id_sala', selectedSala);
        data.append('data', date);
        data.append('hora', time);
        data.append('preco', price);
        
        axios({
            method: 'POST',
            data: data,
            url: `${BACKENDADDRESS}cineticket/sessoes/store`,
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
    }

    useEffect(() => {

        const getMovies = async () => {

            if(backendMovies.length !== 0) return;
    
            const req = await fetch(`${BACKENDADDRESS}cineticket/filmes`);
            const json = await req.json();
    
            if(backendMovies.length === 0) {
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
                });
                setFetchedMovie(true);
            }
        }

        const getCinemas = async () => {
			const req = await fetch(`${BACKENDADDRESS}cineticket/cinemas`);
			const json = await req.json();

			if(cinemas.length === 0) {
                json.map((item: CinemaProps) => {
                    cinemas.push(
                        {
                            ID_CINEMA: item.ID_CINEMA,
                            NOME: item.NOME,
                            LOCALIZACAO: item.LOCALIZACAO
                        }
                    )
                });
                setFetchedCinemas(true);
            }
		}

        getMovies();
        getCinemas();
    }, []);

    useEffect(() => {
        const getSalas = async () => {
            if(selectedCinema === '') return;
            
            const req = await fetch(`${BACKENDADDRESS}cineticket/cinemas/${selectedCinema}/salas`);
			const json = await req.json();

            if(salas.length === 0) {
                json.map((item: SalaType) => {
                    salas.push(
                        {
                            ID_SALA: item.ID_SALA,
                            ID_CINEMA: item.ID_CINEMA,
                            NUMERO: item.NUMERO,
                            CAPACIDADE: item.CAPACIDADE
                        }
                    )
                });
                setFetchedSalas(true);
            }
        }

        getSalas();
    }, [selectedCinema]);

    const handleDateChange = (newDate: string) => {
        setDate(formatDate(strToDate(newDate)));
    }

    return (
        <div className='flex flex-col gap-5'>
            <select
                name="filmes"
                value={selectedMovie}
                onChange={(e) => setSelectedMovie(e.target.value)}
                className='rounded-md'
            >
                <option value=''>Selecione um filme</option>
                {backendMovies.map((item: MovieProps, index) => (
                    <option key={index} value={item.ID_FILME}>{item.TITULO}</option>
                ))}
            </select>

            <input
                type='date' className='rounded-md'
                min={`${year}-${addZeroToDate(month)}-${addZeroToDate(tomorrow)}`}
                onChange={(e) => handleDateChange(e.target.value)}
            />

            <input
                type='time' className='rounded-md'
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />

            <input
                type='number' className='rounded-md'
                placeholder='Introduza o preço' value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            
            <select
                name="cinemas"
                value={selectedCinema}
                onChange={(e) => setSelectedCinema(e.target.value)}
                className='rounded-md'
            >
                <option value=''>Selecione um cinema</option>
                {cinemas.map((item: CinemaProps, index) => (
                    <option key={index} value={item.ID_CINEMA}>{item.NOME}</option>
                ))}
            </select>
            
            {selectedCinema !== '' &&
                (
                    <select
                        name="salas"
                        value={selectedSala}
                        onChange={(e) => setSelectedSala(e.target.value)}
                        className='rounded-md'
                    >
                        <option value=''>Selecione uma sala</option>
                        {salas.map((item: SalaType) => (
                            <option key={item.ID_SALA} value={item.ID_SALA}>{item.NUMERO}</option>
                        ))}
                    </select>
                )
            }

            <button
                className='px-2 py-1 w-full bg-[#B81D24] hover:bg-[#980D14] hover:scale-105 duration-500 text-white rounded-md'
                type='submit'
                onClick={handleSubmit}
            >
                Criar sessão
            </button>
        </div>
    )
}

export default NewSessions;
