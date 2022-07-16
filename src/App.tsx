import { useState } from 'react';
import styled from "styled-components";

const HeaderText = styled.div`
    margin: 0;
    padding: 0;
    color: #FFF;
    padding-top: 30px;

    h1 {
        cursor: none;
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0;
        padding: 0;
        color: transparent;
        text-transform: uppercase;
    }

    h1 span:nth-child(1) {
        position: absolute;
        top: 0;
        left: 0;
        color: #FFF;
        transition: .5s;
        clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
        overflow: hidden;
    }

    h1:hover span:nth-child(1) {
        transform: translateY(-16px);
    }

    h1 span:nth-child(2) {
        position: absolute;
        top: 0;
        left: 0;
        color: #FFF;
        transition: .5s;
        clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
        overflow: hidden;
    }

    h1:hover span:nth-child(2) {
        transform: translateY(16px);
    }

    h1 span:nth-child(3) {
        position: absolute;
        top: 50%;
        left: 0;
        color: #fff;
        transform: translateY(-50%) scaleY(0);
        width: 100%;
        background-color: #B81D24;
        font-weight: bold;
        letter-spacing: .7em;
        text-align: center;
        transition: .5s;
    }

    h1:hover span:nth-child(3) {
        transform: translateY(-50%) scaleY(1);
    }
`;

function App() {
	const [count, setCount] = useState(0)

	return (
		<div className='w-screen h-full min-h-screen'>

			<div className='w-full h-[90vh] flex justify-center items-center'>
				<HeaderText>
					<h1 className='text-5xl logo'>
						Cine Ticket
						<span>
							Cine Ticket
						</span>
						<span>
							Cine Ticket
						</span>
						<span className='text-[8px]'>
                            Where the movies come to you
						</span>
					</h1>
				</HeaderText>
				
				<h1 className='logo text-5xl'>
					<strong className='text-gradient'>C</strong>
					ine
					<strong className='text-gradient'>T</strong>
					icket
				</h1>
			</div>
		</div>
	)
}

export default App;
