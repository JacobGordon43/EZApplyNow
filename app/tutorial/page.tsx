import Footer from "@/components/Footer";
import GetStarted from "@/components/GetStarted";
import TextSection from "@/components/TextSection";
import TopSection from "@/components/TopSection";
import { Box } from "@mui/material";

//Tutorial page for telling users the process of using the software, from creating an account to applying.
export default function Tutorial(){
    return(
        <Box className="flex flex-col text-center">
            <TopSection title="Tutorial" />
            <Box>

                <TextSection title="Create an Account" text="The first start to creating a qucker and easier job applicaiton experience is to create an account with us!" className="my-10" titleClassName="text-3xl"/>
                
                <TextSection title="Fill Out Your Information" text="Once you've made an account, you fill out your job application, including your personal info, work history, education, and so on."
                 titleClassName="text-3xl" className="my-10 tablet:flex-row-reverse"/>
                
                <TextSection title="Download the Desktop App" text="You'll need to download our desktop application and sign in." className="my-10" titleClassName="text-3xl"/>
                
                <TextSection title="Specify Job Related Information" text="Upload job specific details that you might need to on the desktop application, including if you've worked for them and so on." 
                className="my-10 tablet:flex-row-reverse" titleClassName="text-3xl"/>
                
                <TextSection title="Get to Applying" text="Finally, let it all pay off by putting in a link to an application and let out software do the rest for you! 
                It'll pause if it runs into unexpected inputs and/or can't submit a job application successfully for whatever reason. But otherwise, just sit back and relax!" className="mt-10" titleClassName="text-3xl"/>

            </Box>
            <GetStarted />
            <Footer />
        </Box>
    )
}