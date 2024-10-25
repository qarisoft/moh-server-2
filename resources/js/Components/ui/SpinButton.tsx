import React, {FC} from 'react';
import {Button} from "@/Components/ui/button";
import Spinner from "@/Components/ui/spinner";

const SpinButton:FC<{onClick:React.MouseEventHandler<HTMLButtonElement>}> = ({onClick}) => {
    return (
        <Button onClick={onClick}>
            <div className="relative gap-2 items-center ">
                <div className="">{'تاكيد'}</div>
                <Spinner className={'absolute top-0 right-[130%]'} loading={true} size={4}/>

            </div>
        </Button>
    );
};

export default SpinButton;
