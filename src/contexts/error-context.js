import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import merge from "@/utils/merge";


const initialState = {
    error: null,
};



export const ErrorContext = createContext({
    ...initialState
});

export const ErrorProvider = (props) => {
    const { children } = props;
    const [state, setState] = useReducer(
        (state, newState) => merge(error, newState),
        {
            error: null
        }
    );

    return (
        <ErrorContext.Provider
            value={{
                ...state,
            }}
        >
            {children}
        </ErrorContext.Provider>
    );
};

ErrorProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const ErrorConsumer = ErrorContext.Consumer;
