export const boxCreatorStyle = (height: number, width: number = 420) => {
  return {
    display: 'flex',
    flexWrap: 'wrap',
    '& > :not(style)': {
      m: 1,
      width: width,
      height: height,
      margin: '50px auto',
    },
  }
}
