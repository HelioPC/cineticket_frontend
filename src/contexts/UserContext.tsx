import axios from "axios";
import { createContext, useReducer, useContext, useEffect } from "react";
import { BACKENDADDRESS } from "../data/dummy";
import { User } from "../types";

export enum UserActions {
    setUser,
    clearUser
}

type Action = {
    type: UserActions;
    payload: any;
}

type ContextType = {
    user: User;
    dispatch: (action: Action) => void;
}

type ProviderProps = {
    children: React.ReactNode;
}

const initialUser: User = {
    id: 0,
    id_cinema: '',
    name: '',
    email: '',
    password: '',
    nivel: ''
}

const UserContext = createContext<ContextType | undefined>(undefined);

const userReducer = (user: User, action: Action) => {
    switch (action.type) {
        case UserActions.setUser:
            return action.payload;
        case UserActions.clearUser:
            return initialUser;
        default:
            return user;
    }
}

export const UserProvider = ({ children }: ProviderProps) => {
    // if localStorage has user, get it
    const localUser = localStorage.getItem('userCineticketUAN2022');

    const [user, dispatch] = useReducer(userReducer, localUser ? JSON.parse(localUser) : initialUser);

    const value = { user, dispatch };

    useEffect(() => {
        const validateUser = () => {
            if(localUser === null) return;
            
            else {
                const data = new FormData();
                data.append('email', value.user.email);
                data.append('senha', value.user.password);

                axios({
                    method: 'POST',
                    data: data,
                    url: `${BACKENDADDRESS}cineticket/login`,
                    headers: { "Content-Type": "multipart/form-data" },
                }).then(function (response) {
                    //handle success
                    if(response.data.status === 'erro') {
                        value.dispatch({
                            type: UserActions.setUser,
                            payload: initialUser
                        });
                    }
                    
                    const userAuth = {
                        id: parseInt(response.data.data.ID_FUNCIONARIO),
                        id_cinema: response.data.data.ID_CINEMA,
                        name: response.data.data.NOME,
                        email: response.data.data.EMAIL,
                        password: response.data.data.SENHA,
                        nivel: response.data.data.NIVEL
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
                    value.dispatch({
                        type: UserActions.setUser,
                        payload: initialUser
                    });
                    console.log(response);
                });
            }
        }

        validateUser();
    }, []);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
}
