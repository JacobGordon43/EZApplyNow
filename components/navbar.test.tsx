import { render, screen } from "@testing-library/react"
import {describe, expect, test, it} from '@jest/globals';
import Navbar from "./Navbar";

describe('Home page', () => {
    it("should render", ()=>{
        const container = render(<Navbar />)

        expect(container).toMatchSnapshot();
    })
});


