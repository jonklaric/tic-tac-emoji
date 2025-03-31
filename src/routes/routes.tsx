import { createRoute, createRootRoute } from '@tanstack/react-router'
import { EmojiSelection } from './EmojiSelection'
import { GameBoard } from './GameBoard'
import { Root } from './Root'

export const rootRoute = createRootRoute({
  component: Root,
})

const emojiSelectionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: EmojiSelection,
})

const gameBoardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/game',
  component: GameBoard,
})

export const routes = [emojiSelectionRoute, gameBoardRoute]