import { Cell } from '../components/Cell'
import { GameStatus } from '../components/GameStatus'
import { Timer } from '../components/Timer'
import { useGame } from '../context/GameContext'
import { useTimer } from '../hooks/useTimer'

export function GameBoard() {
  const { state } = useGame()
  const { board, currentTurn, playerEmoji, computerEmoji } = state
  
  // Initialize the timer
  useTimer()
  
  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      <div className="mb-6 flex items-center justify-center gap-8">
        <div className="flex items-center gap-2">
          <span className="text-xl">You:</span>
          <span className="text-3xl">{playerEmoji}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">Computer:</span>
          <span className="text-3xl">{computerEmoji}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        <div className="col-span-3">
          <div className="grid grid-cols-3 gap-2 aspect-square">
            {board.map((cell, index) => (
              <Cell key={index} value={cell} index={index} />
            ))}
          </div>
        </div>
        
        <div className="col-span-3 md:col-span-2 flex flex-col justify-center items-center">
          <div className="p-4 bg-white rounded-lg shadow-md w-full">
            <h3 className="text-xl font-semibold mb-4 text-center">
              {currentTurn === 'PLAYER' ? "Your Turn" : "Computer's Turn"}
            </h3>
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <Timer />
            </div>
          </div>
        </div>
      </div>
      
      <GameStatus />
    </div>
  )
}