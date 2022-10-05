import { number } from "joi";

export interface Theme {
    primaryColor: string;
    primaryColorActive: string;
    primaryColorHover: string;
    secondaryColor: string;
    secondaryColorActive: string;
    textColorPrimary: string;
    textColorSecondary: string;
    roundingFactor: number;
}

export type WithTheme<T> = Omit<T, "onChange"> & {theme: Theme};

export const defaultTheme: Theme = ({
    primaryColor: "#ff2e63",
    primaryColorActive: "#ff4775",
    primaryColorHover: "#ff0a47",
    secondaryColor: "#08d9d6",
    secondaryColorActive: "#09ece8",
    textColorPrimary: "#fff",
    textColorSecondary: "#ccc",
    roundingFactor: 1
})