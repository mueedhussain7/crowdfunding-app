import {FC}from 'react';

interface BadgeProps{
    title:string;
}
const Badge:FC<BadgeProps>=({title})=>{
    return(
        <span className="text-sm font-medium text-[#37FF87] bg-[#112928] border border-[#37FF87] rounded-full px-3 py-1">
                    {title}
    </span>
    )
}

export {Badge}