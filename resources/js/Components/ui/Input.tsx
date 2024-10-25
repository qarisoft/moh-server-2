import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {error?:string,label?:string,labelClass?:string}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type,error,label,labelClass, ...props}, ref) => {
        return (
            <>
                {label&&(
                    <>
                        <label className={cn(
                            '',
                            labelClass,
                            error ? 'text-red-500' : ''
                        )}>{label}</label>
                        <div className="h-[]"></div>
                    </>
                )}
                <input
                    type={type}
                className={cn(
                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                    error!=null?'ring-red-500 ring-1 ':''
                )}
                ref={ref}
                {...props}
            />
                {error&&(

                <span className={'text-red-500 ps-2'}>{error}</span>
                )}
                <div className="h-1"></div>
            </>
        )
    }
)
Input.displayName = "Input"

export { Input }
