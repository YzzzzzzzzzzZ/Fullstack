const totalLikes = (blogs) => {
  const getSum = (total, num) => {
    return total + num.likes
  }
  return blogs.reduce(getSum, 0)
}

const favoriteBlog = (blogs) => {
  const getMax = (max, item) => {
    return max >= item.likes ? max : item.likes
  }

  return blogs.reduce(getMax, 0)
}

module.exports = {
  totalLikes,
  favoriteBlog,
}
