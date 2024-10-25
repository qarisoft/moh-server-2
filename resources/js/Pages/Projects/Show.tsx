import React, {
    FC,
    PropsWithChildren,
    useEffect,
    useRef,
    useState
} from 'react'
import {Project} from './Index'
import {Button, SegmentedControl, Spinner, Select, Badge} from '@radix-ui/themes'
import {InertiaFormProps, router, useForm} from '@inertiajs/react'
import {toast} from 'sonner'
import {
    ArrowDownIcon,
    ArrowLeft,
    Delete,
    DeleteIcon,
    Plus,
    TrashIcon,
    Upload
} from 'lucide-react'
import PageLayout from "@/Pages/Projects/layout";
import {Input} from "@/Components/ui/Input";

type F = {
    id: number
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



const Btn = ({children,className,a,b,onClick,disabled}:PropsWithChildren<{className:string,a:string,b:string,onClick:  React.MouseEventHandler<HTMLButtonElement> | undefined,disabled?:boolean|undefined}>) => {
    const [aa,stA] = useState(false)
    return <button onClick={onClick} onMouseDown={()=>stA(true)} onMouseUp={()=>stA(false)}  disabled={disabled}  className={`${aa?`${b} shadow drop-shadow`:`${a} `}   ${className}`}  >{children}</button>
}

export default function Show({project, customers}: { project: P, customers: Customer[] }) {
    const [active, setActive] = useState('0')
    const {data, setData, post, processing, errors, reset, clearErrors} = useForm({
        customer_id: '',
        type: 'book',
        apartment_id: 0,
        create_customer: "0",
        name:'',
        address:'',
        phone:'',
    })
    const handelClick = (e: any) => {
        e.stopPropagation()
        e.preventDefault()
        const path = `projects.${data.type}`


        post(route(path, data.apartment_id), {
            onSuccess: () => {
                setData(c => ({...c, apartment_id: 0, customer_id: '', type: 'book'}))
                toast.success("Event has been created.")
            },
            onError: (e) => {
                console.log(e);

                toast.error(`${Object.values(e)}`)
            }
        })
    }
    const ref = useRef<HTMLInputElement>()

    const [imgDel,setImgDel] = useState(0)
    const handelDelete = (id:number) => setImgDel(id)
    const detailsForm = useForm({
        name: project.name,
        description: project.description,
    })
    const handelTab = (e: string) => setActive(e)
    const [pending, setPending] = useState(false)
    return (
        <PageLayout title={'عقار'} subTitle={project.name}>
            <div className=" w-full max-h-[70px] flex  justify-between items-center flex-col  gap-[6px]  bg-slate-00 px-2 ">
                <SegmentedControl.Root defaultValue="0" value={active} onValueChange={handelTab} className='mt-1'>
                    <SegmentedControl.Item value="1">{'صور'}</SegmentedControl.Item>
                    <SegmentedControl.Item value="0">{'شقق'}</SegmentedControl.Item>
                    <SegmentedControl.Item value="2">{'بيانات'}</SegmentedControl.Item>
                </SegmentedControl.Root>
                {active === "1" ? (

                        <Btn
                            a={'bg-gray-100'}
                            b={'bg-gray-50'}
                            className='flex justify-center items-center w-ful aspect-square ms-auto rounded-full h-[30px]'
                            onClick={(e) => {
                            e.preventDefault()
                            if (ref.current?.click) {
                                ref.current?.click()
                            }
                        }}>
                            <Plus/>
                        </Btn>

                ) : active === "0" ? (
                    <div className="w-full flex-1 flex justify-end items-end  p-[2px]  h-[40px]">
                        <div className="flex gap-2 text-xs justify-self-end items-center ">
                            <div className="">متاح</div>
                            <div className="size-5 rounded-full overflow-clip">
                                <Button color='cyan' className="size-2 rounded-full"></Button>
                                {/*<div className=""></div>*/}
                            </div>
                            <div className="">محجوز</div>
                            <div className="size-5 rounded-full overflow-clip">
                                <Button color='violet' className="size-2 rounded-full"></Button>
                            </div>
                            <div className="">مبيوع</div>
                            <div className="size-5 rounded-full overflow-clip">
                                <Button color='bronze' className="size-2 rounded-full"></Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={'h-[20px]'}></div>
                )}
            </div>
            <div className="h-2"></div>
            <div className="bg-slate-100  overflow-auto rounded-md shadow  ms-1 px-1 py-2   h-[calc(100vh-190px)] md:h-[calc(100vh-225px)]"
                 dir={'rtl'}
            >
                {active === "0" ? (
                    <>
                        <div className="flex flex-col bg-blue-00">
                            {project.floors.map((fl) => (
                                    <FloorCard fl={fl} key={fl.id}>
                                        {fl.apartments.map((ap) => (

                                            <ApartmentCard open={data.apartment_id} onClick={(t: string) => setData(c => ({
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
                        <>
                            <div
                                onClick={() => setData(c => ({...c, 'apartment_id': 0, customer_id: '',create_customer: "0"}))}
                                className={`h ${data.apartment_id != 0 ? 'fadein' : 'fadeOut'}
                                transition-all fixed z-10 top-0 right-0   justify-center items-center bg-slate-900 opacity-50
                                h-screen w-screen `}>

                            </div>
                            <div className={`h ${data.apartment_id != 0 ? 'fadein' : 'fadeOut'}  absolute bg-white z-20 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-lg  px-4 py-3 pb-6`}>
                                <div className='flex flex-col gap-1 w-56 relative' onClick={(e) => e.stopPropagation()}>
                                    {data.type != 'cancel' ? (
                                        <>
                                            <label className=' p-2 text-center '>{'العملية'}</label>
                                            <SegmentedControl.Root className={'z-20'} value={data.type}
                                                                   onValueChange={(e) => setData('type', e)}
                                                                   onClick={(e) => e.stopPropagation()}>
                                                <SegmentedControl.Item value="sell">{'بيع'}</SegmentedControl.Item>
                                                <SegmentedControl.Item value="book">{'حجز'}</SegmentedControl.Item>
                                            </SegmentedControl.Root>


                                            <div className="h-2"></div>
                                            <label className=' p-1 '>{'العميل'}</label>
                                            <SegmentedControl.Root className={'z-20'} value={data.create_customer}
                                               onValueChange={(e) =>setData('create_customer', e)}
                                                                   onClick={(e) => e.stopPropagation()}>
                                                <SegmentedControl.Item value="1">{' جديد'}</SegmentedControl.Item>
                                                <SegmentedControl.Item value="0">{' سابق'}</SegmentedControl.Item>
                                            </SegmentedControl.Root>

                                            <div className="h-2"></div>
                                            {data.create_customer==="0"?(

                                            <select className={'focus:ring-0 rounded-lg  overflow-x-hidden'}
                                                    value={data.customer_id}
                                                    onChange={(e) => setData('customer_id', e.target.value)}>
                                                <option></option>
                                                {customers.map((c) => (
                                                    <option key={c.id} value={c.id}
                                                            className={'rounded-lg  cursor-pointer '}>{c.name}  </option>

                                                ))}
                                            </select>
                                            ):(
                                                <>
                                                    <Input onChange={(e)=>setData('name',e.target.value)} error={errors.name} label={'الاسم'}/>
                                                    <Input onChange={(e)=>setData('address',e.target.value)} error={errors.address} label={'العنوان'}/>
                                                    <Input onChange={(e)=>setData('phone',e.target.value)} error={errors.phone} label={'الهاتف'}/>

                                                </>
                                            )}

                                        </>

                                    ) : (
                                        <div className="flex justify-center">

                                            <div className="text-center font-bold p-2 mt-2 w-fit  bg-slate-100 rounded"
                                            >تعيين كـ متاح !!
                                            </div>
                                        </div>
                                    )}


                                    <div className="pt-2 text-center flex justify-center items-center">
                                        {/*<Spinner loading={processing} size={'3'}/>*/}

                                    </div>
                                    <div className="h-2"></div>
                                    <div className="flex  gap-2 w-full">
                                        <button
                                            disabled={processing}
                                            className='    relative  flex-1 text-center rounded flex justify-center  bg-blue-500 text-gray-100  py-1'
                                            onClick={handelClick}

                                        >
                                            <span className="flex-1">
                                            {'تاكيد'}

                                            </span>
                                            <span className="">

                                            <Spinner className={'absolute translate-y-[10%] left-[5px] '} style={{position:'absolute'}} loading={processing} size={'3'}/>
                                            </span>
                                        </button>
                                        <button
                                            disabled={processing}
                                            onClick={() => setData(c => ({...c, 'apartment_id': 0, customer_id: ''}))}
                                            className='  flex-1 text-center rounded bg-gray-200 py-1'


                                        >
                                            {'الغاء'}
                                        </button>


                                    </div>
                                </div>
                            </div>
                        </>


                    </>

                ) : active === "1" ? (
                    <>

                        <div className="flex flex-wrap justify-center gap-4 ">

                            <ImageUploader  inpRef={ref} pId={project.id}/>

                            {project.media.map((img, i) => (
                                <div key={i} className="relative lg:w-[calc(96%/3)] ">
                                    <img src={img.original_url}/>
                                    <Btn
                                        a={'bg-red-400'}
                                        b={'bg-red-500'}

                                        disabled={pending}
                                        onClick={() => handelDelete(img.id)}
                                        className=' opacity-55 hover:opacity-100 absolute bg-red-400 top-0 text-gray-200 py-1 px-2  z-10 rounded'>

                                        <DeleteIcon/>
                                    </Btn>
                                </div>
                            ))}


                        </div>
                        <div className="h-5"></div>


                        <>
                            <div
                                onClick={() => setImgDel(0)}
                                className={`h ${imgDel != 0 ? 'fadein' : 'fadeOut'} transition-all fixed z-10 top-0 right-0   justify-center items-center bg-slate-900 opacity-50  h-screen w-screen `}>

                            </div>
                            <div
                                className={`h ${imgDel != 0 ? 'fadein' : 'fadeOut'}  absolute bg-white z-20 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-lg  px-4 py-6 pb-6`}>
                                <div className='flex flex-col gap-1 w-56 relative' onClick={(e) => e.stopPropagation()}>

                                    <div className="flex justify-center items-center font-bold p-2 mt-2  w-fit mx-auto bg-slate-100 rounded gap-2">

                                        <div className=""
                                        >تاكيد الحذف
                                        </div>
                                        <TrashIcon color={'red'} className={'text-red'}/>
                                    </div>

                                    <div className="pt-2 text-center flex justify-center items-center">
                                        <Spinner loading={pending} size={'3'}/>

                                    </div>
                                    <div className="h-2"></div>
                                    <div className="flex  gap-2 w-full">
                                        <Btn
                                            a={'bg-red-400'} b={'bg-red-500'}
                                            disabled={processing}
                                            className='  flex-1 text-center rounded  text-gray-100  py-1'
                                            onClick={()=>{
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


                    </>
                ) : (
                    <ProjectDetails form={detailsForm}/>


                )}
            </div>


        </PageLayout>
    )
}


const FloorCard = ({children, fl}: PropsWithChildren<{ fl: F }>) => {
    const [visible, setVisible] = useState<boolean>(true);
    return <>


        <div key={fl.id} className={'flex-1   relative pt- border'}>
            <div
                onClick={() => setVisible(c => !c)}
                className=" sticky w-[98%]  flex top-0 ring-0 bg-blue-00 justify-between  shadow bg-gray-50 p-2 m-1">
                <div className="">
                    {'الطابق '}: {fl.id}

                </div>
                <div className={'ms-auto'}>
                    {visible ? (
                        <ArrowDownIcon/>

                    ) : (
                        <ArrowLeft/>
                    )}
                </div>
                {/*<div className=""></div>*/}
            </div>
            <div className={`w-full justify-start gap-2   flex flex-wrap p-1 ${visible ? '' : 'hidden'}`}>
                {children}
            </div>
        </div>
    </>
}


type aa = InertiaFormProps<{ name: string; description: string; }>

const ProjectDetails: FC<{ form: aa }> = ({form}) => {
    const data = form.data

    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        form.setData('name', e.target.value)
    }
    const handelChange2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        form.setData('description', e.target.value)
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
                            onMouseDown={() => setD(true)} onMouseUp={() => setD(false)} disabled={form.processing}>
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
                        <img className='rounded   ' src={URL.createObjectURL(data.photo)}/>

                        <div className={`absolute  top-1/2 right-1/2  translate-x-1/2 -translate-y-1/2  w-full h-full bg-slate-900
                            ${progress ? (' opacity-40 ') : 'opacity-20'}
                            `}>
                        </div>
                        <div
                            className="absolute flex top-1/2 right-1/2  translate-x-1/2 -translate-y-1/2 gap-1 items-center  text-slate-100">


                            {progress ? (
                                <>
                                    <Spinner loading={processing} className='text-white'/>
                                </>
                            ) : (
                                <>
                                    <Delete color='red' onClick={() => {

                                    }} className='cursor-pointer'/>
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
    const a: 'violet' | 'bronze' | 'cyan' = `${ap.is_booked ? 'violet' : (ap.is_soled ? 'bronze' : 'cyan')}`
    return <Button

        color={a}
    >

        <div

            onClick={() => {
                if (ap.is_booked || ap.is_soled) {

                    onClick('cancel')
                }
                onClick('book')
            }}
            color=''

            className={` rounded text-center w-[calc(95vw/8)] py-2 cursor-pointer `}
        >
            <div className="">{ap.number}{ap.is_booked?'b':''}{ap.is_soled?'s':''}</div>

        </div>
    </Button>
}


const Tab: FC<{ name: string, active: boolean, onClick: () => void }> = ({name, active, onClick}) => {
    return (
        <div onClick={onClick}
             className={` rounded-lg p-2 shadow cursor-pointer transition-all  ${active ? 'bg-slate-200  ' : 'bg-slate-100 drop-shadow-lg'}`}>{name}</div>
    )
}
