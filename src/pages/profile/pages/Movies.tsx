import { useState } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';
import Submit from '../../../components/Submit';

type ButtonProps = {
    onClick: () => void;
    className?: string;
}

const FloatingActionButton = ({ onClick }: ButtonProps) => {
    return (
        <button className='fixed bottom-20 right-20 sm:flex hidden hover:-translate-y-4 duration-500' onClick={onClick}>
            <BsPlusCircleFill size={45} />
        </button>
    );
}

const Movies = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    }
    
    const getMovies = async () => {
        const req = await fetch('http://192.168.43.35/cineticket/filmes');
        const json = await req.json();

        console.log(json);
    }

    return (
        <div className='text-black'>
            <FloatingActionButton
                onClick={() => setModalOpen(true)}
            />
            
            <h1>Movies</h1>

            <button
                className='bg-red-800'
                onClick={getMovies}
            >
                Get movies
            </button>

            <Submit
                closeModal={closeModal}
                classProp={modalOpen ? 'flex' : 'hidden'}
            />
        </div>
    );
}

export default Movies;
