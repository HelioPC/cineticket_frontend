import { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineLogin } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { Logo2 } from '../Logo';

type ItemProps = {
    title: string | any;
    url: string;
    classProp?: string;
}

type HeaderProps = {
    classProp?: string;
    showButton?: boolean;
}

const NavbarItem = ({ title, url, classProp }: ItemProps) => {
    return (
        <li className={`mx-4 ${classProp}`}>
            <NavLink
                to={url}
                className={
                    ({ isActive }) => (
                        `
                        cursor-pointer hover:text-[#B81D24] duration-500 font-bold
                        ` + (isActive ? 'text-[#E50914]' : '')
                    )
                }
            >
                {title}
            </NavLink>
        </li>
    )
}

const Header = ({ classProp }: HeaderProps) => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [color, setColor] = useState(true);
    const headerElements = [
        { title: 'Home', url: '/' },
    ];

    useEffect(() => {
        const scrollListener = () => {
            setColor(window.scrollY < 165);
        }

        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener)
        }
    }, []);

    return (
        <header className={`h-20 w-full flex items-center md:justify-start justify-between text-white py-4 sm:px-32 px-5 gap-x-5 fixed top-0 left-0 right-0 z-10 duration-500 ${color ? 'bg-transparent' : 'bg-[rgba(0,0,0,.7)] backdrop-blur-md'} ${classProp}`}>
            <div className='w-full'>
                <div className='w-full flex'>
                    <div
                        className="p-3 rounded-full cursor-pointer sm:mx-10 mx-0"
                    >
                        <Logo2 />
                    </div>
                    <ul
                        className="
                            md:flex hidden list-none flex-row
                            justify-space-between items-center
                            flex-initial w-full
                        "
                    >
                        {
                            headerElements.map((item, index) => (
                                <NavbarItem title={item.title} url={item.url} key={index} />
                            ))
                        }
                        <li className={`
                            ml-auto rounded-full p-2 flex items-center justify-center
                            duration-500 ${color ? 'bg-black text-white' : 'bg-white text-black'}
                        `}>
                            <a href="/login">
                                <AiOutlineLogin size={20} className="hover:text-[#B81D24] duration-500" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex relative">
                {toggleMenu
                    ?
                    <AiOutlineClose
                        size={28}
                        className="md:hidden cursor-pointer"
                        onClick={() => setToggleMenu(false)}
                    />
                    :
                    <FiMenu
                        size={28}
                        className="md:hidden cursor-pointer"
                        onClick={() => setToggleMenu(true)}
                    />
                }
                {toggleMenu && (
                    <ul
                        className="
                            fixed top-0 -right-2 p-3 w-[70vw] h-screen
                            shadow-2xl md:hidden list-none flex flex-col
                            justify-start items-end rounded-md z-50
                            red-glassmorphism animate-slide-in
                        "
                    >
                        <li className="text-xl w-full my-2">
                            <AiOutlineClose
                                className='cursor-pointer'
                                onClick={() => setToggleMenu(false)}
                            />
                        </li>
                        
                        {
                            headerElements.map((item, index) => (
                                <NavbarItem
                                    title={item.title}
                                    url={item.url}
                                    key={index}
                                    classProp="my-2 text-lg"
                                />
                            ))
                        }
                    </ul>
                )}
            </div>
        </header>
    )
}

export default Header;
