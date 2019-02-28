const axios = require('axios')
const parse = require('parse-link-header')
const fs = require('fs')
const get = require('lodash/get')

async function getAllVisibleLessons(url) {
  const result = await axios.get(url)
  const lessons = result.data
  const nextUrl = get(parse(result.headers.link), 'next.url')

  if (nextUrl) {
    const moreLessons = await getAllVisibleLessons(nextUrl)
    return [...lessons, ...moreLessons]
  }

  return lessons
}

async function run() {
  const type = 'podcasts'
  const lessons = await getAllVisibleLessons(
    `https://egghead.io/api/v1/${type}?page=1&per_page=5`,
  )

  fs.writeFile(
    `${type}.json`,
    JSON.stringify(lessons, null, 2),
    'utf8',
    () => {},
  )
}

run()
