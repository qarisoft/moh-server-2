import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {error?:string,label?:string,labelClass?:string}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className,error,label,labelClass, ...props }, ref) => {
        return (
            <>

                {label&&(
                    <>
                        <label className={cn(
                            'my-2',
                            labelClass,
                            error?'text-red-500':''
                        )}>{label}</label>
                        <div className="h-1"></div>
                    </>
                )}
                <textarea
                    className={cn(
                        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        className,
                        error?'ring-red-500 ring-1 ':''
                    )}
                    ref={ref}
                    {...props}
                />
                {error&&(

                    <span className={'text-red-500 ps-2'}>{error}</span>
                )}
            </>
        )
    }
)
Textarea.displayName = "Textarea"

export { Textarea }
