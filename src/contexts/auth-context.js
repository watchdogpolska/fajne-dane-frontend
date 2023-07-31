import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { backendConfig } from "../config";
import { Session } from "../api/session";
import { Repositories } from '../api/repositories';
import { BaseEvents } from '../api/repositories/repository';


const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null
};


const handlers = {
    INITIALIZE: (state, action) => {
        const { isAuthenticated, user } = action.payload;

        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user
        };
    },
    LOGIN: (state, action) => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user
        };
    },
    LOGOUT: (state) => ({
        ...state,
        isAuthenticated: false,
        user: null
    }),
    REGISTER: (state, action) => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user
        };
    },
};


const reducer = (state, action) => (handlers[action.type]
    ? handlers[action.type](state, action)
    : state);


export const AuthContext = createContext({
    ...initialState,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    repositories: null
});

export const AuthProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    const session = new Session(state.user);
    const repositories = new Repositories(backendConfig.url, session);
    repositories.auth.em.on(BaseEvents.ERROR, (error) => {
        if (error.response && error.response.status == 401) {
            repositories.auth.logout();
            dispatch({ type: 'LOGOUT' });
        }
    })

    useEffect(() => {
        const interval = setInterval(() => {
            repositories.auth.refresh();
        }, 10 * 60 * 1000);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        const initialize = async () => {
            try {
                if (repositories.session.accessToken) {
                    const user = await repositories.auth.details();

                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: true,
                            user
                        }
                    });
                } else {
                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: false,
                            user: null
                        }
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: false,
                        user: null
                    }
                });
            }
        };

        initialize();
    }, []);

    const login = async (email, password) => {
        await repositories.auth.login({ email, password });
        const user = await repositories.auth.details();

        dispatch({
            type: 'LOGIN',
            payload: {
                user
            }
        });
    };

    const logout = async () => {
        repositories.auth.logout();
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                logout,
                repositories
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const AuthConsumer = AuthContext.Consumer;
