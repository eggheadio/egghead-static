export default function convertTimeTo(timeInSeconds) {
  const hours = ~~(timeInSeconds / 3600)
  const mins = ~~((timeInSeconds - hours * 3600) / 60)
  // const secs = (timeInSeconds - hours * 3600 - mins * 60) % 60

  if (hours > 0) {
    return `${hours}h ${mins}m`
  } else if (mins > 0) {
    return `${mins}m`
  }
}
