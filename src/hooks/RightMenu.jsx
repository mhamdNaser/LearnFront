import { useState, useEffect } from 'react';

export default function RightMenu() {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        document.addEventListener('click', handleClick);
        document.addEventListener('contextmenu', handleContextMenu);
        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    const handleContextMenu = (e) => {
        e.preventDefault();
        setX(e.pageX);
        setY(e.pageY);
        setShowMenu(true);
    };

    const handleClick = () => {
        showMenu && setShowMenu(false);
    };

    return { x, y, showMenu };
}

