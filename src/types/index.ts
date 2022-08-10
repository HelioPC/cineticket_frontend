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

export type EditMovieProps = {
    id?: number;
    title: string;
    description: string;
    release_date: string;
    poster_path: string;
    genreId: number;
}

export type MovieProps = {
    ID_FILME: string;
    ANO: string;
    TITULO: string;
    DESCRICAO: string;
    GENERO: string;
    CLASSIFICACAO: string;
    CAPA_URL: string;
}

export type SessionType = {
    ID: string;
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
