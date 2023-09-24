import {React,  useState } from "react";


export default function Menu({ x, y, showMenu, onClose }) {
    const style = {
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
        top: y,
        left: x,
        position: 'absolute',
        border: '1px solid grey',
        backgroundColor: 'gainsboro',
        flexDirection: 'row',
        display: showMenu ? 'flex' : 'none',
    };

    const handleAddNote = () => {
        const selectedText = window.getSelection().toString();
        // const selectedRange = window.getSelection().getRangeAt(0);

        // const span = document.createElement('span');
        // span.classList.add('highlighted');
        // selectedRange.surroundContents(span);
        if (selectedText) {
            const existingNotes = JSON.parse(sessionStorage.getItem('notes') || '[]');
            existingNotes.push(selectedText);
            sessionStorage.setItem('notes', JSON.stringify(existingNotes));
        }
    };

    const handleMarkup = () => {
        const selectedRange = window.getSelection().getRangeAt(0);

        const span = document.createElement('span');
        span.setAttribute('id', 'markup');
        span.classList.add('highlighted');

        // Clone the selected range's contents into the span
        const clonedContents = selectedRange.cloneContents();
        span.appendChild(clonedContents);

        // Surround the selected range with the span
        selectedRange.deleteContents();
        selectedRange.insertNode(span);
    };

    const handleCancelMarkup = () => {
        const span = document.getElementById('markup');
    
        if (span) {
            const content = span.innerHTML;
            span.outerHTML = content;
        }
    };


    const [showNotesSubMenu, setShowNotesSubMenu] = useState(false);

    const handleShowNotes = () => {
        setShowNotesSubMenu(!showNotesSubMenu);
    };

    const savedNotes = JSON.parse(sessionStorage.getItem('notes') || '[]');
    const notesList = savedNotes.map((note, index) => (
        <li
            key={index}
            title={note}
            style={{
                height: '30px',
                overflow: 'hidden'
            }}
        >
            {index + 1}{"- "}
            {note}
        </li>
    ));

    const handleClose = () => {
        onClose(); // Call the onClose callback to close the menu
    };

    return (
        <div style={style}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <button
                    onClick={handleAddNote}
                    style={{
                        border: 'none',
                        backgroundColor: 'inherit',
                        outline: 'none'
                    }}
                >
                    Add Note
                </button>
                <button
                    onClick={handleMarkup}
                    style={{
                        border: 'none',
                        backgroundColor: 'inherit',
                        outline: 'none'
                    }}
                >
                    Markup
                </button>
                <button
                    onClick={handleCancelMarkup}
                    style={{
                        border: 'none',
                        backgroundColor: 'inherit',
                        outline: 'none'
                    }}
                >
                    Clear Markup
                </button>
                <button
                    onClick={handleShowNotes}
                    style={{
                        border: 'none',
                        backgroundColor: 'inherit',
                        outline: 'none'
                    }}
                >
                    Show Notes
                </button>
                <button
                    onClick={handleClose}
                    style={{
                        border: 'none',
                        backgroundColor: 'inherit',
                        outline: 'none'
                    }}
                >
                    Close
                </button>
            </div>
            <div style={{ overflow: 'hidden', maxWidth: '160px' }}>
                {showNotesSubMenu && (
                    <div
                        style={{
                            backgroundColor: 'white',
                            borderLeft: '1px solid black',
                            marginTop: '10px',
                            height: '200px',
                            overflowY: 'scroll'
                        }}
                    >
                        <ul
                            style={{
                                padding: '0px 10px',
                            }}
                        >
                            <strong>note list</strong>
                            {notesList}
                        </ul>
                    </div>
                )}
            </div>
        </div>

    );
}
