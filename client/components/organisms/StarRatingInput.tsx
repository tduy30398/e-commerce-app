import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import React, { useState } from 'react'

interface StarRatingInputProps {
  value: number
  onChange: (value: number) => void
  max?: number
  className?: string
}

const StarRatingInput = ({ value, onChange, max = 5, className }: StarRatingInputProps) => {
  const [hover, setHover] = useState<number | null>(null)

  return (
    <div className={cn('flex items-center', className)}>
      {[...Array(max)].map((_, index) => {
        const starValue = index + 1
        const isFilled = hover ? starValue <= hover : starValue <= value

        return (
          <button
            key={index}
            type="button"
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(null)}
            className="focus:outline-none cursor-pointer"
          >
            <Star
              className={cn(
                'w-6 h-6 md:w-7 md:h-7 mr-1 transition-colors',
                isFilled ? 'text-[#FFC633] fill-[#FFC633]' : 'text-gray-300'
              )}
            />
          </button>
        )
      })}
    </div>
  )
}

export default StarRatingInput
