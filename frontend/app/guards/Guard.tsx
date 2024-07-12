"use client"

import { useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { useReactiveVar } from "@apollo/client";
import authenticatedVar from "../authVar";
import getMe from "../hooks/useGetme";



interface GuardProps {
    children: JSX.Element;
    excludedRoutes?: string[];
}


const Guard = ({ children, excludedRoutes }: GuardProps) => {


    const { loading, error, data, refetch } = getMe.useGetMe()


    const pathname = usePathname()
    const router = useRouter()
    const authenticated = useReactiveVar(authenticatedVar)



    useEffect(() => {


        if (!excludedRoutes?.includes(pathname)) {
            refetch()
        }

    }, [pathname, refetch, excludedRoutes])


    useEffect(() => {

        if (!authenticated && !excludedRoutes?.includes(pathname)) {

            // clear all cached apollo data..

            //router.refresh()

            router.push('/login')


            // mutateFunction({
            //     variables:{
            //         "input":{


            //         }
            //     },onCompleted(data, clientOptions) {
            //         refetch()
            //     },
            // })

        }

    }, [authenticated, router, excludedRoutes])

    return (
        <>
            {
                excludedRoutes?.includes(pathname) ? (
                    children
                ) : (
                    <>
                        {data && children}
                    </>
                )
            }
        </>
    )

}

export default Guard

