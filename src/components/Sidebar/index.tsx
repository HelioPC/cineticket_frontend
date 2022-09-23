// React hooks
import { useEffect, useState } from 'react';
// React router dom
import { NavLink, useNavigate } from 'react-router-dom';
// React Icons
import { AiOutlineClose, AiOutlineAudit } from 'react-icons/ai';
import { BsReverseLayoutTextSidebarReverse, BsClockFill } from 'react-icons/bs';
import { FaTheaterMasks } from 'react-icons/fa';
import { FiMenu, FiUsers } from 'react-icons/fi';
import { ImProfile } from 'react-icons/im';
import { MdKeyboardArrowLeft, MdLocalMovies, MdLogout } from 'react-icons/md';
// Auxiliary functions
import { useWindowDimensions } from '../../helpers/dimensions';
// Assets
import { Logo2 } from '../Logo';
import { UserActions, useUser } from '../../contexts/UserContext';

type HeaderProps = {
    classProp?: string;
    open: boolean;
    name: string;
    onClick: () => void;
}

const SidebarHeader = ({ open, name, onClick }: HeaderProps) => {
    const { user } = useUser();

    return (
        <div className={`flex gap-x-4 items-center`}>
            <>
                <div
                    className={`cursor-pointer duration-500 w-10 rounded-lg hover:rotate-[360deg]`}
                    onClick={onClick}
                >
                    <Logo2 />
                </div>
                
                <div>
                    <h1
                        className={`
                            text-white text-xl font-medium origin-left
                            duration-300 ${!open && "scale-0"}
                        `}
                    >
                        {name}
                    </h1>
                    <p className={`text-[#AAA] text-[12px] duration-300 ${!open && "scale-0"}`}>
                        {user.nivel}
                    </p>
                </div>
            </>
        </div>
    );
}

