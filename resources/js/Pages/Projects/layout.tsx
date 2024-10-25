import React, {FC, PropsWithChildren, ReactNode} from "react";
import Layout from "@/Layouts/Layout";

const PageLayout = ({children,header,title,subTitle,add}:PropsWithChildren<{header?:ReactNode,add?:ReactNode,title:string,subTitle?:string}>)=>{
    return     <Layout path={title}>
        <div className=" p-1 ">

            <div className="flex  justify-between items-center px-1">
                <div className="flex items-center">

                <div className="font-bold p-2 my-1 md:my-2 ">{title}</div>
                {subTitle&&(

                    <>
                    <span className=" mx-1 ">/</span>
                    <span className="  ">{subTitle}</span>
                    </>
                )}
                </div>
                <div className="">
                        {add}

                </div>

            </div>


            <div className=" rounded  ">

                {header}
                <div className="md:ps-2 lg:ps-4">

                    {children}
                </div>


            </div>
        </div>
    </Layout>
}



export default PageLayout;
