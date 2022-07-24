import Header from "../../components/Header";
import { FaFacebookF, FaInstagram, FaTwitter, FaPhone } from "react-icons/fa";

import { useEffect, useState } from "react";
import api from "../../api";
import { MyList } from "../../types";
import { Loading } from "../../components/Utils";
import MovieCard from "../../components/MovieCard";

const SocialsList = () => {
    return (
        <ul className="sm:flex hidden flex-col justify-center items-center p-0 m-0 fixed top-1/2 right-0 bg-[#221F1F] z-10 shadow-lg rounded-l-md">
            <li className="p-3">
                <a href="https://www.facebook.com/" className="hover:text-[#E50914]">
                    <FaFacebookF size={18} />
                </a>
            </li>
            <li className="p-3">
                <a href="https://www.instagram.com/" className="hover:text-[#E50914]">
                    <FaInstagram size={18} />
                </a>
            </li>
            <li className="p-3">
                <a href="https://www.twitter.com/" className="hover:text-[#E50914]">
                    <FaTwitter size={18} />
                </a>
            </li>
            <li className="rotate-90 p-3">
                <a href="https://www.whatsapp.com/" className="hover:text-[#E50914]">
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

            // Remove results whose results doen't have a first_air_date
            list = list.filter(item => item.items.results.filter(result => result.first_air_date === undefined).length > 0);

            // Pop elements with first_air_date
            list = list.map(item => {
                item.items.results = item.items.results.filter(result => result.first_air_date === undefined);
                return item;
            }
            );

            setMovies(list);
            console.log(list);
        }
        loadMovies();
    } , []);

    if(movies.length === 0) return <Loading text="Connecting to CineTicket API..." />;

    return (
        <div className="w-screen bg-[#2D2D2D]">
            <Header />
            <SocialsList />

            <main className="pt-20 sm:px-16 px-0 w-screen min-h-screen flex">
                <div className="flex flex-wrap w-full gap-4 justify-center">
                    {movies.length > 0 ?
                        movies[0].items.results
                        .map((item: any, index: number) => (
                            <MovieCard
                                key={index}
                                imageUrl={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                title={item.title}
                                type={item.genre_ids}
                                url='/'
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
