import { render, screen } from "@testing-library/react"
import {describe, expect, test, it} from '@jest/globals';
import Home from "./page";
describe('Home page', () => {
    it("should render", ()=>{
        const container = render(<Home />)

        expect(container).toMatchSnapshot();
    })
});


