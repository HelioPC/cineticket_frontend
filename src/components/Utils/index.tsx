import { Loader, Message, Dimmer, Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

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

const ErrConnection = (text: string) => {
    return (
        <Grid centered columns={2} padded>
			<Grid.Column>
				<Message
					negative
					compact
					floating
					header="Error Connecting to Substrate"
					content="Connection to API failed. Please try again later."
				/>
			</Grid.Column>
		</Grid>
    );
}

export { Loading, ErrConnection };
