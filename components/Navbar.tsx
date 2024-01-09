'use client';

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useAppSelector } from "@/redux/store";
import { Box } from "@mui/material";
import { logout } from "@/redux/features/authSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import Button from "./Button";

//A navbar that uses Radix to create it's architecture. Additional styling is added for giving it a simple but modern look. Next's Link is used to provide navigation to different pages
//Uses radix for an account dropdown selection.
export default function Navbar(){
    const dispatch = useDispatch<AppDispatch>();
    const name = useAppSelector((state) => state.authReducer.value.name)
    return(
        <NavigationMenu.Root className="hidden tablet:flex w-screen justify-center">
            <NavigationMenu.List className="flex flex-row">
                <NavigationMenu.Item className = "mx-2 px-2 py-1">
                        <Link href={"/"}>Home</Link>    
                </NavigationMenu.Item>
                <NavigationMenu.Item className = "mx-2 px-2 py-1">
                        <Link href={"/tutorial"}>Tutorial</Link>    
                </NavigationMenu.Item>
                <NavigationMenu.Item className = "mx-2 px-2 py-1">
                        {(localStorage.length === 0) && <Link href={"/login"}>Login</Link>}
                        {(localStorage.length > 0) && 
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger asChild>
                                    <Box>Account</Box>
                                </DropdownMenu.Trigger>

                                <DropdownMenu.Portal>
                                    <DropdownMenu.Content className="min-w-[150px] bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}>
                                        <DropdownMenu.Item className="p-2 hover:bg-[#EEE] hover:rounded-t-md">
                                            <Link href={"/account"} className="w-full">Profile</Link>
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item className="p-2 hover:bg-[#EEE] hover:rounded-b-md">
                                            <button className="w-full" onClick={(e)=>{
                                                e.preventDefault();
                                                dispatch(logout());
                                                }}>Logout</button>
                                        </DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Root>
                        }
                </NavigationMenu.Item>
            </NavigationMenu.List>
        </NavigationMenu.Root>
    )
}