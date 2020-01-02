import { Flipper } from "flip-toolkit"

//
//  888~~  888     888 888~-_
//  888___ 888     888 888   \
//  888    888     888 888    |
//  888    888     888 888   /
//  888    888     888 888_-~
//  888    888____ 888 888
//
//

const container = document.querySelector(".container")
const square = document.querySelector(".square")
const innerSquare = document.querySelector(".inner-square")

const flipper = new Flipper({ element: container })

// add flipped children to the parent
flipper.addFlipped({
  element: square,
  // assign a unique id to the element
  flipId: "square",
  onStart: () => console.log("animation started!"),
  onSpringUpdate: springValue =>
    console.log(`current spring value: ${springValue}`),
  onComplete: () => console.log("animation completed!")
})

// to add an inverted child
// (so that the text doesn't warp)
// use this method with
// a reference to the parent element
flipper.addInverted({
  element: innerSquare,
  parent: square
})

square.addEventListener("click", () => {
  // record positions before they change
  flipper.recordBeforeUpdate()
  square.classList.toggle("big-square")
  // record new positions, and begin animations
  flipper.update()
})

//
//                           888
//   e88~~8e  888-~88e  e88~\888
//  d888  88b 888  888 d888  888
//  8888__888 888  888 8888  888
//  Y888    , 888  888 Y888  888
//   "88___/  888  888  "88_/888
//
//
