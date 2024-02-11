import { render, screen } from "@testing-library/react"
import {describe, expect, test, it} from '@jest/globals';
import FormDropdown from "./Accordion";
import PersonalForm from "./forms/personalForm";

describe('Home page', () => {
    it("should render", ()=>{
        const container = render(<FormDropdown value="personalForm" text="Personal Information"><PersonalForm /></FormDropdown>)
        
        expect(container).toMatchSnapshot();
    })
});


