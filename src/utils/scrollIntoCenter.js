export const scrollIntoView = element => {
  const elementRect = element.getBoundingClientRect()
  const absoluteElementTop = elementRect.top
  // align type
  const middleDiff = elementRect.height / 2
  // 要素の中心のY座標
  const scrollTopOfElement = absoluteElementTop + middleDiff
  // 画面半分を引くと、要素の中心が、画面の中央になる
  const scrollY = scrollTopOfElement - window.innerHeight / 2
  window.scrollTo(0, scrollY)
}
