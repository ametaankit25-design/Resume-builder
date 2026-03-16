import { useState, useEffect } from "react";

const useDarkMode = () => {
    const [dark, setDark] = useState(() => {
        // Read whatever the inline <script> in index.html already applied —
        // this avoids a flash and keeps state in sync on first render.
        return document.documentElement.classList.contains("dark");
    });

    useEffect(() => {
        const root = document.documentElement; // ✅ Must be <html>, NOT document.body
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