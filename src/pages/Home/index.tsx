import Header from "../../components/Header";
import { FaFacebookF, FaInstagram, FaTwitter, FaPhone } from "react-icons/fa";
import {
	Dimmer,
	Loader,
	Grid,
	Message,
} from 'semantic-ui-react';

import { useEffect, useState } from "react";
import api from "../../api";
import { MyList } from "../../types";

const SocialsList = () => {
    return (
        <ul className="sm:flex hidden flex-col justify-center items-center p-0 m-0 fixed top-1/2 right-0 bg-[#221F1F] z-10 shadow-lg rounded-l-md">
            <li className="cursor-pointer hover:text-[#E50914] p-3">
                <a href="https://www.facebook.com/">
                    <FaFacebookF size={18} />
                </a>
            </li>
            <li className="cursor-pointer hover:text-[#E50914] p-3">
                <a href="https://www.instagram.com/">
                    <FaInstagram size={18} />
                </a>
            </li>
            <li className="cursor-pointer hover:text-[#E50914] p-3">
                <a href="https://www.twitter.com/">
                    <FaTwitter size={18} />
                </a>
            </li>
            <li className="rotate-90 cursor-pointer hover:text-[#E50914] p-3">
                <a href="https://www.whatsapp.com/">
                    <FaPhone size={18} />
                </a>
            </li>
        </ul>
    );
}

const Home = () => {
    const [movies, setMovies] = useState<MyList[]>([]);

    useEffect(() => {
        const loadMovies = async () => {
            let list: MyList[] = await api.getHomeList();
            setMovies(list);
            console.log(list);
        }
        loadMovies();
    } , []);

    return (
        <div className="">
            <Header />
            <SocialsList />

            <main className="pt-20 px-16 w-screen h-screen flex">
                <div className="flex flex-wrap gap-4 justify-center">
                    {movies.length > 0 ?
                        movies[0].items.results.map((item: any, index: number) => (
                            <img
                                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                className='w-56 hover:scale-105 duration-500 cursor-pointer'
                                alt="poster"
                                key={index}
                            />
                        ))
                        :
                        <div>Error</div>
                    }
                </div>
            </main>
        </div>
    );
}

export default Home;
