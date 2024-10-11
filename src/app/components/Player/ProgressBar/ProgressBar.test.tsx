import ProgressBar from "./ProgressBar"

import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"


describe("ProgressBar", () => {
    it("there is an input with 30 seconds on the screen", () => {
        render(<ProgressBar max={60} value={30} step={1} onChange={() => {}} />)

        const input = screen.queryByDisplayValue(30)
        expect(input).toBeInTheDocument()
    })

    it("there is not an input with 90 seconds on the screen", () => {
        render(<ProgressBar max={60} value={30} step={1} onChange={() => {}} />)

        const input = screen.queryByDisplayValue(90)
        expect(input).not.toBeInTheDocument()
    })
})
