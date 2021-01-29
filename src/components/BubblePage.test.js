import React from "react";
import { render, screen } from "@testing-library/react";
import BubblePage from "./BubblePage";


const data = [
  { 
    color: 'black',
    code: { 
      hex: '#00000'
    },
    id: 1
  },
  { 
    color: 'white',
    code: { 
      hex: '#FFFFFF'
    },
    id: 2
  },
];

// 1. Setup test for basic rendering of component
test("Renders BubblePage without errors", () => {
  // Finish this test
  render(<BubblePage colors={[]}/>)
});

// 2. Setup test for initial rendering of bubbles on loading
test("Fetches data and renders the bubbles on mounting", async () => {
  // Finish this test
  const {rerender} = render(<BubblePage colors={[]}/>)
  // arrange - bubble page renders & is loading with mock data
  rerender(<BubblePage colors={data} />);

  // act - find the text once the bubble page loads 
  const bubbles = await screen.findByTestId(/bubbles/i)
  // assert - the text should now exist in the document
  expect(bubbles).toBeInTheDocument()
});

//Task List

