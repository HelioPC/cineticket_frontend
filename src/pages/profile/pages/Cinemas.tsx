import { useEffect, useState } from 'react';
import axios from "axios";
import { BsPlusCircleFill } from 'react-icons/bs';
import { AlertSuccess } from '../../../components/Alerts';
import Modal from '../../../components/Modal';
import NewCinema from '../../../components/NewCinema';
import FloatingAddButton from '../../../components/FloatingAddButton';
import CinemaList from '../../../components/List/CinemaList';
import { Loading } from '../../../components/Utils';
import { Route, Routes } from 'react-router-dom';
import Cinema from './Cinema';

const Cinemas = () => {
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
            <Routes>
                <Route path='/' element={<CinemaList />} />
                <Route path=':id' element={<Cinema />} />
            </Routes>
        </div>
    )
}

export default Cinemas;
