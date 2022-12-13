import { TextField } from "@mui/material";
import { useState } from "react";

type CinemaProps = {
	ID_CINEMA: string;
	NOME: string;
	LOCALIZACAO: string;
}

const EditCinema = ({ ID_CINEMA, NOME, LOCALIZACAO }: CinemaProps) => {
    const [open, setOpen] = useState(false);
	const [id, setId] = useState(ID_CINEMA);
	const [name, setName] = useState(NOME);
	const [localization, setLocalization] = useState(LOCALIZACAO);
	const options = [
        { id: '1', title: 'Luanda' },
        { id: '2', title: 'Benguela' },
        { id: '3', title: 'Huambo' },
        { id: '4', title: 'Namibe' },
    ];
    
    const handleSubmit = () => {}

    return (
        <div className='flex flex-col gap-5'>
            <div className='w-full flex items-center'>
                <p className='font-bold'>{id}</p>
                <p className='font-bold'>{name}</p>
            </div>

            <TextField
                label='Nome'
                value={name}
                onChange={(event) => setName(event.target.value)}
                className='mt-2'
            />

			<TextField
				label='Localização'
				value={localization}
				onChange={(event) => setLocalization(event.target.value)}
				className='mt-2'
			/>

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

export default EditCinema