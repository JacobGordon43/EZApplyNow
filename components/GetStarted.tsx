import { Box } from "@mui/material";
import TextSection from "./TextSection";
import Button from "./Button";

export default function GetStarted(){
    return(
        <Box>
            <TextSection title='Get Started' 
            text='Why repeat submitting the same information time after time again? Put in your job application information once, 
            and let EZApply do the rest of the work! So let us help you get your next job!' className='tablet:flex-col mb-4' titleClassName='mb- text-4xl'/>
            <Button className="bg-[#EEEEEE] mx-auto mb-3" text='Create an Account'/>
        </Box>
    )
}