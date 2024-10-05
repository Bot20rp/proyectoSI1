import { useEffect } from "react"

export const useWindowScroll = () => {
 useEffect(()=>{
    window.scrollTo(0,0) ;
 },[])
}
