import React, {FC} from 'react';
import PageLayout from "@/Pages/Projects/layout";
import {PageProps} from "@/types";
import {router} from "@inertiajs/react";

type Customer={
    id:               number,
    name:             string,
    address:          string,
    phone:            string,
    operations_count: number,
    created_at: string,
    updated_at: string
}
const Index = ({data}:PageProps<{data:any}>) => {
    console.log(data)

    return (
        <PageLayout title={'العملاء'}

                    header={<>

                        <div className="flex justify-between p-2 bg-slate-200 rounded h-[40px]">
                            <div className="flex-1 flex justify-between">
                                <div className=" flex-1">الاسم</div>
                                <div className="w-1/2 flex ">
                                    <div className="flex-1 text-center ">الحجوزات</div>
                                    {/*<div className="flex-1 text-center"></div>*/}
                                </div>
                            </div>
                            {/*<div className="w-5"></div>*/}

                        </div>
                    </>}
        >

        <Data customers={data}/>
        </PageLayout>
    );
};
const Data: FC<{ customers: Customer[] }> = ({customers}) => {
    return <div className="flex-1  h-[calc(100vh-190px)] overflow-y-auto ">
        {customers.map((p) => {
            return <Row key={p.id} customer={p}/>
        })}


    </div>
}


const Row: FC<{ customer: Customer }> = ({customer}) => {
    const handelClick = () => {
        router.get(route('customers.show', customer.id))
    }
    return <div className="  flex justify-between my-2 mx-2 border-b  " onClick={handelClick}>
        <div className="flex-1  flex justify-between items-center">
            <div className="flex-1">{customer.name}</div>
            <div className="w-1/3 flex  ">

                <div className="flex-1 justify-end bg-gray-00 text-center">{customer.operations_count}</div>
                {/*<div className="flex-1 text-center">{customer.name}</div>*/}
            </div>
        </div>
        <div className="p-2  text-end">...</div>
    </div>
}


export default Index;
