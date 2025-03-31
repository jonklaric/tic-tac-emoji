import { useEffect, useState } from 'react'
import { useGame } from '../context/GameContext'
import { useNavigate } from '@tanstack/react-router'
import { Confetti } from './Confetti'

export function GameStatus() {
  const { state, restartGame } = useGame()
  const { status, stats, playerEmoji, computerEmoji } = state
  const navigate = useNavigate()
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Show confetti when player wins
    if (status === 'PLAYER_WON') {
      setShowConfetti(true)
    } else {
      setShowConfetti(false)
    }
  }, [status])

  const handleChooseNewEmojis = () => {
    navigate({ to: '/' })
  }

  let statusMessage = ''
  switch (status) {
    case 'PLAYER_WON':
      statusMessage = `You won! ${playerEmoji}`
      break
    case 'COMPUTER_WON':
      statusMessage = `Computer won! ${computerEmoji}`
      break
    case 'DRAW':
      statusMessage = 'It\'s a draw! 🤝'
      break
    case 'TIME_OUT':
      statusMessage = 'Time\'s up! You lost! ⏱️'
      break
    default:
      statusMessage = ''
  }

  if (status === 'PLAYING') {
    return null
  }

  return (
    <>
      <Confetti active={showConfetti} />
      
      <div className={`mt-6 p-4 bg-white rounded-lg shadow-md ${status === 'PLAYER_WON' ? 'winner-pulse' : ''}`}>
        <h3 className="text-2xl font-bold text-center mb-4">{statusMessage}</h3>
        
        <div className="flex justify-center gap-6 mb-6">
          <div className="text-center">
            <div className="text-xl font-semibold">You</div>
            <div className="text-3xl">{stats.playerWins}</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-semibold">Computer</div>
            <div className="text-3xl">{stats.computerWins}</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-semibold">Draws</div>
            <div className="text-3xl">{stats.draws}</div>
          </div>
        </div>
        
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={restartGame}
          >
            Play Again
          </button>
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            onClick={handleChooseNewEmojis}
          >
            Choose New Emojis
          </button>
        </div>
      </div>
    </>
  )
}