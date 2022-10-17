export interface Theme {
    primaryColor: string;
    primaryColorActive: string;
    primaryColorHover: string;
    secondaryColor: string;
    secondaryColorActive: string;
    secondaryColorHover: string;
    textPrimaryColor: string;
    textSecondaryColor: string;
    textPrimaryColorContrast: string;
    boxBorderColor: string;
    roundingFactor: number;
    defaultFont: string | string[];
}

export const defaultTheme: Theme = {
    primaryColor: "#ff2e63",
    primaryColorActive: "#ff4775",
    primaryColorHover: "#ff0a47",
    secondaryColor: "#08d9d6",
    secondaryColorActive: "#09ece8",
    secondaryColorHover: "#06B1AE",
    textPrimaryColor: "#222",
    textPrimaryColorContrast: "#fff",
    textSecondaryColor: "#ccc",
    boxBorderColor: "#ddd",
    roundingFactor: 1,
    defaultFont: "sans-serif",
};
