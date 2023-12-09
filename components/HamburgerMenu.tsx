'use client';
import React from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Box } from "lucide-react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { Typography } from "@mui/material";

export default function Menu(){
    return(
<Sheet>
  <SheetTrigger className="tablet:hidden grid h-10 m-3">
    <div className="bg-black w-12 h-1"/>
    <div className="bg-black w-12 h-1"/>
    <div className="bg-black w-12 h-1"/>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>
        <Typography fontFamily={"League Gothic"}>EZApply</Typography>
      </SheetTitle>
      <SheetDescription>
        Making applying for jobs easier
      </SheetDescription>
      <NavigationMenu.Root className="flex w-screen h-screen">
        <NavigationMenu.List className="flex flex-col w-screen">
          <Link href={"/"} className="w-full py-10 hover:bg-slate-50">
            <NavigationMenu.Item>
                    Home
            </NavigationMenu.Item>
          </Link>    
          <Link href={"/tutorial"} className="w-full py-10 hover:bg-slate-50">
            <NavigationMenu.Item>
                    Tutorial
            </NavigationMenu.Item>
          </Link>    
          <Link href={"/login"} className="w-full py-10 hover:bg-slate-50">
            <NavigationMenu.Item>
                    Login
            </NavigationMenu.Item>
          </Link>    
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </SheetHeader>
  </SheetContent>
</Sheet>
    )
}