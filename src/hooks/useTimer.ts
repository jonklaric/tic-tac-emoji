import { useEffect } from 'react'
import { useGame } from '../context/GameContext'

export const useTimer = () => {
  const { state, dispatch } = useGame()
  const { status, currentTurn } = state

  useEffect(() => {
    let timerId: number | null = null

    if (status === 'PLAYING' && currentTurn === 'PLAYER') {
      timerId = window.setInterval(() => {
        dispatch({ type: 'TIMER_TICK' })
      }, 1000)
    }

    return () => {
      if (timerId !== null) {
        clearInterval(timerId)
      }
    }
  }, [status, currentTurn, dispatch])

  useEffect(() => {
    if (status === 'PLAYING' && currentTurn === 'COMPUTER') {
      const timerId = setTimeout(() => {
        dispatch({ type: 'COMPUTER_MOVE' })
      }, 500)

      return () => {
        clearTimeout(timerId)
      }
    }
  }, [status, currentTurn, dispatch])
}