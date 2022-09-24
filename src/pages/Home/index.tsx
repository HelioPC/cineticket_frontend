import { FaFacebookF, FaInstagram, FaTwitter, FaPhone } from "react-icons/fa";
import { useEffect, useState } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { MovieProps } from "../../types";
import MovieCard from "../../components/MovieCard";
import MainMovie from "../../components/MainMovie";
import { BACKENDADDRESS, GENRES } from "../../data/dummy";

import '../../assets/styles/main.css';
import '../../assets/styles/media.css';
import { Loading } from "../../components/Utils";


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
                <a href="https://www.web.whatsapp.com/" className="hover:text-[#E50914]">
                    <FaPhone size={18} />
                </a>
            </li>
        </ul>
    );
}

const Home = () => {
    const [filteredMovies, setFilteredMovies] = useState<MovieProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState<string>("");
    const [backendMovies, setBackendMovies] = useState<MovieProps[]>([]);
    const [years, setYears] = useState<string[]>([]);
    const [genres, setGenres] = useState<string[]>([]);

    useEffect(() => {
        const getMovies = async () => {

            if (backendMovies.length !== 0) return;

            try {
                const req = await fetch(`${BACKENDADDRESS}cineticket/filmes/exibicao`);
                const json = await req.json();

                const fetchedYears: string[] = [];
                const fetchedGenres: string[] = [];

                json.map((item: MovieProps) => {
                    setBackendMovies((movies => [...movies, item]));
                    setFilteredMovies((movies => [...movies, item]));
                    fetchedYears.push(item.ANO);
                    fetchedGenres.push(item.GENERO);
                });
                
                fetchedYears.filter((item, index) => {
                    return fetchedYears.findIndex((year) => year === item) === index;
                }).map((item) => {
                    setYears((years) => [...years, item]);
                });

                fetchedGenres.filter((item, index) => {
                    return fetchedGenres.findIndex((genre) => genre === item) === index;
                }).map((item) => {
                    setGenres((genres) => [...genres, item]);
                });
            } catch (error) {
                console.log("Conection to cineticket API failed 😥");
            }
        }

        getMovies();
    }, []);

    // Filter movies by genre
    useEffect(() => {
        const filterMoviesByGenre = () => {
            // Check if is already filtered by genre
            var exists = false;
            setFilteredMovies(backendMovies.filter(movie => {
                if(movie.GENERO === selectedGenre && (movie.ANO === selectedYear || selectedYear === '')) {
                    exists = true;
                    return movie;
                }
            }));

            if(!exists) {
                setFilteredMovies(backendMovies);
                setSelectedGenre('');
                setSelectedYear('');
            }
        }
        filterMoviesByGenre();
    }, [selectedGenre]);

    // Filter movies by year
    useEffect(() => {
        const filterMoviesByYear = () => {
            // Check if is already filtered by year
            var exists = false;
            setFilteredMovies(backendMovies.filter(movie => {
                if(movie.ANO === selectedYear && (movie.GENERO === selectedGenre || selectedGenre === '')) {
                    exists = true;
                    return movie;
                }
            }));

            if(!exists) {
                setFilteredMovies(backendMovies);
                setSelectedGenre('');
                setSelectedYear('');
            }
        }
        filterMoviesByYear();
    }, [selectedYear]);

    if (filteredMovies.length === 0) return <Loading text="Connecting to CineTicket API..." />;

    return (
        <div className="w-full min-h-screen bg-[#111] sm:pt-0 pt-40">
            <Header />
            <SocialsList />

            {
                backendMovies.length !== 0 ?
                    (
                        <MainMovie
                            image={`${backendMovies[0].CAPA_URL}`}
                            title={backendMovies[0].TITULO}
                            releaseDate={backendMovies[0].DESCRICAO}
                        />
                    ) : (
                        <div className="w-full h-96" />
                    )
            }

            <div className="sm:px-16 px-6">
                <div className="filter-bar flex lg:flex-row flex-col lg:justify-between justify-center gap-10 items-center bg-black py-5 px-8 rounded-3xl mb-8 sm:hover:shadow-[#333] sm:hover:shadow-[0px_7px_29px_0px] duration-500">

                    <div className="flex sm:flex-row flex-col lg:gap-2 gap-5">

                        <select
                            name="genre"
                            className="bg-black border-none rounded-lg"
                            onChange={(e) => setSelectedGenre(e.target.value)}
                        >
                            <option value="">Todos gêneros</option>
                            {
                                genres.map((genre, index) => (
                                    <option key={index} value={genre}>
                                        {genre}
                                    </option>
                                ))
                            }
                        </select>

                        <select
                            name="year"
                            className="bg-black border-none rounded-lg"
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            <option value="">Todos anos</option>
                            {
                                years.map((year, index) => (
                                    <option key={index} value={year}>
                                        {year}
                                    </option>
                                ))
                            }
                        </select>

                    </div>
                </div>
            </div>

            <main className="py-24 movies sm:px-16 px-10">
                <div className="movies-grid">
                    {filteredMovies.length > 0 ?
                        filteredMovies.map((item: MovieProps, index: number) => (
                            <MovieCard
                                key={index}
                                imageUrl={item.CAPA_URL}
                                type={item.GENERO}
                                title={item.TITULO}
                                releaseDate={item.ANO}
                            />
                        )) : (
                            <div className="w-full h-full flex justify-center items-center" >
                                <h1>Sem filmes em exibição</h1>
                            </div>
                        )
                    }
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Home;
