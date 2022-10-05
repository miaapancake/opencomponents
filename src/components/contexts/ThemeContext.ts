import React, { useContext } from "react";

import { defaultTheme, Theme } from "../Theme";


const context = React.createContext<Theme>(defaultTheme);
context.displayName = "ThemeContext";

export const useTheme = () => useContext(context);

export const ThemeProvider = context.Provider;
