import React from 'react';
import { User } from "@nextui-org/user";
import { Dropdown, Link, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export const Navbar = ({ tittle = "miller" }) => {
    return (
        <>
            <nav className="sticky hidden top-0 z-20 lg:flex w-full flex-wrap items-center justify-between border-b bg-zinc-900 lg:py-2 shadow-md">
                <div className="flex w-full flex-wrap items-center justify-between px-3">
                    <div>
                        <img className='w-16 h-16 rounded-full' src="logo.webp" alt="Logo" />
                    </div>

                    <h2 className='p-2 font-semibold text-white dark:text-zinc-100 text-5xl text-center'>CrossFit Challenge Pro</h2>

                    <Dropdown backdrop="opaque">
                        <DropdownTrigger>
                            <User


                            className='text-white'
                                name="Miller Rivera"
                                description="Administrador"
                                avatarProps={{
                                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                                }}
                            />


                        </DropdownTrigger>
                        <DropdownMenu variant="faded" aria-label="Static Actions">
                            <DropdownItem key="new">New file</DropdownItem>
                            <DropdownItem key="copy">Copy link</DropdownItem>
                            <DropdownItem key="edit">Edit file</DropdownItem>
                            <DropdownItem key="delete" className="text-danger" color="danger">
                                Delete file
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </nav>
        </>
    );
}
