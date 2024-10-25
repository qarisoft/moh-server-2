import React, {PropsWithChildren, useState} from "react";
import {cn} from "@/lib/utils";

const Btn = ({children,className,a='bg-gray-100',b='bg-gray-50',onClick,disabled,rounded}:PropsWithChildren<
    {rounded?:boolean,className?:string,a?:string,b?:string,onClick?:  React.MouseEventHandler<HTMLDivElement> | undefined,disabled?:boolean|undefined}>) => {
    const [aa,stA] = useState(false)
    return <div onClick={onClick} onMouseDown={()=>stA(true)} onMouseUp={()=>stA(false)}
                   className={cn(
                       'cursor-pointer',
                       `${aa?`${b} translate-y-[1px]`:`${a} `}`,
                       rounded?'rounded-full flex justify-center items-center  text-center':'',
                       `hover:${b}`,
                       className
                   )}
    >{children}</div>
}
export {Btn}
