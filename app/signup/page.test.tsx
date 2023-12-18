import { render, screen } from "@testing-library/react"
import {describe, expect, test, it} from '@jest/globals';
import Signup from "./page";
describe('Signup page', () => {
    it("should render", ()=>{
        const container = render(<Signup />)

        expect(container).toMatchSnapshot();
    })
});


