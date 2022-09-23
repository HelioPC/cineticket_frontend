import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertError, AlertSuccess } from "../../components/Alerts";
import { Logo2 } from "../../components/Logo";
import { UserActions, useUser } from "../../contexts/UserContext";
import { BACKENDADDRESS } from "../../data/dummy";
import { User } from "../../types";

const URL = 'https://assets.nflxext.com/ffe/siteui/vlv3/3a073c5f-0160-4d85-9a42-6f59aa4b64b9/e31faf5b-2516-4d36-82f4-987d45e3d835/AO-en-20220718-popsignuptwoweeks-perspective_alpha_website_large.jpg';

type AuthProps = {
    email: string;
    password: string;
}

/*
const userAuth = {
            id: 1,
            name: 'John Doe',
            email: email,
            password: password
        };

        dispatch({
            type: UserActions.setUser,
            payload: userAuth
        });

        // Store user in local storage
        localStorage.setItem('userCineticketUAN2022', JSON.stringify(userAuth));
*/

const Login = () => {
    const { user, dispatch } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);
    const navigate = useNavigate();

    const authenticate = ({ email, password }: AuthProps) => {
        if(email === '' && password === '') {
            AlertError({
                title: 'Error',
                description: 'Email and password are required.'
            });
            return;
        }
        
        let ret;

        const data = new FormData();
        data.append('email', email);
        data.append('senha', password);

        axios({
            method: 'POST',
            data: data,
            url: `${BACKENDADDRESS}cineticket/login`,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(function (response) {
            //handle success
            ret = response.data;

            if(ret.status === 'erro') throw Error('Status Error');
            
            const userAuth = {
                id: parseInt(ret.data.ID_FUNCIONARIO),
                id_cinema: ret.data.ID_CINEMA,
                name: ret.data.NOME,
                email: ret.data.EMAIL,
                password: ret.data.SENHA,
                nivel: ret.data.NIVEL
            };

            console.log(userAuth);
    
            dispatch({
                type: UserActions.setUser,
                payload: userAuth
            });
    
            // Store user in local storage
            localStorage.setItem('userCineticketUAN2022', JSON.stringify(userAuth));
        }).catch(function (response) {
            //handle error
            setLoginFailed(true);
        });
    }

    useEffect(() => {
        if(user.id !== 0) {
            navigate(`/profile/${user.name.toLowerCase().replaceAll(' ', '')}/`);
        }
    }, [user]);

    return (
        <div
            className={`w-screen h-screen`}
            style={{
                backgroundImage: `url(${URL})`,
            }}
        >
            <div className="w-full h-full flex flex-col md:items-center md:bg-[rgba(0,0,0,.4)] bg-black">
                {/* Login header */}
                <div className="w-full h-20 flex">
                    <div
                        className="w-20 rounded-full cursor-pointer sm:mx-10 mx-0 flex justify-center items-center"
                    >
                        <Logo2 />
                    </div>
                </div>
                
                {/* Login form */}
                <div className="md:w-[450px] md:h-[660px] h-full w-full rounded-xl flex flex-col login-glassmorphism md:px-16 px-8 pt-[60px] pb-[40px]">
                    <h1 className="text-3xl font-bold mb-6">Sign in</h1>

                    <form className="w-full">
                        <div className="mb-4">
                            <input
                                className={`shadow appearance-none rounded w-full h-12 bg-[rgba(90,90,90,0.6)] py-2 px-3 text-white placeholder:text-[#999] ${loginFailed ? 'border-red-600 border' : 'border-none'}`}
                                type="email"
                                value={email}
                                placeholder="Please enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                className={`shadow appearance-none rounded w-full h-12 bg-[rgba(90,90,90,0.6)] py-2 px-3 text-white mb-3 placeholder:text-[#999] ${loginFailed ? 'border-red-600 border' : 'border-none'}`}
                                type="password"
                                value={password}
                                placeholder="Please enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <button
                                className="bg-[#E50914] hover:bg-[#A80B1A] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                type="button"
                                onClick={() => authenticate({ email, password })}
                            >
                                Sign In
                            </button>
                        </div>

                        <div className="mt-3">
                            <a href="/" className="text-[#999] text-sm hover:underline">Need help?</a>
                        </div>
                    </form>

                    {
                        loginFailed ? <p className="text-[#999] text-sm mt-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id vel, ipsam numquam incidunt eaque quaerat. Dolor nostrum, distinctio dolore debitis molestiae fugit ipsam pariatur. Labore est quos vero vel repudiandae.</p> : null
                    }

                    <p className="text-[#999] text-sm mt-10">
                        This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="/" className="text-blue-500">Learn more.</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;
