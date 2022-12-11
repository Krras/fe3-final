import { createContext, useEffect, useMemo, useReducer , useContext } from "react";

export const ContextGlobal = createContext(undefined);

export const initialState = { theme: "light", data: [] };
export const actions = {
  setDarkTheme: "setDarkTheme",
  setLightTheme: "setLightTheme",
  setData: "setData",
};
export const reducer = (state, action) => {
  switch (action.type) {
    case actions.setData: {
      return { ...state, data: action.payload };
    }
    case actions.setDarkTheme:
      return { ...state, theme: "dark" };
    case actions.setLightTheme:
      return { ...state, theme: "light" };
    default: {
      return state;
    }
  }
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const providerState = useMemo(
    () => ({
      data: state.data,
      theme: state.theme,
      setData: (array) => {
        dispatch({ type: actions.setData, payload: array });
      },
      setDarkTheme: () => {
        dispatch({ type: actions.setDarkTheme });
      },
      setLightTheme: () => {
        dispatch({ type: actions.setLightTheme });
      },
    }),
    [state, dispatch]
  );

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => providerState.setData(data));
  }, [providerState]);


  
  return (
    <ContextGlobal.Provider value={providerState}>
      {children}
    </ContextGlobal.Provider>
  );
  
};
export const useContextGlobal = () => {
  return useContext(ContextGlobal);

};
