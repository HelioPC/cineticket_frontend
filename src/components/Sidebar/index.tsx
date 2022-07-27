// React hooks
import { useEffect, useState } from 'react';
// React router dom
import { NavLink } from 'react-router-dom';
// React Icons
import { AiOutlineClose } from 'react-icons/ai';
import { FaTheaterMasks } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { MdKeyboardArrowLeft, MdLocalMovies, MdLogout } from 'react-icons/md';
// Auxiliary functions
import { useWindowDimensions } from '../../helpers/dimensions';
// Assets
import { Logo2 } from '../Logo';
// Custom alerts
import { AlertError, AlertSuccess } from '../Alerts';
import { useUser } from '../../contexts/UserContext';

type HeaderProps = {
    classProp?: string;
    open: boolean;
    name: string;
}

const SidebarHeader = ({ open, name }: HeaderProps) => {
    const iconSize = 20;
    const [account, setAccount] = useState(null);

    return (
        <div className={`flex gap-x-4 items-center`}>
            <>
                <div
                    className={`cursor-pointer duration-500 w-10 rounded-lg hover:rotate-[360deg]`}
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
                        admin
                    </p>
                </div>
            </>
        </div>
    );
}

const Sidebar = () => {
    const iconSize = 20;
    const { user } = useUser();
    const [open, setOpen] = useState(true);
    const [toggleMenu, setToggleMenu] = useState(false);
    const { width } = useWindowDimensions();
    const menu = [
        {title: 'Meu Cinema', icon: <FaTheaterMasks size={iconSize} />, link: `/profile/${user.name.replaceAll(' ', '')}/movies`},
        {title: 'Filmes', icon: <MdLocalMovies size={iconSize} />, link: `/profile/${user.name.replaceAll(' ', '')}/cinema`},
    ];

    useEffect(() => {
        if (width < 666) {
            setOpen(false);
        }
    }, [width]);

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

                <SidebarHeader open={open} name={user.name} />

                <ul className='pt-6'>
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
                                <span className={`${!open && 'hidden'} origin-left duration-200`}>{item.title}</span>
                            </NavLink>
                        </li>
                    ))}
                    <li className='
                        flex items-center gap-x-4 p-2 text-sm cursor-pointer
                        rounded-md text-gray-300 hover:bg-[#FF0000] mt-2
                        hover:scale-105
                        '
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
                            <SidebarHeader open={true} name={user.name} />
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
