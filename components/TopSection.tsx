import { Box, Typography } from "@mui/material";
import Menu from "./HamburgerMenu";
import Navbar from "./Navbar";
import { cn } from "@/lib/utils";

interface TopSectionProps{
    title : string,
    className ?: string,
    titleClassName ?: string
}

export default function TopSection({title, className, titleClassName} : TopSectionProps){
    return(
        <Box className={cn("flex flex-col bg-[#2DC653] justify-center items-center", className)}>
        <Navbar />
        <Box className="flex flex-row-reverse w-screen">
          <Menu />
        </Box>
        <Box className="flex items-center h-64">
          <Typography className={cn("text-5xl tablet:text-8xl desktop:text-9xl", titleClassName)} fontFamily={"League Gothic"} fontWeight={"900"}>{title.toUpperCase()}</Typography>
        </Box>
      </Box>
    )
}