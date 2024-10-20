import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Project } from './Index'
import Layout from '@/Layouts/Layout'
import { Button, SegmentedControl, Spinner,Select, Badge } from '@radix-ui/themes'
import { Switch } from '@headlessui/react'
import { router, useForm } from '@inertiajs/react'
import { toast } from 'sonner'
import { Delete, DeleteIcon, Pen, Plus, RefreshCcw, Upload } from 'lucide-react'
import { error } from 'console'
// import { toast } from '@/Components/hooks/use-toast'
// import { ToastAction } from '@/Components/ui/toast'

// import * as Select from "@radix-ui/themes";

type F={

}
type Ap={

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
type P = Project &{
    floors:F[]
    apartments:Ap[]
    media:Media[]
}

type Customer={
    id: number,
    name:       string,
    address:    string,
    phone:      string,
    created_at: string,
    updated_at: string
}
type Media={
    id:number
    preview_url:string
    original_url:string
}
export default function Show({project,customers}:{project:P,customers:Customer[]}) {
    console.log(project.media);
    
    const [active,setActive]=useState('0')
    const [images,setImages]=useState([project.media.length])

    const {data,setData,post,processing,errors,reset,clearErrors} = useForm({
        customer_id:'',
        type:'book',
        apartment_id:0,
    })

    const handelClick = (e:any)=>{
        e.preventDefault()
        const path = `projects.${data.type}`
        console.log(path);
        
        
        post(route(path,data.apartment_id),{
            onSuccess:()=>{
                setData(c=>({...c,apartment_id:0,customer_id:'',type:'book'}))
                toast.success("Event has been created.")
            },
            onError:(e)=>{
                console.log(e);
                
                toast.error(`${Object.values(e)}`)
            }
            })
    }
    const ref = useRef<HTMLInputElement>()
    const handelDelete=()=>{

    }
  return (
    <Layout path='عقارات' sub={project.name}>

        <div className=" w-full h-[2vh] flex  justify-between items-center bg-slate-00 pt-2">
            <SegmentedControl.Root defaultValue="0" value={active} onValueChange={(e)=>setActive(e)} className='mt-1'>
                <SegmentedControl.Item value="1">{'صور'}</SegmentedControl.Item>
                <SegmentedControl.Item value="0">{'شقق'}</SegmentedControl.Item>
            </SegmentedControl.Root>

                <div className="flex justify-end p-2">
                    {/* <label htmlFor='upload' className='cursor-pointer'> */}
                    <Badge className='rounded-full ' onClick={(e)=>{
                            e.preventDefault()
                            if(ref.current?.click){
                                ref.current?.click()
                            }
                    }}>

                    <Plus    />
                    </Badge>

                </div>
        </div>

        <div className="h-4"></div>
        
        {active==="0"?(
        <>
        <div className="flex justify-end bg-white h-[2vh]">
            <div className="flex gap-2 text-xs justify-self-end bg-white">
                <div className="">متاح</div>
                <div className="size-5 rounded-full overflow-clip">
                    <Button color='cyan'  className="size-2 rounded-full"></Button>
                    <div className=""></div>
                </div>
                    <div className="">محجوز</div>
                <div className="size-5 rounded-full overflow-clip">
                    <Button color='bronze'  className="size-2 rounded-full"></Button>
                </div>
                    <div className="">مبيوع</div>
                <div className="size-5 rounded-full overflow-clip">
                    <Button color='violet'  className="size-2 rounded-full"></Button>
                </div>
            </div>
        </div>
        <div className="bg-slate-50 h-[86vh] overflow-auto rounded-md shadow flex  flex-wrap gap-4  justify-evenly py-6  px-2 ">
            {project.apartments.map((ap)=>(
                <ApartmentCard  open={data.apartment_id} onClick={(t:string)=>setData(c=>({'apartment_id':ap.id,type:(ap.is_booked || ap.is_soled)?'cancel':'book',customer_id:c.customer_id}))} ap={ap} key={ap.id}/>
            )
            )}


                <>
                <div 
                onClick={()=>setData(c=>({...c,'apartment_id':0,customer_id:''}))}
                    className={`h ${data.apartment_id!=0?'fadein':'fadeOut'} transition-all absolute z-10 top-0 right-0 justify-center items-center bg-slate-900 opacity-50  h-screen w-screen `}>
                        
                </div>
                <div className={`h ${data.apartment_id!=0?'fadein':'fadeOut'}  absolute bg-white z-20 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-lg  p-2`}>
                        <form className='flex flex-col gap-1 w-56'>
                            {data.type!='cancel'?(

                                <>
                                <SegmentedControl.Root  value={data.type} onValueChange={(e)=>setData('type',e)}>
                                <SegmentedControl.Item value="sell">{'بيع'}</SegmentedControl.Item>
                                <SegmentedControl.Item value="book">{'حجز'}</SegmentedControl.Item>
                                </SegmentedControl.Root>
                            
                            <label className=' p-1 '>{'العميل'}</label>
                                    <Select.Root    dir='rtl' onValueChange={(e)=>{
                                        setData('customer_id',e)
                                        clearErrors('customer_id')
                                    }} value={data.customer_id}>
                                    <Select.Trigger ></Select.Trigger>
                                        <Select.Content>

                                {customers.map((c)=>(
                                    <Select.Item value={c.id.toString()} key={c.id} dir='rtl'>{c.name}</Select.Item>
                                ))}
                                        </Select.Content>
                                    <div className="text-xs text-red-600">{errors.customer_id?'مطلوب':''}</div>

                                </Select.Root>
                                </>

                            ):(
                                <div className="flex justify-center">

                                <div className="text-center font-bold p-2 mt-2 w-fit  bg-slate-100 rounded"
                                >تعيين كـ متاح !! </div>
                                </div>
                            )}
                            
                            
                            <div className="pt-2 text-center flex justify-center items-center">
                                <Spinner  loading={processing} size={'3'} />

                            </div>
                            <div className="h-2"></div>
                            <div className="flex  gap-2">
                                <Button className='w-full'  style={{ width:'100%' }} onClick={handelClick}
                                
                                >
                                    {'save'}
                                </Button>
                                {/* <Button variant='outline' onClick={()=>setData(c=>({...c,'apartment_id':0,customer_id:'0'}))}>
                                    {'cancel'}
                                </Button> */}

                            </div>
                        </form>
                </div>
            </>
            


        </div>
        </>

        ):(
            <div className="flex flex-wrap h-[86vh] overflow-auto gap-1">
                    

                    <ImageUploader deleteImge={handelDelete} inpRef={ref} pId={project.id} />

                {project.media.map((img,i)=>(
                    <div key={i} className="relative lg:w-[calc(96%/3)] ">
                        <img src={img.original_url}/>
                        <DeleteIcon onClick={()=>router.delete(route('projects.delete.image',img.id))}  size={40} className=' opacity-55 hover:opacity-100   absolute bg-red-400 top-0 text-gray-200 p-2 z-10 cursor-pointer '>
                        {/* {img.id} */}
                        </DeleteIcon>
                    </div>
                ))}


                <div className="h-5"></div>
                

            </div>
        )}

    </Layout>
  )
}


const ImageUploader:FC<{pId:number,image?:string,inpRef:any,deleteImge:()=>void}> = ({pId,image,inpRef,deleteImge})=>{
    const {data,setData,post,processing,progress,reset,errors} = useForm<{photo:File|null,uploaded:boolean,project_id:number}>({
        photo:null,
        project_id:pId,
        uploaded:false
    })
    const upload = ()=>{
        post(route('projects.add.photo',pId),{

            method:'put',
            only:[''],
            onSuccess:()=>{
                setData('uploaded',true)
                reset('photo')
            }
        })
    }
    useEffect(()=>{
        if (data.photo) {
            upload()
        }
    },[data.photo])
    // console.log(errors);
    
    return   <div className="relative w-full flex flex-col  p-2 text-center items-start justify-cente justify-between">
    
            {data.photo?(
                <>
                    <img className='rounded' src={URL.createObjectURL(data.photo)}   />

                        <div className={`absolute  top-1/2 right-1/2  translate-x-1/2 -translate-y-1/2  w-full h-full bg-slate-900  
                            ${progress?(' opacity-40 '):'opacity-20'}
                            `}>
                        </div>
                        <div className="absolute flex top-1/2 right-1/2  translate-x-1/2 -translate-y-1/2 gap-1 items-center  text-slate-100">


                        {progress ?(
                            <>
                        <Spinner loading = {processing}  className='text-white'  />
                        </>
                        ):(
                            <>
                            <Delete color='red' onClick={()=>{
                                deleteImge()
                                
                            }} className='cursor-pointer' />
                            {!data.uploaded&&(

                                <Upload className='cursor-pointer' onClick={upload}/>
                            )}
                            </>
                            
                        )}
                        </div>
                </>
            ):(
                    <input type='file' 
                    id='upload'
                    className='w-fit'
                    ref={inpRef}

                    onChange={(e)=>{
                        const a = e.target.files
                        if(a?.length){
                            const photo = a[0]
                            setData('photo',photo)
                            console.log(data.photo);
                            
                        }
                    }} 
                    hidden
                    />
            )}
            </div>
}

const ApartmentCard:FC<{ap:Ap,onClick:(t:string)=>void,open:number}> = ({ap,onClick,open}) =>{
    const a:'violet'|'bronze'|'cyan' = `${ap.is_booked?'violet': (ap.is_soled?'bronze': 'cyan')}`
    return  <Button 
    
    color={a}
    >

    <div 
    
    onClick={()=>{
        if(ap.is_booked || ap.is_soled){

            onClick('cancel')
        }
        onClick('book')
    }} 
    color=''
    
    className={` rounded text-center w-[calc(95vw/8)] py-2 cursor-pointer `}
    >
        <div className="">{ap.number}</div>

    </div>
        </Button>
}


const Tab:FC<{name:string,active:boolean,onClick:()=>void}> = ({name,active,onClick}) =>{
  return (
    <div  onClick={onClick}  className={` rounded-lg p-2 shadow cursor-pointer transition-all  ${active?'bg-slate-200  ':'bg-slate-100 drop-shadow-lg'}`}>{name}</div>
  )
}
