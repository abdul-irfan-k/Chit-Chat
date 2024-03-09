// import gsap from "gsap"

// export const horizontalLoop = (items, config) => {
//   const itemsArray = gsap.utils.toArray(items)
//   const itemLength = itemsArray.length

//   const t1 = gsap.timeline({
//     repeat: -1,
//     defaults: { ease: "none" },
//     onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
//   })

//   const xPresent = []
//   const widths = []
//   const xPercents = []
//   const snap = gsap.utils.snap(1)

//   for (let i = 0; i < itemLength; i++) {
//     const item = itemsArray[i]
//     gsap.set(itemsArray, {
//       xPercent: (i, el) => {
//         widths[i] = parseFloat(gsap.getProperty(el, "width", "px"))
//         xPercents[i] = snap(
//           (parseFloat(gsap.getProperty(el, 'x', 'px')) / widths[i]) * 100 +
//             gsap.getProperty(el, 'xPercent')
//         );
//         console.log("widt"+gsap.getProperty(el, 'x', 'px'))
//       },
//     })
//   }
//   gsap.set(itemsArray, { x: 0 })

//   // const totalWidth = itemsArray[itemLength -1].offsetLeft +
// }
