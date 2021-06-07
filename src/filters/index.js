
const dateFormat = (value, format) => {
  value = +value * 1000
  const date = new Date(value)
  const now = new Date().getTime()
  const diff = (now - date) / 1000
  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (format) {
    // return parseTime(time, option);
  } else {
    const datetime = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + date.getHours() + '时' + date.getMinutes() + '分'
    return datetime
  }
}

export {
  dateFormat
}
