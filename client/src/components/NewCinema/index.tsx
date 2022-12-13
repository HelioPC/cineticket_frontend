import { useEffect, useState } from 'react';
import {
    TextField, FormControl, FormLabel, RadioGroup as MuiRadioGroup,
    FormControlLabel, Radio, Select, MenuItem, InputLabel, Button
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import { Loading } from '../Utils';
import { AlertError, AlertSuccess } from '../Alerts';
import { BACKENDADDRESS } from '../../data/dummy';

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
}

const NewCinema = ({ cidades, ruas, setOpen }: NewCinemaProps) => {
    const [cidade, setCidade] = useState('1');
    const [rua, setRua] = useState('');
    const [ruasFiltered, setRuasFiltered] = useState<RuaProps[]>([]);
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

        const data = {
            'nome': name,
            'id_rua': rua
        }

        axios({
            method: 'POST',
            data: data,
            url: `${BACKENDADDRESS}cineticket/cinema`,
        })
        .then(function (response) {
            //handle success
            if(response.data.status === 'sucesso') {
                AlertSuccess({
                    title: 'Successo',
                    description: `Cinema ${name} criado com sucesso`,
                    confirm: () => window.location.reload()
                });
            } else {
                AlertError({
                    title: 'Erro',
                    description: 'Falha na requisição com Cineticket API',
                    confirm: () => window.location.reload()
                });
            }
            console.log(response);
          })
          .catch(function (response) {
            //handle error
            AlertError({
                title: 'Erro',
                description: 'Erro inesperado 🥲',
                confirm: () => window.location.reload()
            });
            console.log(response);
          });
        setOpen(false);
    }

    // Get the value from select
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setCidade(e.target.value);
    }

    // Get the value from select rua
    const handleSelectRua = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setRua(e.target.value);
    }

    // When `cidade` changes, filter the ruas by the cidade
    useEffect(() => {
        if(cidade !== '') {
            const ruasFiltered = ruas.filter(rua => rua.ID_CIDADE.toString() === cidade);
            console.log(ruas);
            setRuasFiltered(ruasFiltered);
        }
    } , [cidade]);

    useEffect(() => {
        if(ruasFiltered.length !== 0) {
            setRua(ruasFiltered[0].ID_RUA);
        }
    }, [ruasFiltered]);

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
                {cidades.map((cidade, index) => (
                    <option key={index} value={cidade.ID_CIDADE}>{cidade.NOME}</option>
                ))}
            </select>

            {ruasFiltered.length > 0 && (
                <select name="rua" onChange={(e) => handleSelectRua(e)} className='rounded-md'>
                    {ruasFiltered.map((rua, index) => (
                        <option key={index} value={rua.ID_RUA}>{rua.NOME}</option>
                    ))}
                </select>
            )}

            <div className='w-full'>
                <button
                    className='px-2 py-1 w-full bg-[#B81D24] hover:bg-[#980D14] hover:scale-105 duration-500 text-white rounded-md'
                    type='submit'
                    onClick={handleSubmit}
                >
                    Adicionar cinema
                </button>
            </div>
        </div>
    );
}

export default NewCinema;
