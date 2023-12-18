import { render, screen } from "@testing-library/react"
import {describe, expect, test, it} from '@jest/globals';
import Tutorial from "./page";
describe('Tutorial page', () => {
    it("should render", ()=>{
        const container = render(<Tutorial />)

        expect(container).toMatchSnapshot();
    })
});


