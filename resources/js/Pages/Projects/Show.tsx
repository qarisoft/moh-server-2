import React, {
    FC,
    PropsWithChildren, useCallback,
    useEffect,
    useRef,
    useState
} from 'react'
import {Project} from './Index'
import {router, useForm} from '@inertiajs/react'
import {toast} from 'sonner'
import {
 ChevronDown, ChevronLeft,
    Delete,
    DeleteIcon, Minus,
    Plus, Trash2,
    TrashIcon,
    Upload
} from 'lucide-react'
import PageLayout from "@/Pages/Projects/layout";
import {Input} from "@/Components/ui/Input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter, DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/Components/ui/dialog";
import Spinner from "@/Components/ui/spinner";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/Components/ui/taps";
import {Button} from "@/Components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/Components/ui/select";
import useLongPress from "@/lib/use-longpres";
import {Btn} from "@/Components/Btn";

type F = {
    id: number
    number: number
    apartments: Ap[]
}
type Ap = {

    id: number,
    floor_id: number,
    is_booked: number,
    is_soled: number,
    info: string,
    number: number,
    rooms: number,
    rent_price: number,
    sell_price: number,
    created_at: string,
    updated_at: string,
    laravel_through_key: number

}
type P = Project & {
    floors: F[]

    media: Media[]
}

type Customer = {
    id: number,
    name: string,
    address: string,
    phone: string,
    created_at: string,
    updated_at: string
}
type Media = {
    id: number
    preview_url: string
    original_url: string
}

type  A = {
    id: number
    floor: number
    apartments: number
}



