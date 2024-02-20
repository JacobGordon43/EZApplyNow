import { cn } from "@/lib/utils"
import { Box, Typography } from "@mui/material"
import { setSkills } from "@/redux/features/forms/skillsSlice"
import { useAppSelector, AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
interface SkillBox {
    text : string,
    onClick ?: React.MouseEventHandler

}

export default function SkillBox({text, onClick} : SkillBox){
    const dispatch = useDispatch<AppDispatch>();
    return(
        <Box className={cn("bg-[#eee] flex w-fit")}>
            <Typography className="text-center p-3">{text}</Typography>
            <button className="hover:bg-[#cfcfcf] p-3 h-full font-semibold text-lg" onClick={onClick}>X</button>
        </Box>
    )
}