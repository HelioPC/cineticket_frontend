import { useState } from 'react';
import axios from "axios";
import { BsPlusCircleFill } from 'react-icons/bs';
import { AlertSuccess } from '../../../components/Alerts';

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

const Cinema = () => {
    const getCinemas = async () => {
        const req = await fetch('http://192.168.43.35/cineticket/cinemas');
        const json = await req.json();

        console.log(json);
    }

    const handleSubmit = () => {
        const data = new FormData();
        data.append('nome', 'paraíso');
        data.append('id_rua', '1');

        console.log(data.values());

        axios({
            method: 'POST',
            data: data,
            url: 'http://192.168.43.35/cineticket/cinemas/store',
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
    }
    
    return (
        <div className='text-black'>
            <FloatingActionButton onClick={getCinemas} />
            <h1>Cinema</h1>

            <button
                className='bg-red-800 px-2 py-1 rounded text-white'
                onClick={handleSubmit}
            >
                Get Cinema's info
            </button>
        </div>
    )
}

export default Cinema;
