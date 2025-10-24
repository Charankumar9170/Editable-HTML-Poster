import React from 'react'

export default function IconButton({ children, className = '', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={`p-2 rounded-md hover:bg-slate-100 ${className}`}>
      {children}
    </button>
  )
}