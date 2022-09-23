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

    useEffect(() => {
        const getMovies = async () => {

			if(backendMovies.length !== 0) return;

			try {
                const req = await fetch(`${BACKENDADDRESS}cineticket/filmes/exibicao`);
                const json = await req.json();

                json.map((item: MovieProps) => {
                    setBackendMovies((movies => [...movies, item]));
                    setFilteredMovies((movies => [...movies, item]));
                });
            } catch (error) {
                console.log("Conection to cineticket API failed 😥");
            }
		}

		getMovies();
    } , []);
    
    // Filter movies by genre
    useEffect(() => {
        const filterMoviesByGenre = () => {
            // Check if is already filtered by genre
            if(selectedGenre !== "") {
                setFilteredMovies(backendMovies.filter(movie => movie.GENERO === selectedGenre));
            } else {
                setFilteredMovies(backendMovies);
            }
        }
        filterMoviesByGenre();
    } , [selectedGenre]);

    // Filter movies by year
    useEffect(() => {
        const filterMoviesByYear = () => {
            // Check if is already filtered by year
            if(selectedYear !== "") {
                const filtered = filteredMovies.filter(movie => movie.ANO === selectedYear);
                if(filtered.length > 0) {
                    setFilteredMovies(filtered);
                }
            } else {
                setFilteredMovies(filteredMovies);
            }
        }
        filterMoviesByYear();
    } , [selectedYear]);

    if(filteredMovies.length === 0) return <Loading text="Connecting to CineTicket API..." />;
    console.log(backendMovies);

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
                <div className="filter-bar flex lg:flex-row flex-col lg:justify-between justify-center gap-10 items-center bg-black py-5 px-8 rounded-3xl mb-8">

                    <div className="flex sm:flex-row flex-col lg:gap-2 gap-5">

                        <select
                            name="genre"
                            className="bg-transparent border-none rounded-lg"
                            onChange={(e) => setSelectedGenre(e.target.value)}
                        >
                            <option value="">All Genres</option>
                            {
                                Object.keys(GENRES).map((key, index) => (
                                    <option key={index} value={key}>{GENRES[key]}</option>
                                ))
                            }
                        </select>

                        <select
                            name="year"
                            className="bg-transparent border-none rounded-lg"
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            <option value="">Todos anos</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                        </select>

                    </div>

                    <div className="filter-radios bg-[rgba(70,0,0,.5)] sm:p-2.5 p-2 flex justify-center relative rounded-2xl">

                        <input
                            type="radio" name="grade" id="featured" defaultChecked
                            onChange={(e) => {console.log(e.target.value)}}
                        />
                        <label htmlFor="featured">Featured</label>

                        <input
                            type="radio" name="grade" id="popular"
                            onChange={(e) => {console.log(e.target.value)}}
                        />
                        <label htmlFor="popular">Popular</label>

                        <input
                            type="radio" name="grade" id="newest"
                            onChange={(e) => {console.log(e.target.value)}}
                        />
                        <label htmlFor="newest">Novos</label>

                        <div className="checked-radio-bg"></div>

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
                                title={item.TITULO}
                                type={[28]}
                                url='/'
                                releaseDate={item.ANO}
                                category={[28]}
                            />
                        )) : null
                    }
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Home;
