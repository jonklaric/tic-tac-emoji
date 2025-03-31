export type Player = 'PLAYER' | 'COMPUTER'

export type CellValue = Player | null

export type GameBoard = CellValue[]

export type GameStatus = 'PLAYING' | 'PLAYER_WON' | 'COMPUTER_WON' | 'DRAW' | 'TIME_OUT'

export type GameState = {
  board: GameBoard
  currentTurn: Player
  status: GameStatus
  playerEmoji: string
  computerEmoji: string
  timeLeft: number
  stats: GameStats
  winningCells: number[] | null
}

export type GameStats = {
  playerWins: number
  computerWins: number
  draws: number
}

export type EmojiChoice = {
  player: string
  computer: string
}