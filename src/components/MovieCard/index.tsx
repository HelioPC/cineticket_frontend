import { useNavigate } from "react-router-dom";
import { BsStar, BsFillBookmarkFill } from "react-icons/bs";
import { ImTicket } from "react-icons/im";
import { truncate } from "../../helpers/string";


type Props = {
    imageUrl: string;
    title: string;
    type: string;
    releaseDate: string;
}

const MovieCard = ({ imageUrl, title, type, releaseDate }: Props) => {
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
						{type}
					</span>
					<span className="year">{releaseDate.slice(0, 4)}</span>
				</div>
			</div>

		</div>
	);
}

export default MovieCard;
