import {Link, useForm} from '@inertiajs/react'
import React, {FC, useCallback, useState} from 'react'
import PageLayout from "@/Pages/Projects/layout";
import {Minus, Plus, Trash2} from "lucide-react";
import {Btn} from "@/Components/Btn";
import {Input} from "@/Components/ui/Input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

import {Textarea} from "@/Components/ui/text-area";
import {Button} from "@/Components/ui/button";
import {toast} from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/Components/ui/drop-down";

export type Project = {
    id: number
    name: string
    is_active: boolean
    description: string
    created_at: string
    updated_at: string
}

type P = Project & {
    floors_count: number
    apartments_count: number
}
type Paginate<T> = {
    data: T[]
}
type  A = {
    id: number
    floor: number

    apartments: number
}
type PFormType = {
    name: string
    description: string
    items: A[]
}

const Add = () => {
    const {data, processing, setData, reset, post, errors, isDirty} = useForm<PFormType>({
        items: [],
        name: '',
        description: '',
    })
    const onSubmit = () => {
        post(route('projects.store'), {
            onSuccess: () => {
                toast.success('تم انشاء المشروع بنجاح')
                close1(false)
            },
        })
    }
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)


    const close1 = (o: boolean) => {
        reset('items', 'name', 'description')
        setOpen(o)
    }

    const onOpen = useCallback((o: boolean) => {
        if (!o) {
            if (isDirty) {
                setOpen2(true)
            } else {
                close1(o)
            }
        } else {
            close1(o)
        }

    }, [isDirty, setOpen2, close1])


    const plus = (item: A, {f = false, minus = false}) => {
        setData(c => ({
            ...c, items:
                c.items.map((itm, i) => {
                    if (itm.id === item.id) {
                        if (f) {
                            if (minus) {
                                if (itm.floor > 1) itm.floor--
                            } else {
                                itm.floor++
                            }
                        } else {
                            if (minus) {
                                if (itm.apartments > 0) itm.apartments--
                            } else {
                                itm.apartments++
                            }
                        }
                    }
                    return itm
                })
        }))
    }
    const Box = ({item, f}: { item: A, f?: boolean }) => (
        <div className="flex-1 flex justify-between border p-1 rounded-md items-center bg-gray-00">
            <Btn rounded className={'size-5'} children={
                <Plus size={'15'} onClick={() => plus(item, {f,})}/>
            }/>

            <div className="flex-1 text-center">{f ? (item.floor) : (item.apartments)}</div>
            <Btn rounded className={'size-5 '} children={
                <Minus className={'w-4'} onClick={() => plus(item, {f, minus: true})}/>
            }/>

            <div className=" flex-1 text-center">{f ? ('ط') : ('ش')}</div>
        </div>
    )
    return (
        <>
            <Dialog open={open2}>
                <DialogContent dir={'rtl'} className={'max-w-fit rounded '}>
                    <DialogDescription>
                        <span className={'font-xs'}>

                        هل تريد الغاء الأنشاء
                        </span>
                    </DialogDescription>
                    <DialogTitle>

                        <div className=" text-center">تاكيد الالغاء</div>
                    </DialogTitle>
                    <DialogFooter className={'flex'}>
                        <div className="flex justify-center pt-2 gap-4">


                            <Button onClick={() => {
                                setOpen2(false)

                            }} variant={'outline'}>الغاء</Button>
                            <Button onClick={() => {
                                close1(false)
                                setOpen2(false)
                            }}
                            >تاكيد</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog onOpenChange={onOpen} open={open} modal>

                <DialogTrigger>
                    <Btn
                        onClick={() => setOpen(true)}
                        className={`rounded-full text-gray-700`}
                    >
                        <Plus/>
                    </Btn>
                </DialogTrigger>

                <DialogContent className={'p-4 w-[90%]  rounded'} dir={'rtl'}>
                    <DialogDescription>انشاء مشروع جديد</DialogDescription>
                    <DialogHeader>
                        <DialogTitle>اضافة مشروع جديد</DialogTitle>

                    </DialogHeader>
                    <div className="space-y-1 p-4">

                        <Input onChange={(e) => setData('name', e.target.value)} id="name" error={errors.name}
                               label={'الاسم'}/>
                        <div className="flex justify-between pt-2">

                            <div className="flex gap-2 pb-2 items-center">

                                <div className="">الطوابق</div>
                                {errors.items && (
                                    <span>{errors.items}</span>
                                )}
                                <Btn rounded onClick={() => setData(c => ({
                                    ...c,
                                    items: [...c.items, {floor: 1, apartments: 1, id: c.items.length}]
                                }))}>
                                    <Plus size={20} className={'my-auto -gray-600'}/>
                                </Btn>
                            </div>
                            <div className="flex">
                                <div className="">{data.items.length}</div>
                            </div>
                        </div>


                        <div className=" space-y-1 max-h-[20vh] sm:max-h-[15vh]  min-h-2  overflow-y-auto  rounded-md ">
                            <table className={'w-full '}>
                                <tbody className={'max-h-[10vh] overflow-y-auto'}>

                                {data.items.map((item, i) => (
                                    <tr key={i} className={'group'}>

                                        <td className={'bg-gray-00  h-fit'}>
                                            <Btn a={''} b={''}
                                                 onClick={() => setData(c => ({
                                                     ...c,
                                                     items: c.items.filter((it) => it.id != item.id)
                                                 }))}
                                                 children={
                                                     <Trash2 size={14} className={'text-red-500 '}/>
                                                 }/>
                                        </td>

                                        <td className={'bg-gray-00'}><Box item={item} f/></td>
                                        <td><Box item={item}/></td>

                                        {/*<td className="bg-gray-00  px-[2px] opacity-0 group-hover:opacity-100">{item.apartments * item.floor}</td>*/}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="h-1"></div>
                        <Textarea onChange={(e) => setData('description', e.target.value)} id="description"
                                  label={'الوصف'} error={errors.description}/>
                    </div>

                    <DialogFooter>
                        <div className="flex w-full">

                            <Button loading={processing} onClick={onSubmit} className={'w-full flex-1'}>
                                save
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>

    )
}


function Index({data}: { data: Paginate<P> }) {

    return (
        <PageLayout
            title={'العقارات'}


            add={<Add/>}
            header={<>

                <div className="flex justify-between p-2 bg-slate-200 rounded h-[40px]">
                    <div className="flex-1 flex justify-between">
                        <div className=" flex-1">عقار</div>
                        <div className="w-1/3 flex ">
                            <div className="flex-1">طابق</div>
                            <div className="flex-1 text-center">شقق</div>
                        </div>
                    </div>
                    <div className="w-5"></div>

                </div>
            </>}
        >

            <Data projects={data.data}/>

        </PageLayout>
    )
}


const Data: FC<{ projects: P[] }> = ({projects}) => {
    const {data, processing, setData, reset, delete: destroy} = useForm('delete_project', {project_id: 0})
    const onDestroy = useCallback(() => {
        destroy(route('projects.destroy', data.project_id), {
            onSuccess: () => {
                toast.success('تم الحذف بنجاح')
            },
            onError: (e) => {
                toast.error(Object.values(e))
            },
            onFinish: () => reset('project_id')
        })
    }, [data.project_id, reset])
    return <div className="flex-1  h-[calc(100vh-190px)] overflow-y-auto ">
        {projects.map((p) => {
            return <Row key={p.id} project={p} onDelete={(id: number) => setData('project_id', id)}/>
        })}


        <Dialog open={data.project_id != 0}
                onOpenChange={(e) => {

                }}
        >
            <DialogContent className={'max-w-[15rem]  rounded-xl'} dir={'rtl'}>
                <DialogTitle className={'text-center'}>{'حذف المشروع !!'}</DialogTitle>
                <DialogDescription></DialogDescription>
                <DialogFooter className={''}>
                    <Button className={'w-full'} variant={'destructive'} loading={processing}
                            onClick={onDestroy}>{'حذف'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>


    </div>
}


const Row: FC<{ project: P, onDelete: (id: number) => void }> = ({project, onDelete}) => {

    return <div className="  flex justify-between my-2 mx-2 border-b  ">
        <div className="flex-1  flex justify-between items-center">
            <Link className="flex-1" href={route('projects.show', project.id)}>{project.name}</Link>
            <div className="w-1/3 flex  ">

                <div className="flex-1 ">{project.floors_count}</div>
                <div className="flex-1 text-center">{project.apartments_count}</div>
            </div>
        </div>

        <DropdownMenu dir={'rtl'}>
            <DropdownMenuTrigger>
                <div className="p-2  text-end">...</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{project.name}</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className={'flex justify-between'} onClick={() => onDelete(project.id)}>

                    <div className="flex gap-2">
                        <span className="">{'حذف'}</span>
                    </div>

                    <Trash2 className={'text-red-600'}/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    </div>
}


export default Index
