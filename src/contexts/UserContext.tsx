import { createContext, useReducer, useContext } from "react";
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
    name: '',
    email: '',
    password: ''
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
