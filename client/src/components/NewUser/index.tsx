import { useEffect, useState } from 'react';
import {
    TextField
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { BACKENDADDRESS } from '../../data/dummy';
import { CinemaProps } from '../../types';
import { AlertError, AlertSuccess } from '../Alerts';
import { useUser } from '../../contexts/UserContext';
import axios from 'axios';

type FormValues = {
    name: string;
    email: string;
    password: string;
    gender: string;
}

// ID_CINEMA, nivel, my_id

type Props = {
    setOpen: (open: boolean) => void;
}

const NewUser = ({ setOpen }: Props) => {
    const [cinemas, setCinemas] = useState<CinemaProps[]>([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedCinema, setSelectedCinema] = useState('');
    const [level, setLevel] = useState('');
    const [fetchedCinemas, setFetchedCinemas] = useState(false);
    const { user } = useUser();

    useEffect(() => {

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

		getCinemas();
    } , []);

    // { name, email, password, gender }: FormValues
    const handleSubmit = () => {
        if(nome === '' || password === '' || email === '' || level === '' || selectedCinema === '') {
            AlertError({
                title: 'Error',
                description: 'Please fill all fields!'
            });
            return;
        }

        const data = {
            'nome': nome,
            'senha': password,
            'email': email,
            'nivel': level,
            'id_cinema': selectedCinema,
            'id': user.id+''
        }

        axios({
            method: 'POST',
            data: data,
            url: `${BACKENDADDRESS}cineticket/funcionario`,
        })
        .then(function (response) {
            //handle success
            AlertSuccess({
                title: 'Success',
                description: `Utilizador '${nome}' cadastrado com sucesso`,
                confirm: () => {window.location.reload();}
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
        <div>
            <div className='flex flex-col gap-6'>
                <TextField
                    name="fullName"
                    label="Nome"
                    className='my-2'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <TextField
                    name="email"
                    label="E-mail"
                    className='my-2'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    name="fullName"
                    label="Senha"
                    id="outlined-password-input"
                    type='password'
                    className='my-2'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Nível</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={(e) => setLevel(e.target.value)}
                    >
                        <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                        <FormControlLabel value="user" control={<Radio />} label="User" />
                    </RadioGroup>
                </FormControl>

                <div className='w-full'>
                    <button
                        className='px-2 py-1 w-full bg-[#B81D24] hover:bg-[#980D14] hover:scale-105 duration-500 text-white rounded-md'
                        type='submit'
                        onClick={handleSubmit}
                    >
                        Adicionar utilizador
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewUser;
