import { Tooltip } from '@mui/material';
import { useState } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';
import FloatingAddButton from '../../../components/FloatingAddButton';
import { MoviesList } from '../../../components/List/MoviesList';
import Modal from '../../../components/Modal';
import NewMovie from '../../../components/NewMovie';
import Submit from '../../../components/Submit';

const Movies = () => {
    const [open, setOpen] = useState(false);
    const img = 'https://upload.wikimedia.org/wikipedia/commons/7/7e/User-_Sharky2803.jpg?20170705160600';

    const closeModal = () => {
        setOpen(false);
    }
    
    const getMovies = async () => {
        const req = await fetch('http://192.168.43.35/cineticket/filmes');
        const json = await req.json();

        console.log(json);
    }

    return (
        <div className='text-black w-full h-full overflow-visible py-10'>
            <FloatingAddButton onClick={() => setOpen(true)} title='Adicionar filme' />

            <MoviesList />

            <Modal
                open={open}
                setOpen={setOpen}
                title='Formulário de Filme'
            >
                <NewMovie setOpen={setOpen} />
            </Modal>
        </div>
    );
}

export default Movies;
