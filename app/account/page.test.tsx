import { render, screen } from "@testing-library/react"
import {describe, expect, test, it} from '@jest/globals';
import Account from "./page";
import { ReduxProvider } from "@/redux/provider";
describe('Account page', () => {
    it("should render", ()=>{
        const container = render(    
        <html lang="en">
            <body className={"bg-white"}><ReduxProvider><Account /></ReduxProvider></body>
        </html>)

        expect(container).toMatchSnapshot();
    })
});