const Sidebar = () => {
    const iconSize = 20;
    const { user, dispatch } = useUser();
    const [open, setOpen] = useState(true);
    const [toggleMenu, setToggleMenu] = useState(false);
    const { width } = useWindowDimensions();
    const navigate = useNavigate();
    var menu = [
        {title: `Eu ${user.name}`, icon: <ImProfile size={iconSize - 3} />, link: `/profile/${user.name.toLowerCase().replaceAll(' ', '')}/me`},
        {title: 'Filmes', icon: <MdLocalMovies size={iconSize} />, link: `/profile/${user.name.toLowerCase().replaceAll(' ', '')}/movies`},
        {title: 'Reservas', icon: <BsReverseLayoutTextSidebarReverse size={iconSize - 3} />, link: `/profile/${user.name.toLowerCase().replaceAll(' ', '')}/reservations`},
        {title: 'Sessões', icon: <BsClockFill size={iconSize - 3} />, link: `/profile/${user.name.toLowerCase().replaceAll(' ', '')}/session`}
    ];

    if(user.nivel === 'admin') {
        menu.shift();
        menu.unshift(
            {title: 'Meu Cinema', icon: <FaTheaterMasks size={iconSize} />, link: `/profile/${user.name.toLowerCase().replaceAll(' ', '')}/cinemas`},
            {title: 'Funcionários', icon: <FiUsers size={iconSize - 3} />, link: `/profile/${user.name.toLowerCase().replaceAll(' ', '')}/users`},
            {title: 'Auditoria', icon: <AiOutlineAudit size={iconSize - 3} />, link: `/profile/${user.name.toLowerCase().replaceAll(' ', '')}/auditoria`},
        );
        menu.unshift(
            {title: `Eu ${user.name}`, icon: <ImProfile size={iconSize - 3} />, link: `/profile/${user.name.toLowerCase().replaceAll(' ', '')}/me`}
        );
    }

    useEffect(() => {
        if (width < 666) {
            setOpen(false);
        }
    }, [width]);

    const handleLogout = () => {
        localStorage.removeItem('userCineticketUAN2022');
        dispatch({
            type: UserActions.clearUser,
            payload: null
        });
        window.location.reload();
    }

    return (
        <>
            <aside
                className={`
                    ${open ? "w-72" : "w-20"}
                    ${width < 666 ? 'hidden' : ''}
                    p-5 pt-8 bg-black h-screen relative
                `}
            >
                <MdKeyboardArrowLeft
                    className={`
                        absolute cursor-pointer -right-3 top-9 bg-white
                        rounded-full border-[#2b0f0f] border-2
                        ${!open && "rotate-180"}
                    `}
                    color='#02044A'
                    size={30}
                    onClick={() => setOpen(!open)}
                />

                <SidebarHeader open={open} name={user.name} onClick={() => navigate(`/profile/${user.email.replaceAll(' ', '')}`)} />

                <ul className='pt-6'>
                    {menu.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                to={item.link}
                                className={
                                    ({ isActive }) => (
                                        `
                                            flex items-center gap-x-4 p-2 text-sm
                                            rounded-md text-gray-300 hover:bg-[#b81d1d]
                                            hover:text-white mt-2
                                        ` + (isActive ? 'bg-[#A40910]' : '')
                                    )
                                }
                            >
                                {item.icon}
                                <span className={`${!open && 'hidden'} origin-left duration-200`}>{item.title}</span>
                            </NavLink>
                        </li>
                    ))}
                    <li className='
                        flex items-center gap-x-4 p-2 text-sm cursor-pointer
                        rounded-md text-gray-300 hover:bg-[#FF0000] mt-2
                        hover:scale-105
                        '
                        onClick={handleLogout}
                    >
                        <MdLogout size={iconSize} />
                        <span className={`${!open && 'hidden'} origin-left duration-200`}>Logout</span>
                    </li>
                </ul>
            </aside>
            <div className={`${width < 666 ? '' : 'hidden'} flex relative h-10vh`}>
                {
                    toggleMenu ? (
                        <div className="p-2">
                            <AiOutlineClose
                                size={28}
                                className="cursor-pointer"
                                onClick={() => setToggleMenu(false)}
                            />
                        </div>
                    ) : (
                        <div className='p-2'>
                            <FiMenu
                                size={28}
                                className="cursor-pointer"
                                onClick={() => setToggleMenu(true)}
                            />
                        </div>
                    )
                }
                {toggleMenu && (
                    <ul
                        className="
                            z-10 fixed top-0 -left-2 p-5 w-[70vw] h-screen
                            shadow-2xl md:hidden list-none flex flex-col
                            justify-start items-start rounded-md
                            animate-slide-in bg-[rgba(0,0,0,.8)]
                        "
                    >
                        <li className="text-xl w-full my-2">
                            <AiOutlineClose
                                className='cursor-pointer text-white'
                                size={28}
                                onClick={() => setToggleMenu(false)}
                            />
                        </li>

                        <li className='my-5'>
                            <SidebarHeader open={true} name={user.email} onClick={() => navigate(`/profile/${user.email.replaceAll(' ', '')}`)} />
                        </li>
                        
                        {menu.map((item, index) => (
                            <li key={index}>
                                <NavLink
                                    to={item.link}
                                    className={
                                        ({ isActive }) => (
                                            `
                                                flex items-center gap-x-4 p-2 text-sm
                                                rounded-md text-gray-300 hover:bg-[#B81D24]
                                                hover:text-white mt-2
                                            ` + (isActive ? 'bg-[#A40910]' : '')
                                        )
                                    }
                                >
                                    {item.icon}
                                    <span className={`origin-left duration-200`}>{item.title}</span>
                                </NavLink>
                            </li>
                        ))}
                        <li className='
                                flex items-center gap-x-4 p-2 text-sm cursor-pointer
                                rounded-md text-gray-300 hover:bg-[#FF0000] mt-2
                                hover:scale-105
                            '
                            onClick={handleLogout}
                        >
                            <MdLogout size={iconSize} />
                            <span className={`origin-left duration-200`}>Logout</span>
                        </li>
                    </ul>
                )}
            </div>
        </>
    )
}

export default Sidebar;
