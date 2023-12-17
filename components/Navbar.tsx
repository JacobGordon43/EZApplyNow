'use client';

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
//A navbar that uses Radix to create it's architecture. Additional styling is added for giving it a simple but modern look. Next's Link is used to provide navigation to different pages
export default function Navbar(){
    return(
        <NavigationMenu.Root className="hidden tablet:flex">
            <NavigationMenu.List className="flex flex-row">
                <NavigationMenu.Item className = "mx-2 px-2 py-1">
                        <Link href={"/"}>Home</Link>    
                </NavigationMenu.Item>
                <NavigationMenu.Item className = "mx-2 px-2 py-1">
                        <Link href={"/tutorial"}>Tutorial</Link>    
                </NavigationMenu.Item>
                <NavigationMenu.Item className = "mx-2 px-2 py-1">
                        <Link href={"/login"}>Login</Link>    
                </NavigationMenu.Item>
            </NavigationMenu.List>
        </NavigationMenu.Root>
    )
}