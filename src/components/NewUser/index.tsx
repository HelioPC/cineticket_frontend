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

const NewUser = () => {
    const [date, setDate] = useState<Date | null>(new Date());
    const genderItems = [
        { id: 'male', title: 'Male' },
        { id: 'female', title: 'Female' },
        { id: 'other', title: 'Other' },
    ];
    const options = [
        { id: '1', title: 'Development' },
        { id: '2', title: 'Marketing' },
        { id: '3', title: 'Accounting' },
        { id: '4', title: 'HR' },
    ];

    const handleChangeDate = (newDate: Date | null) => {
        setDate(newDate);
    };

    // { name, email, password, gender }: FormValues
    const handleSubmit = () => {}

    return (
        <form onSubmit={handleSubmit} autoComplete='off'>
            <div className='flex sm:flex-row flex-col sm:gap-10 gap-5'>
                <div className='flex flex-col sm:w-1/2 w-full h-full gap-4'>
                    <TextField
                        name="fullName"
                        label="Full Name"
                    />
                    <TextField
                        label="Email"
                        name="email"
                    />
                    <TextField
                        label="Mobile"
                        name="mobile"
                    />
                    <TextField
                        label="City"
                        name="city"
                    />

                    <TextField
                        label="City"
                        name="city"
                    />

                    <TextField
                        label="City"
                        name="city"
                    />

                </div>
                
                <div className='flex flex-col sm:w-1/2 w-full h-full gap-4'>
                    <FormControl>
                        <FormLabel>Gender</FormLabel>
                            <MuiRadioGroup row
                                name='gender'
                                value='Male'
                            >
                                {
                                    genderItems.map(
                                        item => (
                                            <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.title} />
                                        )
                                    )
                                }
                            </MuiRadioGroup>
                    </FormControl>
                    
                    <FormControl variant="outlined">
                        <InputLabel>Department</InputLabel>
                        <Select
                            label='Department'
                            name='departmentId'
                            value=''
                        >
                            <MenuItem value="">None</MenuItem>
                            {
                                options.map(
                                    item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                                )
                            }
                        </Select>
                    </FormControl>

                    <div className='self-end justify-self-end place-self-end'>
                        <Button
                            type="submit"
                        >
                            Submit
                        </Button>
                        
                        <Button>
                            Reset
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default NewUser;
