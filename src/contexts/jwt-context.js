import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { authRepository } from '../api/repositories/auth-repository';

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
    }
};

const reducer = (state, action) => (handlers[action.type]
    ? handlers[action.type](state, action)
    : state);

export const AuthContext = createContext({
    ...initialState,
    platform: 'JWT',
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    register: () => Promise.resolve()
});

export const AuthProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const interval = setInterval(() => {
            authRepository.refresh();
        }, 10 * 60 * 1000);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        const initialize = async () => {
            try {
                if (authRepository.session.accessToken) {
                    const user = await authRepository.details();

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
        await authRepository.login({ email, password });
        const user = await authRepository.details();

        dispatch({
            type: 'LOGIN',
            payload: {
                user
            }
        });
    };

    const logout = async () => {
        authRepository.logout();
        dispatch({ type: 'LOGOUT' });
    };

    const register = async (email, name, password) => {
        const accessToken = await authRepository.register({ email, name, password });
        console.log("U NAS TO INACZEJ BEDZIE DZIAŁAĆ");


        dispatch({
            type: 'REGISTER',
            payload: {
            }
        });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                platform: 'JWT',
                login,
                logout,
                register
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
