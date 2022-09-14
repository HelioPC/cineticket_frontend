import { useState } from "react";
import FloatingAddButton from "../../../components/FloatingAddButton";
import UserList from "../../../components/List/UserList";
import Modal from '../../../components/Modal';
import NewUser from "../../../components/NewUser";

const UsersPage = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className='text-black w-full h-full overflow-visible py-10'>
            <FloatingAddButton onClick={() => setOpen(true)} title='Adicionar filme' />
            <h1>Users</h1>
            <UserList />

            <Modal
                open={open}
                setOpen={setOpen}
                title='Cadastro de funcionários'
            >
                <NewUser setOpen={setOpen} />
            </Modal>
        </div>
    );
}

export default UsersPage;
