import { useState } from 'react';
import {
    TextField, FormControl, FormLabel, RadioGroup as MuiRadioGroup,
    FormControlLabel, Radio, Select, MenuItem, InputLabel, Button
} from '@mui/material';

type FormValues = {
    name: string;
    email: string;
    password: string;
    gender: string;
}

const NewCinema = () => {
    const [date, setDate] = useState<Date | null>(new Date());
    const genderItems = [
        { id: 'male', title: 'Male' },
        { id: 'female', title: 'Female' },
        { id: 'other', title: 'Other' },
    ];
    const options = [
        { id: '1', title: 'Luanda' },
        { id: '2', title: 'Benguela' },
        { id: '3', title: 'Huambo' },
        { id: '4', title: 'Namibe' },
    ];

    const handleChangeDate = (newDate: Date | null) => {
        setDate(newDate);
    };

    // { name, email, password, gender }: FormValues
    const handleSubmit = () => {}

    return (
        <form onSubmit={handleSubmit} autoComplete='off'>
            <div className='flex flex-col gap-3'>
                    <TextField
                        name="fullName"
                        label="Full Name"
                    />

                    <FormControl variant="outlined">
                        <InputLabel>Cidade</InputLabel>
                        <Select
                            label='Department'
                            name='departmentId'
                            value=''
                        >
                            {
                                options.map(
                                    item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                                )
                            }
                        </Select>
                    </FormControl>

                    <div className='w-full'>
                        <button
                            className='px-2 py-1 w-full bg-[#B81D24] hover:bg-[#980D14] hover:scale-105 duration-500 text-white rounded-md'
                            type='submit'
                        >
                            SUBMIT
                        </button>
                    </div>
            </div>
        </form>
    );
}

export default NewCinema;