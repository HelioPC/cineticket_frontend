import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
	const [count, setCount] = useState(0)

	return (
		<div className='w-screen h-full min-h-screen'>
			<h1 className='text-3xl'></h1>
		</div>
	)
}

export default App
