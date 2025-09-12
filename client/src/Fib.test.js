import React from 'react';

const Fib = () => {
    console.log('Fib component rendering - UPDATED VERSION');
    
    return (
        <div>
            <h2>Fibonacci Calculator - Test Version</h2>
            <p>This is a simplified version to test if updates are working.</p>
            <form>
                <label>Enter your index:</label>
                <input type="number" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Fib;
