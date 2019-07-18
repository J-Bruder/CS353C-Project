// react needs requestAnimationFrame
golbal.requestAnimationFrame = callback => {
  setTimeout(callback,0)
}
