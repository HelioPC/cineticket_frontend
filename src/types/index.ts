type Movie = {
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
