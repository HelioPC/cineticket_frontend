import LOADURL from '../../assets/vids/loading.gif';

type LoadProps = {
	text: string;
}

const Loading = ({ text }: LoadProps) => {
    return (
        <div className='w-screen h-screen bg-black flex flex-col justify-center items-center fixed top-0 left-0 bottom-0 right-0'>
			<img src={LOADURL} alt="Loading..." className='w-64' />
			<p className='text-sm text-white'>{text}</p>
		</div>
    );
}

export { Loading };
