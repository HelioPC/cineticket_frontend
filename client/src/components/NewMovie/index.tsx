import { useState } from 'react';
import axios from 'axios';
import {
    TextField, FormControl, FormLabel, RadioGroup as MuiRadioGroup,
    Radio, Select, MenuItem, InputLabel, TextareaAutosize
} from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SelectChangeEvent } from '@mui/material/Select';
import { AlertError, AlertSuccess } from '../Alerts'
import { BACKENDADDRESS } from '../../data/dummy';

type Props = {
    setOpen: (open: boolean) => void;
}

const NewMovie = ({ setOpen }: Props) => {
    const [selectOption, setSelectOption] = useState('');
    const [year, setYear] = useState('1960');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [duration, setDuration] = useState('90');

    
    const options = [
        { id: '1', title: '7' },
        { id: '2', title: '12' },
        { id: '3', title: '14' },
        { id: '4', title: '16' },
        { id: '5', title: '18' }
    ];

    // { name, email, password, gender }: FormValues
    const handleSubmit = () => {
        // Check if all fields aren't filled
        if (title === '' || image === '' || description === '' || year === '' || genre === '' || selectOption === '' || duration === '') {
            AlertError({
                title: 'Erro',
                description: 'Preencha todos os campos para continuar'
            });
            setOpen(false);
            return;
        }

        // Check if the year is valid
        if (year.length !== 4) {
            AlertError({
                title: 'Erro',
                description: 'Ano inválido'
            });
            setOpen(false);
            return;
        }

        const data = {
            'titulo': title,
            'ano': year,
            'duracao': duration,
            'descricao': description,
            'genero': genre,
            'capaUrl': image,
            'classificacao': selectOption,
        }
    
        axios({
            method: 'POST',
            data: data,
            url: `${BACKENDADDRESS}cineticket/filmes`,
        })
        .then(function (response) {
            //handle success
            if(response.data.status === 'sucesso') {
                AlertSuccess({
                    title: 'Successo',
                    description: `Filme ${title} criado com sucesso`,
                    confirm: () => window.location.reload()
                });
            } else {
                AlertError({
                    title: 'Erro',
                    description: 'Falha na requisição com Cineticket API ⛔️',
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
    const handleSelect = (e: SelectChangeEvent<string>) => {
        e.preventDefault();
        setSelectOption(e.target.value);
    }

    const handleYear = (e: any) => {
        const newValue = Math.min(Math.max(e.target.value, 1930), 2022);
        setYear(previousValue => newValue+'');
    }

    const handleDuration = (e: any) => {
        const newValue = Math.min(Math.max(e.target.value, 65), 280);
        setDuration(previousValue => newValue+'');
    }

    return (
        <div>
            <div className='flex flex-col gap-6'>
                <TextField
                    name="title"
                    label="Título"
                    className='my-2'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

            <TextField
                name="duration"
                label="Duração (em minutos)"
                className='my-2 w-full'
                type='number'
                value={duration}
                onChange={handleDuration}
            />

                <TextField
                    name="image"
                    label="URL da imagem"
                    className='my-2'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />

                <TextField
                    name="year"
                    label="Ano de lançamento"
                    type='number'
                    className='my-2'
                    value={year}
                    onChange={handleYear}
                />

                <TextareaAutosize
                    aria-label="minimum height"
                    placeholder="Descrição"
                    maxLength={250}
                    className='my-2'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />


                <FormControl variant="outlined">
                    <InputLabel>Classificação</InputLabel>
                    <Select
                        label='Department'
                        name='departmentId'
                        value={selectOption}
                        onChange={handleSelect}
                    >
                        {
                            options.map(
                                item => (<MenuItem key={item.title} value={item.title}>{item.title}</MenuItem>)
                            )
                        }
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label" className='!text-[#000]'>Gender</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="action"
                        name="gender"
                        row
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    >
                        <FormControlLabel value="Action" control={<Radio />} label="Ação" />
                        <FormControlLabel value="Comedy" control={<Radio />} label="Comédia" />
                        <FormControlLabel value="Drama" control={<Radio />} label="Drama" />
                        <FormControlLabel value="Horror" control={<Radio />} label="Horror" />
                        <FormControlLabel value="Romance" control={<Radio />} label="Romance" />
                        <FormControlLabel value="Thriller" control={<Radio />} label="Suspense" />
                        <FormControlLabel value="War" control={<Radio />} label="Guerra" />
                        <FormControlLabel value="Western" control={<Radio />} label="Western" />
                    </RadioGroup>
                </FormControl>

                <div className='w-full'>
                    <button
                        className='px-2 py-1 w-full bg-[#B81D24] hover:bg-[#980D14] hover:scale-105 duration-500 text-white rounded-md'
                        type='submit'
                        onClick={handleSubmit}
                    >
                        Criar filme
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewMovie;
