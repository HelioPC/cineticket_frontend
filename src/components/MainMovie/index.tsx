import { BsFillPlayFill } from 'react-icons/bs';
import { useWindowDimensions } from "../../helpers/dimensions";

type MainMovieProps = {
    classProp?: string;
    image: string;
    title: string;
    releaseDate: string;
    onClick?: () => void;
}

const MainMovie = ({ image, title, releaseDate, onClick }: MainMovieProps) => {
    const { width } = useWindowDimensions();
    return (
        <div
            className="first-look"
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${image})`,
                display: `${width > 639 ? 'block' : 'none'}`
            }}
        >
            <div className="first-look-v">
                <div className="first-look-h">
                    <div className="first-look-slogan">
                        {title}
                    </div>

                    <div className="first-look-description">
                        {releaseDate}
                    </div>

                    <div className="flex mt-[55px] gap-x-10">
                        <a href={`/reserva/${title}`} className="px-[25px] py-[15px] rounded-md bg-white text-black font-bold hover:scale-105 duration-300 ease-in-out">
                            Reserve já
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainMovie;
