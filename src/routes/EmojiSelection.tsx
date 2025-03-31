import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useGame } from '../context/GameContext'
import { EmojiChoice } from '../types'

const EMOJI_OPTIONS = [
  '😀', '😎', '🤣', '😍', '🤩', '🥳', '😇', '🤠', '👽', '👻',
  '🐶', '🐱', '🦊', '🦁', '🐯', '🐮', '🐷', '🐸', '🐵', '🐔',
  '🍎', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🥥', '🥝', '🍍'
]

export function EmojiSelection() {
  const { setEmojis } = useGame()
  const navigate = useNavigate()
  const [selectedEmojis, setSelectedEmojis] = useState<EmojiChoice>({
    player: '',
    computer: ''
  })

  const handlePlayerEmojiSelect = (emoji: string) => {
    setSelectedEmojis(prev => ({ ...prev, player: emoji }))
  }

  const handleComputerEmojiSelect = (emoji: string) => {
    setSelectedEmojis(prev => ({ ...prev, computer: emoji }))
  }

  const handleStartGame = () => {
    if (selectedEmojis.player && selectedEmojis.computer) {
      setEmojis(selectedEmojis)
      navigate({ to: '/game' })
    }
  }

  return (
    <div className="max-w-2xl w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Choose Your Emojis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-center">Your Emoji</h3>
          <div className="grid grid-cols-5 gap-2">
            {EMOJI_OPTIONS.map(emoji => (
              <button
                key={`player-${emoji}`}
                className={`text-3xl p-2 rounded ${
                  selectedEmojis.player === emoji
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => handlePlayerEmojiSelect(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4 text-center">Computer's Emoji</h3>
          <div className="grid grid-cols-5 gap-2">
            {EMOJI_OPTIONS.map(emoji => (
              <button
                key={`computer-${emoji}`}
                className={`text-3xl p-2 rounded ${
                  selectedEmojis.computer === emoji
                    ? 'bg-red-100 border-2 border-red-500'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => handleComputerEmojiSelect(emoji)}
                disabled={selectedEmojis.player === emoji}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-10 text-center">
        <div className="flex justify-center gap-6 text-3xl mb-6">
          <div className="flex items-center gap-2">
            <span>You:</span>
            <span className="text-4xl">
              {selectedEmojis.player || '?'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>Computer:</span>
            <span className="text-4xl">
              {selectedEmojis.computer || '?'}
            </span>
          </div>
        </div>
        
        <button
          className={`px-8 py-3 text-lg font-semibold rounded-lg ${
            selectedEmojis.player && selectedEmojis.computer
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={handleStartGame}
          disabled={!selectedEmojis.player || !selectedEmojis.computer}
        >
          Start Game
        </button>
      </div>
    </div>
  )
}