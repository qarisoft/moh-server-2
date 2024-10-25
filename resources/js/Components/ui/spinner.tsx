import  {FC} from 'react';
import {cn} from "@/lib/utils";

const Spinner:FC<{size?:number,loading?:boolean,className?:string}> = ({size,loading,className}) => {
    return (
        <div className={cn(
            "animate-spin size-5  border-t border-l rounded-full",
            size?`size-${size}`:'',
            loading?'':'opacity-0',
            className
        )}>

        </div>
    );
};

export default Spinner;
