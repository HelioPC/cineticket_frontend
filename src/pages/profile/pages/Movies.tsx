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
    return (
        <div className='text-black'>
            <FloatingActionButton
                onClick={() => setModalOpen(true)}
            />
            
            <h1>Movies</h1>

            <Submit
                closeModal={closeModal}
                classProp={modalOpen ? 'flex' : 'hidden'}
            />
        </div>
    );
}

export default Movies;
