"use client"
import * as Accordion from '@radix-ui/react-accordion';
import PersonalForm from "@/components/forms/personalForm"
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropDownProps{
    children : React.ReactNode | React.ReactNode[],
    text : string,
    value: string
}

export default function FormDropdown({children, text, value} : DropDownProps){
    return(
        <Accordion.Root type='single' collapsible className={cn("w-11/12 max-w-[800px] m-auto")}>
            <Accordion.Item value={value}>
                <Accordion.Header className='my-5 py-2 w-full bg-[#2DC653]'>
                    <Accordion.Trigger className='AccordionTrigger flex w-full'>
                        <span className="pl-2 float-right grow text-left">{text}</span>
                        <ChevronDownIcon className="AccordionChevron w-14"/>
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content
                className='AccordionContent'>
                {children}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion.Root>
    )

}