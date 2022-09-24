import { BACKENDADDRESS } from "../data/dummy";

/*
    <TableCell>
        {cine[Object.keys(cinemas)[0] as keyof CinemaProps]}
    </TableCell>
*/

const basicFetch = async (endpoint: string) => {
    const req = await fetch(`${BACKENDADDRESS}cineticket/${endpoint}`);
    const json = await req.json();

    return json;
}

const api = {
    getAllMovies: async () => {
        return await basicFetch('/');
    },
    getMoviesWithSession: async () => {
        return await basicFetch('filmes/exibicao');
    },
    getMovie: async () => {
        return await basicFetch('/');
    },
    getCinemas: async () => {
        return await basicFetch('/');
    },
    getUsers: async () => {
        return await basicFetch('/');
    },
    getSessions: async () => {
        return await basicFetch('/');
    },
    getRooms: async () => {
        return await basicFetch('/');
    },
    getReservations: async () => {
        return await basicFetch('/');
    },
    getAudits: async () => {
        return await basicFetch('/');
    }
}

export default api;