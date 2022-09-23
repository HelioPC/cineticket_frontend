import { Logo2 } from "../Logo";

const Footer = () => {
    return (
        <footer className="w-full h-32 sm:px-40 md:px-20 px-10">
            <div className="w-full h-full flex sm:flex-row flex-col sm:justify-between justify-center items-center border-t-[1px] border-[#444]">
                <div className="flex items-center">
                    <div
                        className="p-3 rounded-full cursor-pointer"
                    >
                        <Logo2 />
                    </div>
                    <span className="text-[#888] text-xs">© 2022 Cineticket, Inc.</span>
                </div>

                <h1 className="text-gradient">Powered by Grupo ELLI-4</h1>
            </div>
        </footer>
    );
}

export default Footer;
