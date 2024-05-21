import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react";



export const CardComponent = ({ img, title, des, icono   }) => {
    return (
        <>
            <Card className="relative w-full h-[230px] 2xl:w-[400px]  2xl:h-[300px] hover:scale-105 duration-300 transition-all">
                <div className="relative w-full h-full bg-white">
                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <p className="2xl:text-2xl text-gray-900 uppercase font-bold">{title}</p>
                        <h4 className="text-gray-700 font-medium 2xl:text-xl">{des}</h4>
                    </CardHeader>
                    {/* <Image
                        removeWrapper
                        alt="Relaxing app background"
                        className="z-0 w-full h-full object-cover brightness-90 hover:brightness-100 transition-all duration-300"
                        // src={img}
                    /> */}


                    <div className="w-72 h-52 rotate-45 bg-blue-400 absolute -right-40 2xl:-right-36 -top-20">

                    </div>

<div className="flex justify-center items-center h-full w-full">
<i className={`${icono} text-6xl 2xl:text-9xl`}></i>
</div>

                    
                    <CardFooter className="absolute bg-white bottom-0 z-10 border-t-1 border-gray-300">
                        <div className="flex flex-grow gap-2 items-center">
                            <Image
                                alt="Breathing app icon"
                                className="rounded-full w-10 h-10 bg-white"
                                src={img}
                            />
                            <div className="flex flex-col">
                                <p className="text-tiny text-gray-600">CrossFit Challenge</p>
                                <p className="text-tiny text-gray-600">are you ready?</p>
                            </div>
                        </div>
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white" radius="full" size="sm">Comenzar</Button>
                    </CardFooter>
                </div>
            </Card>
        </>
    );
}
