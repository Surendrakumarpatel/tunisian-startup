"use client";
import { business } from '@/app/page';
import OffreDetailsComponent from '@/components/OffreDetailsComponent'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const params = useParams();
    const id = params.id;
    const singleBusiness = business.filter((item)=>{
        return item._id === id;
    });
    return (
        <div> 
            <OffreDetailsComponent  business = {singleBusiness[0]}/>
        </div>
    )
}

export default page