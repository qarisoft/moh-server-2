import Layout from '@/Layouts/Layout'
import { router } from '@inertiajs/react'
import React, { FC } from 'react'


export type Project={
    id:number 
    name:string
    is_active:boolean
    description:string
    created_at:string
    updated_at:string
}
type P=Project&{
    floors_count:number
    apartments_count:number
}
type Paginate<T>={
    data:T[]
}

function Index({data}:{data:Paginate<P>}) {
//   console.log(data);
  
    return (
    <Layout path={'العقارات'}>

            <div className=" rounded  ">

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

                <Data projects={data.data}/>
                <div className="hidden lg:block  ">
                    dsads ad d ds ds ds a asd ds sa d asd as
                </div>
        </div>
    </Layout>
  )
}


const Data:FC<{projects:P[]}> = ({projects}) => {
    return <div className="flex-1  h-[calc(100vh-145px)] overflow-y-auto ">
            {projects.map((p)=>{
                return <Row key={p.id} project={p}/>
            })}


    </div>
}


const Row:FC<{project:P}> = ({project})=>{
    const handelClick = ()=>{
        router.get(route('projects.show',project.id))
    }
    return <div className="  flex justify-between my-2 mx-2 border-b  " onClick={handelClick}>
            <div className="flex-1  flex justify-between items-center">
                <div className="flex-1">{project.name}</div>
                <div className="w-1/3 flex  ">

                    <div className="flex-1 ">{project.floors_count}</div>
                    <div className="flex-1 text-center">{project.apartments_count}</div>
                </div>
            </div>
            <div className="p-2  text-end">...</div>
        </div>
}



export default Index