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
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');

    
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
        if (title === '' || image === '' || description === '' || year === '' || genre === '' || selectOption === '') {
            AlertError({
                title: 'Erro',
                description: 'Preencha todos os campos para continuar'
            })
            return;
        }

        // Check if the year is valid
        if (year.length !== 4) {
            AlertError({
                title: 'Erro',
                description: 'Ano inválido'
            })
            return;
        }

        const data = new FormData();
        data.append('titulo', title);
        data.append('ano', year);
        data.append('descricao', description);
        data.append('genero', genre);
        data.append('capa', image);
        data.append('classificacao', selectOption);
    
        console.log(data.values());
    
        axios({
            method: 'POST',
            data: data,
            url: `${BACKENDADDRESS}cineticket/filmes/store`,
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
    const handleSelect = (e: SelectChangeEvent<string>) => {
        e.preventDefault();
        setSelectOption(e.target.value);
    }

    return (
        <div>
            <div className='flex flex-col gap-6'>
                <TextField
                    name="fullName"
                    label="Título"
                    className='my-2'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <TextField
                    name="fullName"
                    label="URL da imagem"
                    className='my-2'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />

                <TextField
                    name="fullName"
                    label="Ano de lançamento"
                    type='number'
                    className='my-2'
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
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
                                item => (<MenuItem key={item.id} value={item.title}>{item.title}</MenuItem>)
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
                        <FormControlLabel value="action" control={<Radio />} label="Ação" />
                        <FormControlLabel value="comedy" control={<Radio />} label="Comédia" />
                        <FormControlLabel value="drama" control={<Radio />} label="Drama" />
                        <FormControlLabel value="horror" control={<Radio />} label="Horror" />
                        <FormControlLabel value="romance" control={<Radio />} label="Romance" />
                        <FormControlLabel value="thriller" control={<Radio />} label="Suspense" />
                        <FormControlLabel value="war" control={<Radio />} label="Guerra" />
                        <FormControlLabel value="western" control={<Radio />} label="Western" />
                    </RadioGroup>
                </FormControl>

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
        </div>
    );
}

export default NewMovie;
