import { Box, Typography } from "@mui/material";
import Menu from "./HamburgerMenu";
import Navbar from "./Navbar";
import { cn } from "@/lib/utils";

//A simple interface that is applied to the component, enforces that a title is necessary. The classNames are not required but can be applied for 
interface TopSectionProps{
    title : string,
    className ?: string,
    titleClassName ?: string
}

//This component is the top section of the page and includes the navbar/hamburger menu and a title
export default function TopSection({title, className, titleClassName} : TopSectionProps){
    return(
        <Box className={cn("flex flex-col bg-[#2DC653] justify-center items-center", className)}>
          <Navbar />
          {/* Displays the hamburger menu */}
          <Box className="flex flex-row-reverse w-screen">
            <Menu />
          </Box>
          <Box className="flex items-center h-64 text-center self-center">
            {/* <Typography className={cn("text-center text-6xl tablet:text-8xl desktop:text-9xl", titleClassName)} fontFamily={"League Gothic"} fontWeight={"900"}>{title.toUpperCase()}</Typography> */}
            <div className={cn("text-center font-['League_Gothic'] text-6xl tablet:text-8xl desktop:text-9xl", titleClassName)}>{title.toUpperCase()}</div>
          </Box>
      </Box>
    )
}