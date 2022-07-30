const LOADURL = 'https://thumbs.gfycat.com/BriefDescriptiveIcterinewarbler-size_restricted.gif'

type LoadProps = {
	text: string;
}

const Loading = ({ text }: LoadProps) => {
    return (
        <div className='w-screen h-screen bg-black flex flex-col justify-center items-center'>
			<img src={LOADURL} alt="Loading..." className='w-64' />
			<p className='text-sm'>{text}</p>
		</div>
    );
}

export { Loading };
