import React from 'react'
import { cn } from '@/lib/utils'

interface VerifyButtonProps {
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
  children?: React.ReactNode
}

export const VerifyButton: React.FC<VerifyButtonProps> = ({
  onClick,
  disabled = false,
  loading = false,
  className,
  children = 'Verify'
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'w-full max-w-sm h-14 px-6',
        'bg-loops-cyan hover:bg-loops-cyan/90',
        'text-white font-outfit text-lg font-semibold',
        'rounded-xl border-0',
        'transition-all duration-200 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-loops-cyan focus:ring-offset-2 focus:ring-offset-loops-background',
        'active:scale-[0.98]',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-loops-cyan disabled:active:scale-100',
        className
      )}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Verifying...</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}

VerifyButton.displayName = 'VerifyButton'