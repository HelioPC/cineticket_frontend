import { Tooltip } from '@mui/material';
import { useState } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';
import FloatingAddButton from '../../../components/FloatingAddButton';
import Submit from '../../../components/Submit';

const Movies = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const img = 'https://upload.wikimedia.org/wikipedia/commons/7/7e/User-_Sharky2803.jpg?20170705160600';

    const closeModal = () => {
        setModalOpen(false);
    }
    
    const getMovies = async () => {
        const req = await fetch('http://192.168.43.35/cineticket/filmes');
        const json = await req.json();

        console.log(json);
    }

    return (
        <div className='text-black w-full h-full overflow-visible'>
            <FloatingAddButton onClick={() => setModalOpen(true)} title='Adicionar filme' />

            <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
                <img className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src={img} alt="" width="384" height="512" />
                
                <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                    <blockquote>
                    <p className="text-lg font-medium">
                        “Tailwind CSS is the only framework that I've seen scale
                        on large teams. It's easy to customize, adapts to any design,
                        and the build size is tiny.”
                    </p>
                    </blockquote>
                    <figcaption className="font-medium">
                    <div className="text-sky-500 dark:text-sky-400">
                        Sarah Dayan
                    </div>
                    <div className="text-slate-700 dark:text-slate-500">
                        Staff Engineer, Algolia
                    </div>
                    </figcaption>
                </div>
            </figure>

            <Submit
                closeModal={closeModal}
                classProp={modalOpen ? 'flex' : 'hidden'}
            />
        </div>
    );
}

export default Movies;
