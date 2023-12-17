import TopSection from "@/components/TopSection";
import { Box, Typography } from "@mui/material";
import {TextInput, PasswordInput} from "@/components/InputFields";
import Button from "@/components/Button";
import Link from "next/link";

//Signup page, used for creating accounts.
export default function SignUp(){
    return(
        <Box>
            <TopSection title="Create an Account"/>
            <form className="mt-4 w-11/12 m-auto tablet:w-96">
                <TextInput label ="Email" placeholder ="example@gmail.com"/>
                <PasswordInput label="Password"/>
                <PasswordInput label="Confirm Password"/>

                <Box className="flex flex-col mt-3 tablet:flex-row justify-between">
                    <Button text="Sign Up" className="px-3"/>
                    <Typography className="self-center">Already have an account? Login <Link href={"/login"} className="text-purple-900 underline">here</Link></Typography>
                </Box>

            </form>
        </Box>
    )

}