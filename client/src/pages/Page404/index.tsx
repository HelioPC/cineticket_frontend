import { Link } from "react-router-dom";
import Header from "../../components/Header";

const Page404 = () => {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center text-white bg-black">
            <h1 className="sm:text-5xl text-5xl font-bold">404</h1>
            <p>Page not found</p>

            <Link to='/' className="bg-[#E50914] py-2 px-7 mt-14 rounded-full cursor-pointer hover:bg-[#C5070C] hover:text-white">
                <h1 className="text-2xl">Go to home</h1>
            </Link>
        </div>
    );
}

export default Page404;
