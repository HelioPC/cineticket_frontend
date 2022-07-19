import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsTwitter, BsGithub, BsFacebook, BsWhatsapp, BsLinkedin, BsInstagram, BsMessenger, BsDiscord, BsTelegram } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { Logo2 } from '../Logo';

type ItemProps = {
    title: string | any;
    classProp?: string;
}

type HeaderProps = {
    classProp?: string;
    showButton?: boolean;
}

const NavbarItem = ({ title, classProp }: ItemProps) => {
    return (
        <li className={`mx-4 cursor-pointer hover:text-[#E50914] duration-500 font-bold ${classProp}`}>
            <a href="/">{title}</a>
        </li>
    )
}

const Header = ({ classProp }: HeaderProps) => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const headerElements = ['Home', 'Filmes', 'About', 'Contact'];

    return (
        <header className={`h-20 w-full flex items-center md:justify-start justify-between text-white py-4 sm:px-32 px-5 gap-x-5 fixed top-0 left-0 right-0 bg-[rgba(34,31,31,.7)] backdrop-blur-md shadow-md ${classProp}`}>
            <div
                className="p-3 bg-[#221F1F] rounded-full cursor-pointer sm:mx-10 mx-0"
            >
                <Logo2 />
            </div>
            <ul
                className="
                    md:flex hidden list-none flex-row
                    justify-space-between items-center
                    flex-initial
                "
            >
                {
                    headerElements.map((item, index) => (
                        <NavbarItem title={item} key={index} />
                    ))
                }
            </ul>
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
                                    title={item}
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