const Add: FC<{ id: number }> = ({id}) => {
    const {data, processing, setData, reset, post, errors, isDirty} = useForm<{ items: A[] }>({
        items: [],
    })
    const onSubmit = () => {
        post(route('projects.add.floor-ap', id), {
            onSuccess: () => {
                toast.success('تم انشاء المشروع بنجاح')
                close1(false)
            },
        })
    }
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)


    const close1 = (o: boolean) => {
        reset('items')
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
    const plus = (item: A, {f = false, ap = false, minus = false}) => {
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
                    <DialogDescription>انشاء شقق جديدة للمشروع </DialogDescription>
                    <DialogHeader>
                        <DialogTitle>اضافة مشروع جديد</DialogTitle>

                    </DialogHeader>
                    <div className="space-y-1 p-4">

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

                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
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


export default function Show({project, customers}: { project: P, customers: Customer[] }) {
    console.log(project)
    const [active, setActive] = useState('0')
    const {data, setData, post, processing, errors, reset, clearErrors} = useForm('sell-book', {
        project_id: project.id,
        customer_id: '',
        type: 'book',
        apartment_id: 0,
        create_customer: "1",
        name: '',
        address: '',
        phone: '',
    })

    const closeDialog = useCallback(() => {
        reset('customer_id', 'create_customer', 'apartment_id')
        clearErrors()
    }, [])
    const handelClick = (e: any) => {
        const path = `projects.${data.type}`
        post(route(path, data.apartment_id), {
            onSuccess: () => {
                closeDialog()
                toast.success("Event has been created.")
            },
            onError: (e) => {
                console.log(e);
                toast.error(`${Object.values(e)}`)
            }
        })
    }
    const ref = useRef<HTMLInputElement>()

    const [imgDel, setImgDel] = useState(0)
    const handelDelete = (id: number) => setImgDel(id)
    const dForm = useForm('edit_project', {
        name: project.name,
        description: project.description,
    })
    const handelTab = (e: string) => setActive(e)
    const [pending, setPending] = useState(false)
    const cl = 'bg-slate-100  overflow-auto rounded-md shadow h-[calc(100vh-190px)] md:h-[calc(100vh-225px)]'
    return (
        <PageLayout title={'عقار'} subTitle={project.name}>
            <div
                className=" w-full max-h-[70px] flex  justify-between items-center flex-col  gap-[6px]  bg-slate-00 px-2 ">
                <Tabs defaultValue={active} className="w-full text-center" onValueChange={handelTab} dir={'rtl'}>
                    <TabsList>
                        <TabsTrigger value="1">{'صور'}</TabsTrigger>
                        <TabsTrigger value="0">{'شقق'}</TabsTrigger>
                        <TabsTrigger value="2">{'بيانات'}</TabsTrigger>
                    </TabsList>


                    <TabsContent value='1'>
                        <div className="flex ">
                            <Btn
                                a={'bg-gray-200'}
                                b={'bg-gray-50'}
                                className='aspect-square bg-gray-100 rounded-full p-1'
                                onClick={(e) => {
                                    if (ref.current?.click) {
                                        ref.current?.click()
                                    }
                                }}>
                                <Plus/>
                            </Btn>
                        </div>
                        <div className="h-2"></div>
                        <div className={cl}>

                            <div className="flex flex-wrap justify-center gap-1 ">
                                <ImageUploader inpRef={ref} pId={project.id}/>
                                {project.media.map((img, i) => (
                                    <div key={i} className="relative lg:w-[calc(96%/3)] ">
                                        <img src={img.original_url}/>
                                        <Btn
                                            a={'bg-red-400'}
                                            b={'bg-red-500'}
                                            disabled={pending}
                                            onClick={() => handelDelete(img.id)}
                                            className=' opacity-55 hover:opacity-100 absolute bg-red-400 top-0 right-0 text-gray-200 py-1 px-2  z-10 rounded'>
                                            <DeleteIcon/>
                                        </Btn>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <>
                            <div
                                onClick={() => setImgDel(0)}
                                className={`h ${imgDel != 0 ? 'fadein' : 'fadeOut'} transition-all fixed z-10 top-0 right-0   justify-center items-center bg-slate-900 opacity-50  h-screen w-screen `}>

                            </div>
                            <div
                                className={`h ${imgDel != 0 ? 'fadein' : 'fadeOut'}  absolute bg-white z-20 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-lg  px-4 py-6 pb-6`}>
                                <div className='flex flex-col gap-1 w-56 relative' onClick={(e) => e.stopPropagation()}>

                                    <div
                                        className="flex justify-center items-center font-bold p-2 mt-2  w-fit mx-auto bg-slate-100 rounded gap-2">

                                        <div className=""
                                        >تاكيد الحذف
                                        </div>
                                        <TrashIcon color={'red'} className={'text-red'}/>
                                    </div>

                                    <div className="pt-2 text-center flex justify-center items-center">
                                        <Spinner loading={pending} size={3}/>


                                    </div>
                                    <div className="h-2"></div>
                                    <div className="flex  gap-2 w-full">
                                        <Btn
                                            a={'bg-red-400'} b={'bg-red-500'}
                                            disabled={processing}
                                            className='  flex-1 text-center rounded  text-gray-100  py-1'
                                            onClick={() => {
                                                setPending(true)

                                                router.delete(route('projects.delete.image', imgDel), {
                                                    onSuccess: () => {
                                                        toast.success('image deleted successfully')

                                                    },
                                                    onError: (e) => {
                                                        toast.error(`${Object.values(e)}`)
                                                    },
                                                    onFinish: () => {
                                                        setPending(false)
                                                        setImgDel(0)
                                                    }

                                                })
                                            }}

                                        >
                                            {'تاكيد'}
                                        </Btn>


                                    </div>
                                </div>
                            </div>
                        </>
                    </TabsContent>
                    <TabsContent value='0' className={''}>
                        <div className="w-full  flex-1 flex justify-between items-center  p-[4px]  h-[40px]   -top-0">
                            <Add id={project.id}/>

                            <div className="flex gap-2 text-xs justify-self-end items-center ">
                                <div className="">متاح</div>
                                <span className="size-4 rounded-full bg-sky-500"></span>
                                <div className="">محجوز</div>
                                <span className="size-4 rounded-full bg-violet-500"></span>
                                <div className="">مبيوع</div>
                                <span className="size-4 rounded-full bg-orange-500"></span>
                            </div>
                        </div>


                        <div className={cl}>
                            <div className="flex flex-col bg-blue-00 ">
                                {project.floors.map((fl) => (
                                        <FloorCard fl={fl} key={fl.id}>
                                            {fl.apartments.map((ap) => (
                                                <ApartmentCard open={data.apartment_id}
                                                               onClick={(t: string) => setData(c => ({
                                                                   ...c,
                                                                   apartment_id: ap.id,
                                                                   type: (ap.is_booked || ap.is_soled) ? 'cancel' : 'book',
                                                                   customer_id: c.customer_id
                                                               }))} ap={ap} key={ap.id}/>
                                            ))}
                                        </FloorCard>
                                    )
                                )}
                            </div>
                            <Dialog
                                open={data.apartment_id != 0} onOpenChange={(e) => {
                                if (!e) {
                                    closeDialog()
                                }
                            }}>
                                <DialogContent dir={'rtl'}
                                               className={'max-w-fit  rounded-3xl'}
                                >
                                    <DialogDescription></DialogDescription>

                                    {data.type != 'cancel' ? (
                                        <>
                                            <DialogTitle className={'min-w-[20rem] text-center'}>
                                                <label className='  text-center '>{'العملية'}</label>
                                            </DialogTitle>
                                            <Tabs defaultValue={data.type}
                                                  onValueChange={(e) => setData('type', e)}
                                                  className="text-center" dir={'rtl'}>
                                                <TabsList>
                                                    <TabsTrigger value="sell">{'بيع'}</TabsTrigger>
                                                    <TabsTrigger value="book">{'حجز'}</TabsTrigger>
                                                </TabsList>
                                                <TabsContent value="account">Make changes to your account
                                                    here.</TabsContent>
                                                <TabsContent value="password">Change your password here.</TabsContent>
                                            </Tabs>


                                            <label className='  '>{'العميل'}</label>
                                            <Tabs defaultValue={data.create_customer} className="pt-1" dir={'rtl'}
                                                  onValueChange={(e) => setData('create_customer', e)}
                                            >
                                                <TabsList>
                                                    <TabsTrigger value="1">{'جديد'}</TabsTrigger>
                                                    <TabsTrigger value="0">{'سابق'}</TabsTrigger>
                                                </TabsList>
                                                <TabsContent value="1">
                                                    <Input onChange={(e) => setData('name', e.target.value)}
                                                           error={errors.name} label={'الاسم'}/>
                                                    <Input onChange={(e) => setData('address', e.target.value)}
                                                           error={errors.address} label={'العنوان'}/>
                                                    <Input onChange={(e) => setData('phone', e.target.value)}
                                                           error={errors.phone} label={'الهاتف'}/>
                                                </TabsContent>
                                                <TabsContent value="0">


                                                    <Select dir={'rtl'}
                                                            onValueChange={(e) => setData('customer_id', e)}
                                                            defaultValue={data.customer_id}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="اختار العميل"/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {customers.map((c) => (
                                                                <SelectItem value={c.id.toString()}
                                                                            key={c.id}>{c.name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </TabsContent>
                                            </Tabs>

                                            <div className="h-2"></div>
                                            <Button loading={processing} onClick={handelClick}>{'تاكيد'}</Button>
                                        </>
                                    ) : (
                                        <>
                                            <DialogTitle className={'text-center min-w-[10rem]'}>
                                                تعيين كـ متاح !!
                                            </DialogTitle>
                                            <DialogFooter className={''}>

                                                <Button
                                                    loading={processing}
                                                    onClick={handelClick}>
                                                    {'تاكيد'}
                                                </Button>
                                            </DialogFooter>
                                        </>

                                    )}


                                </DialogContent>
                            </Dialog>
                        </div>

                    </TabsContent>
                    <TabsContent value={'2'} className={cl}>
                        <ProjectDetails setData={dForm.setData} data={dForm.data} processing={dForm.processing}/>
                    </TabsContent>
                </Tabs>

            </div>


        </PageLayout>
    )
}


const FloorCard = ({children, fl}: PropsWithChildren<{ fl: F }>) => {
    const [visible, setVisible] = useState<boolean>(true);
    const {data, post, processing, setData, reset} = useForm('create_apartment', {
        floor_id: fl.id,
        open: false,
    })
    const m = 'تم اضافة شقة جديدة في الطابق '
    const handelSubmit = useCallback((e: { stopPropagation: () => void }) => {
        e.stopPropagation()
        post(route('floors.store'), {
            onSuccess: () => {
                toast.success(`${fl.number} ${m}`)
                reset('open')

            }
        })
    }, [])
    return <>


        <div key={fl.id} className={'flex-1 cursor-pointe   z-50  '}>
            <div
                // onClick={() => setVisible(c => !c)}
                className=" sticky w-[98%]  flex top-0 ring-0 bg-blue-00 justify-between  shadow bg-gray-50 p-2 m-1">
                <div className="flex gap-4 items-center h-7">
                    <div className="">
                        {'الطابق '}: {fl.number}
                    </div>
                    <Dialog open={data.open} onOpenChange={(e) => setData('open', e)}>
                        <DialogTrigger onClick={(e) => e.stopPropagation()}>
                            <div
                                className="rounded-full bg-gray-200 p-1 ">
                                <Plus size={20}/>
                            </div>
                        </DialogTrigger>
                        <DialogContent dir={'rtl'} className={'w-fit  rounded-xl'}>
                            <div className="min-w-[10rem]"></div>
                            <DialogDescription>{'اضافة'}</DialogDescription>
                            <DialogTitle>{'أضافة شقة جديدة'}</DialogTitle>
                            <div className="h-2"></div>
                            <DialogFooter>

                                <Button loading={processing} onClick={handelSubmit}>{'تاكيد'}</Button>
                            </DialogFooter>

                        </DialogContent>
                    </Dialog>

                </div>
                <div className={'ms-auto items-center flex'}>
                    {visible ? (
                        <ChevronDown size={20}/>

                    ) : (
                        <ChevronLeft size={20}/>
                    )}
                </div>
            </div>
            <div className={`w-full justify-start gap-2   flex flex-wrap p-1 ${visible ? '' : 'hidden'}`}>
                {children}
            </div>
        </div>
    </>
}


const ProjectDetails: FC<{
    processing: boolean,
    data: { name: string, description: string },
    setData: (a: string, b: string) => void
}> = ({data, processing, setData}) => {
    // const data = form.data

    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('name', e.target.value)
    }
    const handelChange2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setData('description', e.target.value)
    }
    const [d, setD] = useState(false)
    return (
        <>
            <div className="w-full flex flex-col items-start p-2 gap-2">

                <label className="font-bold my-2 w-full">{'اسم المشروع'}</label>
                <input value={data.name} onChange={handelChange} className="rounded focus:ring-0" type={'text'}/>

                <label className="font-bold my-2">{'الوصف '}</label>
                <textarea value={data.description} onChange={handelChange2} className="rounded w-full focus:ring-0"/>

                <div className="mt-auto">
                    <button className={`bg-blue-500 rounded text-gray-50    px-4 py-1 ${d ? 'bg-blue-400' : ''}`}
                            onMouseDown={() => setD(true)} onMouseUp={() => setD(false)} disabled={processing}>
                        save
                    </button>
                </div>
            </div>


        </>
    )
}


const ImageUploader: FC<{ pId: number, image?: string, inpRef: any, }> = ({
                                                                              pId,
                                                                              image,
                                                                              inpRef,
                                                                          }) => {
    const {data, setData, post, processing, progress, reset, errors} = useForm<{
        photo: File | null,
        uploaded: boolean,
        project_id: number
    }>({
        photo: null,
        project_id: pId,
        uploaded: false
    })
    const upload = () => {
        post(route('projects.add.photo', pId), {

            method: 'put',
            only: [''],
            onSuccess: () => {
                setData('uploaded', true)
                reset('photo')
                toast.success('image add successfully')
            }
        })
    }
    useEffect(() => {
        if (data.photo) {
            upload()
        }
    }, [data.photo])

    return (
        <>


            <div
                className="relative w-full flex  text-center items-start justify-cente justify-between lg:w-[calc(96%/3)] h-fit "
                style={{display: data.photo ? 'flex' : 'none'}}>

                {data.photo ? (
                    <>
                        <img className='rounded overflow-clip  ' src={URL.createObjectURL(data.photo)}/>

                        <div className={`absolute  top-1/2 right-1/2  translate-x-1/2 -translate-y-1/2  w-full h-full
                            ${progress ? (' opacity-40 ') : 'opacity-20'}
                            `}>
                        </div>
                        <div
                            className="absolute flex top-1/2 right-1/2  translate-x-1/2
                            -translate-y-1/2 gap-1 items-center  text-slate-100">


                            {progress ? (
                                <>
                                    <Spinner loading={processing} className='text-white'/>
                                </>
                            ) : (
                                <>
                                    <Delete color='red' onClick={() => {

                                    }} className='cursor-pointer '/>
                                    {!data.uploaded && (

                                        <Upload className='cursor-pointer' onClick={upload}/>
                                    )}
                                </>

                            )}
                        </div>
                    </>
                ) : (
                    <input type='file'
                           id='upload'
                           className='w-fit'
                           ref={inpRef}

                           onChange={(e) => {
                               const a = e.target.files
                               if (a?.length) {
                                   const photo = a[0]
                                   setData('photo', photo)
                                   console.log(data.photo);

                               }
                           }}
                           hidden
                    />
                )}
            </div>
        </>
    )


}

const ApartmentCard: FC<{ ap: Ap, onClick: (t: string) => void, open: number }> = ({ap, onClick, open}) => {
    const a = `${ap.is_booked ? 'bg-violet-500' : (ap.is_soled ? 'bg-orange-500' : 'bg-sky-500')}`
    const {data, setData, post, processing, delete: deletE} = useForm({
        open: false,
        apartment_id: ap.id
    })
    const longPress = useLongPress({
        onLongPress: () => {
            setData('open', true)
        }, onClick: () => {
            if (ap.is_booked || ap.is_soled) {
                onClick('cancel')
            } else {
                onClick('book')
            }
        }
    });
    const handelSubmit = () => {
        deletE(route('apartments.destroy', ap.id), {
            onSuccess: () => {
                toast.success('تم حذف الشقة بنجاح')
            }
        })
    }
    return (

        <>
            <div
                style={{zIndex: 0}}
                className={`rounded-lg p-1 flex items-center justify-center px-2  cursor-pointer w-[calc(95vw/7)] z-0 ${a}  hover:bg-${a}-200`}
            >
                <div
                    {...longPress}
                    className="text-gray-100   w-full ">{ap.number}</div>
            </div>
            <Dialog open={data.open}
                    onOpenChange={(e) => {
                        if (!e) {
                            setData('open', false)
                        }
                    }}
            >
                <DialogContent className={'max-w-[10rem] rounded-xl'} dir={'rtl'}>
                    <DialogTitle>{'حذف الشقة !!'}</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <DialogFooter>
                        <Button loading={processing} onClick={handelSubmit}>{'حذف'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>)
}

