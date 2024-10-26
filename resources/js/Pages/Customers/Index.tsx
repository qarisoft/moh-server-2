import React, {FC} from 'react';
import PageLayout from "@/Pages/Projects/layout";
import {PageProps} from "@/types";
import {Link, useForm} from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/Components/ui/drop-down";
import Spinner from "@/Components/ui/spinner";
import {Trash2} from "lucide-react";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle} from "@/Components/ui/dialog";
import {Button} from "@/Components/ui/button";
import {toast} from "sonner";

type Customer = {
    id: number,
    name: string,
    address: string,
    phone: string,
    operations_count: number,
    created_at: string,
    updated_at: string
}
const Index = ({data}: PageProps<{ data: any }>) => {
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
    // const handelClick = () => {
    //     router.get(route('customers.show', customer.id))
    // }
    const {data, processing, setData, reset, delete: destroy} = useForm('delete_customer', {open: false})
    // const closeDialog = () => setData('open', false)
    const onDestroy = () => {
        destroy(route('customers.destroy', customer.id), {
            onSuccess: () => {
                toast.success('تم الحذف بنجاح')
            },
            onError: (e) => {
                toast.error(Object.values(e))
            },
            onFinish: () => reset('open')
        })
    }

    return <div className="  flex justify-between my-2 mx-2 border-b  ">
        <div className="flex-1  flex justify-between items-center">
            <Link href={route('customers.show', customer.id)} className="flex-1">{customer.name}</Link>
            <div className="w-1/3 flex  ">

                <div className="flex-1 justify-end bg-gray-00 text-center">{customer.operations_count}</div>
            </div>
        </div>
        <DropdownMenu dir={'rtl'}>
            <DropdownMenuTrigger>
                <div className="p-2  text-end">...</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{customer.name}</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className={'flex justify-between'} onClick={() => setData('open', true)}>

                    <div className="flex gap-2">
                        <span className="">{'حذف'}</span>
                        <Spinner loading={processing}/>
                    </div>

                    <Trash2 className={'text-red-600'}/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={data.open}
                onOpenChange={(e) => {
                    if (!e) {
                        setData('open', false)
                    }
                }}
        >
            <DialogContent className={'max-w-[15rem]  rounded-xl'} dir={'rtl'}>
                <DialogTitle className={'text-center'}>{'حذف العميل !!'}</DialogTitle>
                <DialogDescription></DialogDescription>
                <DialogFooter className={''}>
                    <Button className={'w-full'} variant={'destructive'} loading={processing}
                            onClick={onDestroy}>{'حذف'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
}


export default Index;
