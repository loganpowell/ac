import { Flipper } from "flip-toolkit"
const container = document.querySelector(".container")
const square = document.querySelector(".square")
const innerSquare = document.querySelector(".inner-square")

const flipper = new Flipper({ element: container })

// add flipped children to the parent
flipper.addFlipped({
  element: square,
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
