import { TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { AlertError, AlertSuccess } from "../../../components/Alerts";
import Modal from "../../../components/Modal";
import { UserActions, useUser } from "../../../contexts/UserContext";
import { BACKENDADDRESS } from "../../../data/dummy";

type Props = {
    setOpen: (open: boolean) => void;
}

const ChangeData = ({ setOpen }: Props) => {
    const { user, dispatch } = useUser();
    const [nome, setNome] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const handleSubmit = () => {
        if (nome === user.name && email === user.email) {
            AlertError({
                title: "Error",
                description: "Sem dados alterados"
            });
            setOpen(false);
            return;
        } else if (nome === '' || email === '') {
            AlertError({
                title: "Error",
                description: `Faltou preencher os seguintes campos: ${nome === '' ? 'nome' : ''} ${email === '' ? ' e e-mail' : ''}`
            });
            setOpen(false);
            return;
        } else {
            const data = new FormData();
            data.append('nome', nome);
            data.append('email', email);
            data.append("id", user.id + '');

            axios({
                method: 'POST',
                data: data,
                url: `${BACKENDADDRESS}cineticket/perfil/update`,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    //handle success
                    if (response.data.status === 'sucesso') {
                        user.name = nome;
                        user.email = email;

                        dispatch({
                            type: UserActions.setUser,
                            payload: user
                        });

                        const profile = JSON.parse(localStorage.getItem('userCineticketUAN2022') ?? '');

                        profile['name'] = nome;
                        profile['email'] = email;
                        localStorage.setItem('userCineticketUAN2022', JSON.stringify(profile));

                        AlertSuccess({
                            title: 'Success',
                            description: `Dados do utilizador '${nome}' alterado com sucesso`,
                            confirm: () => window.location.reload()
                        });
                    } else {
                        AlertError({
                            title: "Error",
                            description: "Ocorreu um erro inesperado! 😭",
                            confirm: () => window.location.reload()
                        });
                    }
                    console.log(response);
                })
                .catch(function (response) {
                    AlertError({
                        title: "Error",
                        description: "Ocorreu um erro inesperado! 😭"
                    });
                    console.log(response);
                });
            setOpen(false);
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <TextField
                name="fullName"
                label="Nome"
                className='my-2'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />

            <TextField
                name="email"
                label="E-mail"
                className='my-2'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <div className='w-full'>
                <button
                    className='px-2 py-1 w-full bg-[#B81D24] hover:bg-[#980D14] hover:scale-105 duration-500 text-white rounded-md'
                    type='submit'
                    onClick={handleSubmit}
                >
                    Alterar
                </button>
            </div>
        </div>
    );
}

const ChangePassword = ({ setOpen }: Props) => {
    const { user, dispatch } = useUser();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [differentPassword, setDifferentPassword] = useState(false);

    // perfil/change_password

    const handleSubmit = () => {
        if (oldPassword !== user.password) {
            AlertError({
                title: "Error",
                description: 'Forneça a sua senha'
            });
            setOpen(false);
            return;
        } else if (oldPassword === newPassword) {
            setDifferentPassword(true);
            return;
        } else {
            const data = new FormData();
            data.append('new_password', newPassword);
            data.append("id", user.id + '');

            axios({
                method: 'POST',
                data: data,
                url: `${BACKENDADDRESS}cineticket/perfil/change_password`,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    //handle success

                    console.log(response.data.status);
                    if (response.data.status === 'sucesso') {
                        user.password = newPassword;

                        dispatch({
                            type: UserActions.setUser,
                            payload: user
                        });

                        const profile = JSON.parse(localStorage.getItem('userCineticketUAN2022') ?? '');

                        profile['password'] = newPassword;
                        localStorage.setItem('userCineticketUAN2022', JSON.stringify(profile));

                        AlertSuccess({
                            title: 'Success',
                            description: `Senha de '${user.name}' alterada com sucesso`,
                            confirm: () => window.location.reload()
                        });
                    } else {
                        AlertError({
                            title: "Error",
                            description: "Ocorreu um erro inesperado! 😭",
                            confirm: () => window.location.reload()
                        });
                    }
                })
                .catch(function (response) {
                    AlertError({
                        title: "Error",
                        description: "Ocorreu um erro inesperado! 😭"
                    });
                    console.log(response);
                });
            setOpen(false);
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between">
                <TextField
                    name="oldPassword"
                    label="Senha antiga"
                    type='password'
                    className='my-2'
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />

                <TextField
                    name="newPassword"
                    label="Nova senha"
                    type='password'
                    className='my-2'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>

            <div className='w-full'>
                <button
                    className='px-2 py-1 w-full bg-[#B81D24] hover:bg-[#980D14] hover:scale-105 duration-500 text-white rounded-md'
                    type='submit'
                    onClick={handleSubmit}
                >
                    ALTERAR
                </button>
            </div>
        </div>
    );
}

const Edit = () => {
    const { user } = useUser();
    const [openChange, setOpenChange] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);

    return (
        <div className="text-black w-full h-full overflow-visible py-10">
            <div className="bg-white min-h-[96px] w-full shadow-xl rounded-lg border-b-2 border-red-900 flex flex-col p-5">
                <div className="flex items-center gap-5">
                    <h1 className="font-bold text-lg">{user.name}</h1>
                    <span className="bg-green-300 p-2 rounded-lg">{user.nivel}</span>
                </div>
                <span className="text-sm">{user.email}</span>
            </div>

            <div className="mt-20 flex justify-center gap-20">
                <button
                    className="hover:scale-105 duration-500 px-3 py-2 bg-red-900 text-white rounded-md"
                    onClick={() => setOpenChange(true)}
                >
                    Editar dados
                </button>
                <button
                    className="hover:scale-105 duration-500 px-3 py-2 bg-black text-white rounded-md"
                    onClick={() => setOpenPassword(true)}
                >
                    Alterar Senha
                </button>
            </div>

            <Modal
                open={openChange}
                setOpen={setOpenChange}
                title="Alteração dos dados"
            >
                <ChangeData setOpen={setOpenChange} />
            </Modal>

            <Modal
                open={openPassword}
                setOpen={setOpenPassword}
                title="Alteração da senha"
            >
                <ChangePassword setOpen={setOpenPassword} />
            </Modal>
        </div>
    );
}

export default Edit;
