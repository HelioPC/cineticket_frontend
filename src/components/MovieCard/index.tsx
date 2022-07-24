type Props = {
    imageUrl: string;
    title: string;
    type: number[];
    url: string;
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

const MovieCard = ({ imageUrl, title, type, url }: Props) => {
    return (
        <div className='flex flex-col md:flex-[20%] md:max-w-[20%] flex-[40%] max-w-[40%] gap-y-5'>
            <img
                src={imageUrl}
                className='hover:scale-105 duration-500 cursor-pointer h-[252px] w-full rounded-md shadow-black shadow-2xl align-middle'
                alt={title}
            />

            <a href='/' className='font-bold text-[#CCC] hover:text-[#E50914] text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer'>{title}</a>
            <p className='text-sm text-[#999]'>{type.map(item => MovieType[item]).join(', ')}</p>
        </div>
    );
}

export default MovieCard;
