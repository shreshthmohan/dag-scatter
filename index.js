/* global d3 */
// https://www.upwork.com/nx/find-work/saved-jobs/details/~01c29c55de5b8c3ff3?pageTitle=Job%20Details&_navType=slider&_modalInfo=%5B%7B%22navType%22%3A%22slider%22,%22title%22%3A%22Job%20Details%22,%22modalId%22%3A%221652368813597%22%7D%5D

const width = 700
const height = 700

const margins = { top: 20, left: 40, right: 20, bottom: 40 }

const innerWidth = width - margins.left - margins.right
const innerHeight = height - margins.top - margins.bottom

const canvas = d3
  .select('#chart')
  .append('canvas')
  .style('border', '1px solid gray')
  .attr('id', 'canvas')
  .attr('width', width)
  .attr('height', height)

const context = canvas.node().getContext('2d')

// const detachedContainer = document.createElement('custom')
// const dataContainer = d3.select(detachedContainer)

const nodesPromise = d3.csv('nodes.csv')
const linksPromise = d3.csv('links.csv')

Promise.all([nodesPromise, linksPromise]).then(([nodes, links]) => {
  // console.log({ nodes });
  // console.log({ links });

  const xDomain = d3.extent(nodes.map(({ X }) => d3.timeParse('%Y-%m-%d')(X)))
  const yDomain = d3.extent(nodes.map(({ Y }) => Y))

  // console.log({ xDomain });
  const xScale = d3
    .scaleTime()
    .domain(xDomain)
    .range([margins.left, margins.left + innerWidth])
  const yScale = d3
    .scaleLinear()
    .domain(yDomain)
    .range([margins.top + innerHeight, margins.top])

  nodes.forEach(node => {
    // context.fillStyle = 'red'
    context.beginPath()
    context.strokeStyle = '#FF0000'
    context.arc(
      xScale(d3.timeParse('%Y-%m-%d')(node.X)),
      yScale(node.Y),
      5,
      0,
      2 * Math.PI,
      true,
    )
    context.stroke()
    context.closePath()
  })
})
