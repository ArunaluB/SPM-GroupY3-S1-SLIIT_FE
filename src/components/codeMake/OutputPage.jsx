// Output.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import './Output.css'; // Import the CSS file

function Output() {
    const location = useLocation();
    const { code } = location.state || { code: '', response: '' }; // Get code and response from state

    return (
        <div className="output-container"> {/* Apply the container class */}
            <h1>Your Code Explanation</h1>
            <pre>{code}</pre>

        </div>
    );
}

export default Output;
