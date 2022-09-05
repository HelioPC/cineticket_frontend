import { TextField } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { AlertSuccess } from "../Alerts";

type ModalProps = {
    children?: React.ReactNode;
    classProp?: string;
    closeModal: () => void;
}

type SubmitProps = {
    title: string;
    desc: string;
    genero: string;
    classification: string;
    ano: string;
}

const Submit = ({ closeModal, classProp }: ModalProps) => {
    const [titulo, setTitulo] = useState('');
    const [genero, setGenero] = useState('');
    const [classification, setClassification] = useState('');
    const [ano, setAno] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = ({ title, desc, genero, classification, ano }: SubmitProps) => {
        const data = new FormData();
        data.append('titulo', title);
        data.append('genero', genero);
        data.append('classificacao', classification);
        data.append('ano', ano);
        data.append('descricao', desc);

        console.log(data.values());

        axios({
            method: 'POST',
            data: data,
            url: 'http://192.168.43.35/cineticket/filme/store',
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(function (response) {
            //handle success
            AlertSuccess({
                title: 'Success',
                description: 'Report sent successfully!'
            });
            closeModal();
            console.log(response);
          })
          .catch(function (response) {
            //handle error
            console.log(response);
          });
    }

    const closeSubmit = () => {
        setTitulo('');
        setGenero('');
        setClassification('');
        setAno('');
        setDescription('');

        closeModal();
    }

    return (
        <div
            className={`w-screen h-screen top-0 left-0 bottom-0 right-0 fixed bg-[rgba(0,0,0,.78)] m-0 items-center justify-center ${classProp}`}
            onClick={() => closeSubmit()}
        >
            <div
                className='sm:w-96 w-72 min-h-80 h-auto bg-[#222] p-4 rounded-lg'
                onClick={e => {
                    e.stopPropagation();
                }}
            >
                <h1 className="text-xl text-white">Report post</h1>

                <div className='min-h-60 w-full my-5 flex flex-col text-white'>
                    <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder='Introduza o título do filme' className="placeholder:text-[#CCC] bg-transparent border-[#AAA] rounded-md my-2" />

                    <select className='bg-transparent border-[#AAA] rounded-md my-2' value={genero} onChange={(e) => setGenero(e.target.value)}>
                        <option value={'0'}
                            style={{
                                display: 'none',
                                visibility: 'hidden',
                                paddingRight: '10px'
                            }}
                        >
                            Selecione o genero
                        </option>
                        <option value="Ação">Ação</option>
                        <option value="Comédia">Comédia</option>
                        <option value="Romance">Romance</option>
                        <option value="Terror">Terror</option>
                        <option value="Documentário">Documentário</option>
                    </select>

                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />

                    <input type="text" value={classification} onChange={(e) => setClassification(e.target.value)} placeholder='Qual a classificação do filme' className="placeholder:text-[#CCC] bg-transparent border-[#AAA] rounded-md my-2" />

                    <input type="number" value={ano} onChange={(e) => setAno(e.target.value)} placeholder='Ano de lançamento' className="placeholder:text-[#CCC] bg-transparent border-[#AAA] rounded-md my-2" min={1930} max={2022} />

                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Descrição do filme' className="placeholder:text-[#CCC] bg-transparent border-[#AAA] rounded-md my-2" />
                </div>

                <div className='flex justify-end w-full'>
                    <button
                        className='mx-5 text-gray-400 cursor-pointer'
                        onClick={() => closeSubmit()}
                    >
                        CANCEL
                    </button>
                
                    <button
                        className='mx-5 text-blue-400 cursor-pointer'
                        onClick={() => handleSubmit({title: titulo, desc: description, genero, classification, ano})}
                    >
                        ADD
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Submit;
