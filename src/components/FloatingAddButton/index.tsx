import { Tooltip } from '@mui/material';
import { BsPlusCircleFill } from 'react-icons/bs';

type ButtonProps = {
    title: string;
    onClick: () => void;
}

const FloatingAddButton = ({ onClick, title }: ButtonProps) => {
    return (
        <Tooltip title={title} arrow placement='top'>
            <button className='fixed bottom-20 right-20 sm:flex hidden hover:-translate-y-2 duration-500' onClick={onClick}>
                <BsPlusCircleFill size={45} />
            </button>
        </Tooltip>
    );
}

export default FloatingAddButton;