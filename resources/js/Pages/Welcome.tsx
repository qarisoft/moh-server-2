import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {PropsWithChildren, useState} from "react";
import Index from './Projects/Index';
import Layout from '@/Layouts/Layout';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {

    return (
        <div >
                {/* <Index/> */}
        </div>
    );
}


const ProjectCard = () => {
    return 
}


