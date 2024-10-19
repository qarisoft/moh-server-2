// import React from 'react'

import { Theme } from "@radix-ui/themes";
import { FC, PropsWithChildren, useState } from "react";
import "@radix-ui/themes/styles.css";
import { Toaster } from "@/Components/ui/toast";
import icon from '@/assets/logo.jpeg'
import { Home, Hotel, Menu } from "lucide-react";
// import { Toaster } from "@/Components/ui/toaster";
export default function Layout({children, path, sub}:PropsWithChildren<{path:string,sub?:string}>) {
  return (
        < >
            <Theme >
            <div className="" dir={'rtl'}>


                <div className=" flex justify-between items-center  lg:hidden fixed bg-slate-00 border-b w-full px-2 py-[2px]">
                    <img src={icon} alt="" height={40} width={40} />
                    <div className="shadow-md rounded-md p-[3px]">
                        <Menu/>
                    </div>
                </div>
                <main className={'w-screen h-screen  flex relative  pt-[44px] lg:pt-0'} >

                    <SideBar/>

                    <div className=" flex-1  overflow-auto px-2 pt-2 ">
                        <div className={` w-full  `}>


                            <div className="flex p-2 gap-2 mb-1 max-h-[40px] border-b w-fit items-center">
                                <div className="font-bold  ">{path}</div>
                                {sub&&(
                                    <>
                                        <div className="font-bold  ">/</div>
                                        <div className="font-   ">{sub}</div>
                                    </>
                                )}
                            </div>
                            <Toaster richColors style={{ maxWidth:'20rem' }}/>
                            <div className="">

                                {children}
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </Theme>
        </>
  )
}
const MainContent = ({children}:PropsWithChildren)=> {
    return <div className=" flex-1  overflow-auto p-2">
    <div className={` w-full  `}>


        <div className="flex p-2 gap-2 my-2">
            <div className="">projects</div>
            {/* <div className="">/</div> */}
            {/* <div className="">project - 1</div> */}
        </div>
        {children}

    </div>
    </div>
}

const SideBar = () => {
    const [open, setOpen] = useState(true);


    return <div className={`w-[3rem] md:w-[20rem] ${open?'bg- w-[20rem]':'w-[3rem]'} flex flex-col gap-2 text-white p-[px] md:p-2 text-center md:text-start b shadow `}>
        <div className="text-sm py-4"></div>
        <SideBarItem active/>
        <SideBarItem/>
    </div>
}


const SideBarItem:FC<{active?:boolean}> = ({active=false})=>{
    return (
        <div className={`flex justify-center py-[6px] rounded hover:bg-slate-100 ${active?'bg-slate-100':''}`}>

            <div className={`${active?'bg-blue-600 hover:bg--100':'bg-white text-blue-600 '}  cursor-pointer  rounded-[12px]  shadow-lg drop-shadow-sm   p-[8px]  md:p-2  w-fit`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                </svg>

            </div>
        </div>
    )
}


