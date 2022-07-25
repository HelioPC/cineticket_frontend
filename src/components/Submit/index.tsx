import axios from "axios";
import { useState, useEffect } from "react";
import { AlertSuccess } from "../Alerts";

// /filmes/store

/* 
useEffect(() => {
      setFilme(
        {
            title: titulo,
            desc: description,
            genero,
            classification,
            ano
        }
      )
    }, [titulo, description, genero, classification, ano]);
*/

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
    const [filme, setFilme] = useState<SubmitProps>();
    

    const handleFinishReport = () => {
        AlertSuccess({
            title: 'Success',
            description: 'Report sent successfully!'
        });
        closeModal();
    }

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

    return (
        <div
            className={`w-screen h-screen top-0 left-0 bottom-0 right-0 fixed bg-[rgba(0,0,0,.78)] m-0 items-center justify-center ${classProp}`}
            onClick={() => closeModal()}
        >
            <div
                className='sm:w-96 w-72 min-h-80 h-auto bg-[#222] text-black p-4 rounded-lg'
                onClick={e => {
                    e.stopPropagation();
                }}
            >
                <h1 className="text-xl">Report post</h1>

                <div className='min-h-60 w-full my-5 flex flex-col'>
                    <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder='titulo' />
                    <input type="text" value={genero} onChange={(e) => setGenero(e.target.value)} placeholder='genero' />
                    <input type="text" value={classification} onChange={(e) => setClassification(e.target.value)} placeholder='class' />
                    <input type="number" value={ano} onChange={(e) => setAno(e.target.value)} placeholder='ano' />
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='desc' />
                </div>

                <div className='flex justify-end w-full'>
                    <button
                        className='mx-5 text-gray-400 cursor-pointer'
                        onClick={() => closeModal()}
                    >
                        CANCEL
                    </button>
                
                    <button
                        className='mx-5 text-blue-400 cursor-pointer'
                        onClick={() => handleSubmit({title: titulo, desc: description, genero, classification, ano})}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Submit;
