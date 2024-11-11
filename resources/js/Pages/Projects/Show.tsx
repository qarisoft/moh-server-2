import React, {FC, useState,} from "react";
import {useForm} from "@inertiajs/react";
import PageLayout from "@/Pages/Projects/layout";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/Components/ui/taps";
import {Customer, Media, P} from "@/types";
import {ProjectDetails} from "./components/project-details";
import ApartmentsTap from "./components/apartments-tap";
import PhotoTap from "@/Pages/Projects/components/photo-tap";

export default function Show({
                                 project,
                                 customers,
    media
                             }: {
    project: P;
    customers: Customer[];
    media:Media[]
}) {

    console.log(project)
    const [active, setActive] = useState("0");






    const dForm = useForm("edit_project", {
        name: project.name,
        description: project.description,

    });
    const handelTab = (e: string) => setActive(e);

    const cl =
        "bg-slate-100  overflow-auto rounded-md shadow h-[calc(100vh-190px)] md:h-[calc(100vh-225px)]";



    return (
        <PageLayout title={"عقار"} subTitle={project.name}>
            <div
                className=" w-full max-h-[70px] flex  justify-between items-center flex-col  gap-[6px]  bg-slate-00 px-2 ">
                <Tabs
                    defaultValue={active}
                    className="w-full text-center"
                    onValueChange={handelTab}
                    dir={"rtl"}
                >
                    <TabsList>
                        <TabsTrigger value="1">{"صور"}</TabsTrigger>
                        <TabsTrigger value="0">{"شقق"}</TabsTrigger>
                        <TabsTrigger value="2">{"بيانات"}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="1">
                            <PhotoTap cl={cl} projectId={project.id} customers={customers} media={media}/>
                    </TabsContent>
                    <TabsContent value="0" className={""}>
                        <ApartmentsTap
                            customers={customers}
                             cl={cl} floors={project.floors}
                                       projectId={project.id}

                        />
                    </TabsContent>
                    <TabsContent value={"2"} className={cl}>
                        <ProjectDetails
                            setData={dForm.setData}
                            data={dForm.data}
                            processing={dForm.processing}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </PageLayout>
    );
}



const Test:FC<{media:any}> = ({media}) => {
    console.log(media)
    return (
        <div>
            {'media.'}
        </div>
    );
};

// export default Show;
