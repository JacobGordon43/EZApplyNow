import { validateEmail, validatePassword } from "./validation";
import {describe, expect, test} from '@jest/globals';
//Testing email validation
test("example@gmail.com is a valid email", ()=>{
    expect(validateEmail("example@gmail.com")).toBe(true)
})

test("example43@gmail.com is a valid email", ()=>{
    expect(validateEmail("example43@gmail.com")).toBe(true)
})

test("examplegmail.com is not a valid email", ()=>{
    expect(validateEmail("examplegmail.com")).toBe(false)
})

test("example@gmail is not a valid email", ()=>{
    expect(validateEmail("example@gmail")).toBe(false)
})

test("example@gmail. is not a valid email", ()=>{
    expect(validateEmail("example@gmail.")).toBe(false)
})

//Testing password validation
test("P@ssword43 is a valid password", ()=>{
    expect(validatePassword("P@ssword43")).toBe(true)
}) 

test("p@ssword43 is not a valid password", ()=>{
    expect(validatePassword("p@ssword43")).toBe(false)
}) 

test("Password43 is not a valid password", ()=>{
    expect(validatePassword("Password43")).toBe(false)
}) 

test("Password is not a valid password", ()=>{
    expect(validatePassword("Password")).toBe(false)
})

test("12345 is not a valid password", ()=>{
    expect(validatePassword("12345")).toBe(false)
})