import {
    RadioGroup as MuiRadioGroup
} from '@mui/material';
import Select, { StylesConfig, SingleValue } from "react-select";

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BACKENDADDRESS } from '../../data/dummy';
import { strToDate, addZeroToDate, formatDate } from '../../helpers/date';
import { CinemaProps, MovieProps } from '../../types';
import { AlertError, AlertSuccess } from '../Alerts';
import { Loading } from '../Utils';
import { useUser } from '../../contexts/UserContext';

type SalaType = {
    ID_SALA: string;
    NUMERO: string;
    ID_CINEMA: string;
    CAPACIDADE: string;
}

type Props = {
    setOpen: (open: boolean) => void;
}

const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
        backgroundColor: color,
        borderRadius: 10,
        content: '" "',
        display: 'block',
        marginRight: 8,
        height: 10,
        width: 10,
    },
});

const colourStyles: StylesConfig<MovieProps> = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isDisabled
                ? undefined
                : isSelected
                    ? "#780b11"
                    : isFocused
                        ? "rgba(70,0,0,.5)"
                        : undefined,
            color: isDisabled
                ? '#ccc'
                : isSelected
                    ? "white"
                    : isFocused
                        ? "white"
                        : "black",
            cursor: isDisabled ? 'not-allowed' : 'default',

            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled
                    ? isSelected
                        ? ""
                        : ""
                    : undefined,
            },
        };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
};

const NewSessions = ({ setOpen }: Props) => {
    const { user } = useUser();
    const [cinemas, setCinemas] = useState<CinemaProps[]>([]);
    const [backendMovies, setBackendMovies] = useState<MovieProps[]>([]);
    const [salas, setSalas] = useState<SalaType[]>([]);
    const [selectedCinema, setSelectedCinema] = useState(user.id_cinema);
    const [selectedMovie, setSelectedMovie] = useState<SingleValue<MovieProps>>();
    const [selectedSala, setSelectedSala] = useState('');
    const [allFields, setAllFields] = useState(false);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('1000');
    const tomorrow = (new Date()).getDate() + 1;
    const month = (new Date()).getMonth() + 1;
    const year = (new Date()).getFullYear();
    
    const handleSubmit = () => {
        if(selectedCinema === '' || selectedMovie === null || selectedMovie === undefined || selectedSala === '' || date === '' || time === '' || price === '' || parseInt(price) < 1000) {
            return;
        }

        const data = {
            'filme': selectedMovie.id_filme,
            'sala': selectedSala,
            'horario': date + ' ' + time + ':00',
            'price': price
        }

        console.table(data)
        
        axios({
            method: 'POST',
            data: data,
            url: `${BACKENDADDRESS}cineticket/sessions`,
        })
        .then(function (response) {
            //handle success
            if(response.data.status === 'sucesso') {
                AlertSuccess({
                    title: 'Successo',
                    description: `Sessão criada com sucesso ✅`,
                    confirm: () => window.location.reload()
                });
            } else {
                if(response.data.message === 'timeout') {
                    AlertError({
                        title: 'Bloqueio',
                        description: 'Já existe uma sessão marcada dentro deste horário ⛔️',
                        confirm: () => window.location.reload()
                    });
                } else {
                    AlertError({
                        title: 'Erro',
                        description: response.data.message,
                        confirm: () => window.location.reload()
                    });
                }
            }
            console.log(response);
          })
          .catch(function (response) {
            //handle error
            AlertError({
                title: 'Erro',
                description: response.response.data.message,
                confirm: () => window.location.reload()
            });
            console.log(response);
          });
        setOpen(false);
    }

    useEffect(() => {

        const getMovies = async () => {

            if(backendMovies.length !== 0) return;
    
            const req = await fetch(`${BACKENDADDRESS}cineticket/filmes`);
            const json = await req.json();
    
            if(backendMovies.length === 0) {
                json.data.map((item: MovieProps) => {
                    setBackendMovies((movies => [...movies, item]));
                });
            }
        }

        const getCinemas = async () => {
			const req = await fetch(`${BACKENDADDRESS}cineticket/cinemas`);
			const json = await req.json();

			if(cinemas.length === 0) {
                json.data.map((item: CinemaProps) => {
                    setCinemas((cinemas => [...cinemas, item]));
                });
            }
		}

        getMovies();
        getCinemas();
    }, []);

    useEffect(() => {
        const getSalas = async () => {
            if(selectedCinema === '') return;
            
            const req = await fetch(`${BACKENDADDRESS}cineticket/salas/cinema/${selectedCinema}`);
			const json = await req.json();

            setSalas([]);
            json.data.map((item: SalaType) => {
                setSalas((salas) => [...salas, item]);
            });
        }

        getSalas();
    }, [selectedCinema]);

    useEffect(() => {
        if(!(selectedCinema === '' || selectedMovie === undefined || selectedSala === '' || date === '' || time === '' || price === '')) {
            setAllFields(true);
        } else {
            setAllFields(false);
        }
    }, [selectedCinema, selectedMovie, selectedSala, price, time, date]);

    const handleDateChange = (newDate: string) => {
        setDate(formatDate(strToDate(newDate)));
    }

    return (
        <div className='flex flex-col gap-5'>
            <Select
                placeholder="Selecione um filme"
                options={backendMovies}
                getOptionLabel={(movie: MovieProps) => movie.titulo}
                getOptionValue={(movie: MovieProps) => movie.id_filme}
                value={selectedMovie}
                onChange={(e) => setSelectedMovie(e)}
                openMenuOnFocus={true}
                isMulti={false}
                styles={colourStyles}
                className="w-full"
            />

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
                min={0}
                max={10000}
                placeholder='Introduza o preço' value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            
            {user.nivel === 'admin' &&
                (
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
                )
            }
            
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
                className={`
                    px-2 py-1 w-full duration-500 text-white rounded-md
                    ${
                        allFields ?
                        'bg-[#B81D24] hover:bg-[#980D14] hover:scale-105':
                        'bg-[#AAA] cursor-not-allowed'
                    }
                `}
                type='submit'
                onClick={handleSubmit}
            >
                Criar sessão
            </button>
        </div>
    )
}

export default NewSessions;
