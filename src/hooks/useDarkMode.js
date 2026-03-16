import { useEffect, useState } from "react";

const useDarkMode = () => {
    const [dark, setDark] = useState(() => {
        // First check localStorage
        const stored = localStorage.getItem("theme");
        if (stored) {
            return stored === "dark";
        }
        // If no stored preference, check system preference
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (dark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [dark]);

    return [dark, setDark];
};

export default useDarkMode;