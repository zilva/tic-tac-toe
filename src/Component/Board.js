import React, { useEffect, useState } from 'react';
import Square from './Square';
import './Board.css'
import classNames from 'classnames';

const checkWinner = (arr) => {
    const winningSlots = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winningSlots.length; i++) {
        const [a, b, c] = winningSlots[i];
        if (arr[a] && arr[a] === arr[b] && arr[b] === arr[c]) {
            return arr[a];
        }
    }
    return null;
}

const checkDraw = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        if(!arr[i]) {
            return false
        }        
    }
    return true
}

const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [isDraw, setIsDraw] = useState(false);
    const [winner, setWinnder] = useState(null)
    const status = winner ? `Winner is : ${winner}` : `Next Player : ${xIsNext ? 'X' : 'O'}` 

    useEffect(()=>{
        setWinnder(checkWinner(squares));
        setIsDraw(checkDraw(squares));
    },[squares])

    const throwError = () => {
        throw new Error('Parameter is not a number!');
    }

    const handleOnClick = (i) => {
        // cannot go further
        //     if there is a winner
        //          or
        //     if there is already a value in the square
        if(winner || squares[i]) return;
        const squaresCpy = squares.slice();
        squaresCpy[i] = xIsNext ? 'X' : 'O'
        setSquares(squaresCpy);
        setXIsNext(!xIsNext);
    }
    
    const handlePlayAgain = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        setIsDraw(false);
    }
    
    const renderSquare = (i) => {
        return (
            <Square
            value={squares[i]}
            onClick={() => handleOnClick(i)} />
            );
        }
        
        const gameViewClasses = classNames('play-view', {'game-end' : winner || isDraw})
        
        const GameView = (
            <div className={gameViewClasses}>
            <div className='board-row'>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className='board-row'>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className='board-row'>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
    
    const EndView = (
        <div className='end-view'>
            <div>
                {isDraw ? 'Game draw' : 'Game Over'}
            </div>
            <div className='play-again' onClick={handlePlayAgain}>
                <img
                    style={{width:"4rem", height:"4rem", cursor:"pointer"}}
                    src='playagain.png'
                    alt="Play again"
                    />
            </div>
        </div>
    );
    
    return (
        <div className='game-board'>
            <div className='status'>{status}</div>
            { GameView }
            { (winner || isDraw) && EndView }
            <div
                className="restart-btn"
                onClick={handlePlayAgain}
                role="button"
            >
                Restart
            </div>
            <div
                className="thrw-error-btn"
                onClick={throwError}
                role="button"
            >
                Testing - Throw an Error
            </div>
        </div>
    );
}

export default Board;