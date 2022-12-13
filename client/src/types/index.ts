export type Movie = {
    id: number;
    title: string;
    release_date: string;
    overview: string;
    poster_path: string;
    original_title: string;
    adult: boolean;
    first_air_date: string;
    genre_ids: number[];
}

type Item = {
    results: Movie[];
}

export type MyList = {
    slug: string;
    title: string;
    items: Item;
}

export type ErrorObj = {
    message: string;
}

export type CardType = {
    title: string;
    icon: any;
    color: {
      background: string;
      boxShadow: string;  
    };
    value: string;
    barValue: number;
    series: {
        name: string;
        data: number[];
    }[];
}

export type CinemaProps = {
	ID_CINEMA: string;
	NOME: string;
	LOCALIZACAO: string;
}

export type CidadeProps = {
    ID_CIDADE: string;
    NOME: string;
}

export type RuaProps = {
    ID_RUA: string;
    ID_CIDADE: string;
    NOME: string;
}

export type MovieProps = {
    id_filme: string;
    ano: string;
    titulo: string;
    duracao: string;
    descricao: string;
    genero: string;
    classificacao: string;
    capa_url: string;
    setOpen?: (open: boolean) => void;
}

export type EditMovieProps = {
    ID_FILME: string;
    ANO: string;
    TITULO: string;
    DURACAO: string;
    DESCRICAO: string;
    GENERO: string;
    CLASSIFICACAO: string;
    CAPA_URL: string;
    setOpen: (open: boolean) => void;
}

export type SessionType = {
    ID: string;
    ID_CINEMA: string;
    CINEMA: string;
    TITULO: string;
    DATA: string;
    HORA: string;
    PRECO: string;
    SALA: string;
    DISPONIVEIS?: string;
}

export type LugarType = {
    ID_DISPONIVEL: string,
    ID_LUGAR: string,
    ID_SESSAO: string,
    ESTADO: string
}

export type User = {
    id: number;
    id_cinema: string;
    name: string;
    nivel: string;
    email: string;
    password: string;
}

export type UserType = {
    ID_FUNCIONARIO: number;
    NOME: string;
    EMAIL: string;
    SENHA: string;
    NIVEL: string;
    ID_CINEMA: string;
    CINEMA: string;
}

// reservas/auditoria
export type AuditoriaType = {
    ID_AUDITORIA: string;
    FUNCIONARIO: string;
    CLIENTE: string;
    ID_RESERVA: string;
    LUGARES: string;
}

export type ReservaType = {
    ID_RESERVA: string;
    ID_CINEMA: string;
    CLIENTE: string;
    FILME: string;
    DATA: string;
    LUGARES: string;
    CINEMA: string;
    SALA: string;
    ESTADO: string;
}
