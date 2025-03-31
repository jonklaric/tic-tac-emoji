import { CellValue } from '../types'
import { useGame } from '../context/GameContext'

interface CellProps {
  value: CellValue
  index: number
}

export function Cell({ value, index }: CellProps) {
  const { state, makeMove } = useGame()
  const { playerEmoji, computerEmoji, status, currentTurn, winningCells } = state
  
  const isDisabled = status !== 'PLAYING' || currentTurn !== 'PLAYER' || value !== null
  const isWinningCell = winningCells?.includes(index) || false
  
  const handleClick = () => {
    if (!isDisabled) {
      makeMove(index)
    }
  }
  
  return (
    <button 
      className={`aspect-square border-2 border-gray-300 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl focus:outline-none ${
        !isDisabled ? 'hover:bg-gray-100 cursor-pointer' : 'cursor-default'
      } ${isWinningCell ? 'winning-cell' : ''}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {value === 'PLAYER' && playerEmoji}
      {value === 'COMPUTER' && computerEmoji}
    </button>
  )
}