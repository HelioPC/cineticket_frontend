import { useEffect, useState } from 'react';
import {
    TextField, FormControl, FormLabel, RadioGroup as MuiRadioGroup,
    FormControlLabel, Radio, Select, MenuItem, InputLabel, Button
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import { Loading } from '../Utils';
import { AlertError, AlertSuccess } from '../Alerts';

type FormValues = {
    name: string;
    email: string;
    password: string;
    gender: string;
}

type CidadeProps = {
    ID_CIDADE: string;
    NOME: string;
}

type RuaProps = {
    ID_RUA: string;
    ID_CIDADE: string;
    NOME: string;
}

type NewCinemaProps = {
    setOpen: (open: boolean) => void;
    cidades: CidadeProps[];
    ruas: RuaProps[];
    setCidade: (cidade: string) => void;
}

const NewCinema = ({ cidades, ruas, setOpen, setCidade }: NewCinemaProps) => {
    const [cidade, setCidade1] = useState('1');
    const [rua, setRua] = useState('');
    const [ruasFiltered, setRuasFiltered] = useState<RuaProps[]>([]);
    const [ruas1, setRuas1] = useState<RuaProps[]>([]);
    const [name, setName] = useState('');

    // Submit form
    const handleSubmit = () => {
        if(name === '' || rua === '') {
            AlertError({
                title: 'Erro',
                description: 'Preencha todos os campos para continuar'
            });
            setOpen(false);
            return;
        }

        const data = new FormData();
        data.append('nome', name);
        data.append('id_rua', rua);

        axios({
            method: 'POST',
            data: data,
            url: 'http://192.168.43.35/cineticket/cinemas/store',
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

    // Get the value from select
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setCidade(e.target.value);
        setCidade1(e.target.value);
    }

    // Get the value from select rua
    const handleSelectRua = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setRua(e.target.value);
    }

    // When `cidade` changes, filter the ruas by the cidade
    useEffect(() => {
        if(cidade !== '') {
            const ruasFiltered = ruas.filter(rua => rua.ID_CIDADE === cidade);
            setRuasFiltered(ruasFiltered);
        }
    } , [cidade]);

    //if(cidades.length < 1) return <Loading text='Connecting' />;
    if(cidades.length < 1) return (<Loading text='Carregando cinemas' />);

    return (
        <div className='flex flex-col gap-6'>
            <TextField
                name="fullName"
                label="Name"
                className='my-2'
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <select name="cidade" onChange={(e) => handleSelect(e)} className='rounded-md'>
                {cidades.map(cidade => (
                    <option key={cidade.ID_CIDADE} value={cidade.ID_CIDADE}>{cidade.NOME}</option>
                ))}
            </select>

            {ruasFiltered.length > 0 && (
                <select name="rua" onChange={(e) => handleSelectRua(e)} className='rounded-md'>
                    {ruasFiltered.map(rua => (
                        <option key={rua.ID_RUA} value={rua.ID_RUA}>{rua.NOME}</option>
                    ))}
                </select>
            )}

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
    );
}

export default NewCinema;
