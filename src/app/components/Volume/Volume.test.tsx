import Volume from "./Volume";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";


describe("Volume", () => {
  const ref = createRef<HTMLAudioElement>();

  it("there is an input with half value of volume on the screen", () => {
    render(<Volume audioRef={ref} />);

    const input = screen.queryByDisplayValue(0.5);
    expect(input).toBeInTheDocument();
  });

  it("there is not an input with full value of volume on the screen", () => {
    render(<Volume audioRef={ref} />);

    const input = screen.queryByDisplayValue(1);
    expect(input).not.toBeInTheDocument();
  });
});
