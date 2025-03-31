import { useGame } from '../context/GameContext'

export function Timer() {
  const { state } = useGame()
  const { timeLeft, status, currentTurn } = state
  
  const getColorClass = () => {
    if (timeLeft > 6) return 'text-green-500'
    if (timeLeft > 3) return 'text-yellow-500'
    return 'text-red-500'
  }
  
  if (status !== 'PLAYING' || currentTurn !== 'PLAYER') {
    return (
      <div className="text-center">
        {status === 'PLAYING' ? 'Computer is thinking...' : 'Game Over'}
      </div>
    )
  }
  
  return (
    <div className="text-center">
      <div className="text-lg font-semibold mb-1">Your Turn</div>
      <div className={`text-4xl font-bold ${getColorClass()}`}>
        {timeLeft}
      </div>
      <div className="text-sm text-gray-600 mt-1">seconds left</div>
    </div>
  )
}