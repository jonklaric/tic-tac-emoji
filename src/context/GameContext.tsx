import { createContext, useContext, useReducer, ReactNode } from 'react'
import { GameState, Player, CellValue, GameStatus, EmojiChoice } from '../types'

type GameAction =
  | { type: 'SET_EMOJIS'; payload: EmojiChoice }
  | { type: 'MAKE_MOVE'; payload: number }
  | { type: 'COMPUTER_MOVE' }
  | { type: 'TIMER_TICK' }
  | { type: 'RESTART_GAME' }
  | { type: 'RESET_GAME' }

interface GameContextType {
  state: GameState
  dispatch: React.Dispatch<GameAction>
  makeMove: (index: number) => void
  restartGame: () => void
  resetGame: () => void
  setEmojis: (choice: EmojiChoice) => void
}

const initialState: GameState = {
  board: Array(9).fill(null),
  currentTurn: Math.random() < 0.5 ? 'PLAYER' : 'COMPUTER',
  status: 'PLAYING',
  playerEmoji: '😀',
  computerEmoji: '🤖',
  timeLeft: 9,
  stats: {
    playerWins: 0,
    computerWins: 0,
    draws: 0
  },
  winningCells: null
}

const GameContext = createContext<GameContextType | undefined>(undefined)

// Win patterns for the tic-tac-toe board
const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
]

// Check if the game is won and by whom
const checkWinner = (
  board: CellValue[]
): { winner: Player | 'DRAW' | null; winningPattern: number[] | null } => {
  // Check for a winner
  for (const pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { 
        winner: board[a] as Player, 
        winningPattern: pattern 
      }
    }
  }

  // Check for a draw
  if (!board.includes(null)) {
    return { winner: 'DRAW', winningPattern: null }
  }

  return { winner: null, winningPattern: null }
}

// Get a random empty cell for computer's move
const getRandomEmptyCell = (board: CellValue[]): number => {
  const emptyCells = board
    .map((cell, index) => (cell === null ? index : -1))
    .filter(index => index !== -1)
  
  const randomIndex = Math.floor(Math.random() * emptyCells.length)
  return emptyCells[randomIndex]
}

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_EMOJIS': {
      const { player, computer } = action.payload
      return {
        ...state,
        playerEmoji: player,
        computerEmoji: computer,
        currentTurn: Math.random() < 0.5 ? 'PLAYER' : 'COMPUTER',
        board: Array(9).fill(null),
        status: 'PLAYING',
        timeLeft: 9,
        winningCells: null
      }
    }
    
    case 'MAKE_MOVE': {
      if (
        state.status !== 'PLAYING' ||
        state.currentTurn !== 'PLAYER' ||
        state.board[action.payload] !== null
      ) {
        return state
      }

      const newBoard = [...state.board]
      newBoard[action.payload] = 'PLAYER'

      const { winner, winningPattern } = checkWinner(newBoard)
      let newStatus: GameStatus = state.status
      const newStats = { ...state.stats }

      if (winner === 'PLAYER') {
        newStatus = 'PLAYER_WON'
        newStats.playerWins += 1
      } else if (winner === 'DRAW') {
        newStatus = 'DRAW'
        newStats.draws += 1
      }

      return {
        ...state,
        board: newBoard,
        currentTurn: newStatus === 'PLAYING' ? 'COMPUTER' : state.currentTurn,
        status: newStatus,
        timeLeft: 9,
        stats: newStats,
        winningCells: winningPattern
      }
    }

    case 'COMPUTER_MOVE': {
      if (state.status !== 'PLAYING' || state.currentTurn !== 'COMPUTER') {
        return state
      }

      const newBoard = [...state.board]
      const moveIndex = getRandomEmptyCell(newBoard)
      
      if (moveIndex === undefined) {
        return state
      }
      
      newBoard[moveIndex] = 'COMPUTER'

      const { winner, winningPattern } = checkWinner(newBoard)
      let newStatus: GameStatus = state.status
      const newStats = { ...state.stats }

      if (winner === 'COMPUTER') {
        newStatus = 'COMPUTER_WON'
        newStats.computerWins += 1
      } else if (winner === 'DRAW') {
        newStatus = 'DRAW'
        newStats.draws += 1
      }

      return {
        ...state,
        board: newBoard,
        currentTurn: newStatus === 'PLAYING' ? 'PLAYER' : state.currentTurn,
        status: newStatus,
        timeLeft: 9,
        stats: newStats,
        winningCells: winningPattern
      }
    }

    case 'TIMER_TICK': {
      if (state.status !== 'PLAYING' || state.currentTurn !== 'PLAYER') {
        return state
      }

      const newTimeLeft = state.timeLeft - 1
      
      if (newTimeLeft <= 0) {
        const newStats = { ...state.stats }
        newStats.computerWins += 1
        
        return {
          ...state,
          timeLeft: 0,
          status: 'TIME_OUT',
          stats: newStats
        }
      }
      
      return {
        ...state,
        timeLeft: newTimeLeft
      }
    }

    case 'RESTART_GAME': {
      return {
        ...state,
        board: Array(9).fill(null),
        currentTurn: Math.random() < 0.5 ? 'PLAYER' : 'COMPUTER',
        status: 'PLAYING',
        timeLeft: 9,
        winningCells: null
      }
    }

    case 'RESET_GAME': {
      return {
        ...initialState,
        stats: state.stats,
        currentTurn: Math.random() < 0.5 ? 'PLAYER' : 'COMPUTER'
      }
    }

    default:
      return state
  }
}

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  const makeMove = (index: number) => {
    dispatch({ type: 'MAKE_MOVE', payload: index })
  }

  const restartGame = () => {
    dispatch({ type: 'RESTART_GAME' })
  }

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' })
  }

  const setEmojis = (choice: EmojiChoice) => {
    dispatch({ type: 'SET_EMOJIS', payload: choice })
  }

  return (
    <GameContext.Provider
      value={{ state, dispatch, makeMove, restartGame, resetGame, setEmojis }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}