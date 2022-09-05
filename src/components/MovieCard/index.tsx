import { useNavigate } from "react-router-dom";
import { BsStar, BsFillBookmarkFill } from "react-icons/bs";
import { ImTicket } from "react-icons/im";
import { truncate } from "../../helpers/string";


type Props = {
    imageUrl: string;
    title: string;
    type: number[];
    url: string;
    releaseDate: string;
    category: number[];
}

const MovieType: any = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
}

const MovieCard = ({ imageUrl, title, type, url, releaseDate, category }: Props) => {
	const navigate = useNavigate();
	
	return (
		<div className="movie-card" onClick={() => navigate(`/reserva/${title}`)}>

			<div className="card-head">
				<img src={imageUrl} alt="" className="card-img transition-all duration-500 ease-in-out" />

				<div className="card-overlay transition-all duration-500 ease-in-out">

					<div className="bookmark">
						<BsFillBookmarkFill className="bookmark-outline" />
					</div>

					<div className="rating">
						<BsStar className="star-outline" />
						<span>{title.length}</span>
					</div>

					<div className="play">
						<ImTicket size={24} />
					</div>

				</div>
			</div>

			<div className="card-body">
				<h3 className="card-title">{truncate(title, 16)}</h3>

				<div className="card-info">
					<span className="genre">
						{category.slice(0, 2).map(item => MovieType[item]).join(', ')}
					</span>
					<span className="year">{releaseDate.slice(0, 4)}</span>
				</div>
			</div>

		</div>
	);
}

export default MovieCard;
