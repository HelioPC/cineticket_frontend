import Header from "../../components/Header";
import { FaFacebookF, FaInstagram, FaTwitter, FaPhone } from "react-icons/fa";

import { useEffect, useState } from "react";
import api, { API_BASE, API_KEY } from "../../api";
import { Movie, MovieProps, MyList } from "../../types";
import { Loading } from "../../components/Utils";
import MovieCard from "../../components/MovieCard";
import '../../assets/styles/main.css';
import '../../assets/styles/media.css';
import MainMovie from "../../components/MainMovie";
import YouTube from "react-youtube";
import { GENRES } from "../../data/data";


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
    const [filteredMovies, setFilteredMovies] = useState<MovieProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState<string>("");
    const [backendMovies, setBackendMovies] = useState<MovieProps[]>([]);

    useEffect(() => {
        const getMovies = async () => {

			if(backendMovies.length !== 0) return;

			const req = await fetch('http://192.168.43.35/cineticket/filmes/exibicao');
			const json = await req.json();

			json.map((item: MovieProps) => {
                backendMovies.push(
                    {
                        ID_FILME: item.ID_FILME,
                        ANO: item.ANO,
                        TITULO: item.TITULO,
                        DESCRICAO: item.DESCRICAO,
                        GENERO: item.GENERO,
                        CLASSIFICACAO: item.CLASSIFICACAO,
                        CAPA_URL: item.CAPA_URL
                    }
                )
			});
            setFilteredMovies(backendMovies);
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
        <div className="w-screen bg-[#111] sm:pt-0 pt-40 scroll">
            <Header />
            <SocialsList />

            <MainMovie
                image={`${backendMovies[0].CAPA_URL}`}
                title={backendMovies[0].TITULO}
                releaseDate={backendMovies[0].DESCRICAO}
            />

            <div className="sm:px-16 px-10">
                <div className="filter-bar">

                    <div className="filter-dropdowns">

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
                            <option value="">All the years</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                        </select>

                    </div>

                    <div className="filter-radios bg-[rgba(70,0,0,.5)]">

                        <input type="radio" name="grade" id="featured" defaultChecked/>
                        <label htmlFor="featured">Featured</label>

                        <input type="radio" name="grade" id="popular"/>
                        <label htmlFor="popular">Popular</label>

                        <input type="radio" name="grade" id="newest"/>
                        <label htmlFor="newest">Newest</label>

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
