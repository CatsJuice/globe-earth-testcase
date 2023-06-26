<script lang="ts" setup>
import { useScriptSync } from '~/composables/useScriptSync'

await useScriptSync('http://d3js.org/d3.v3.min.js')
await useScriptSync('http://d3js.org/topojson.v1.min.js')
await useScriptSync('/planetaryjs.min.js')

const canvas = ref<HTMLCanvasElement>()

onMounted(draw)

function draw() {
  // @ts-expect-error - planetaryjs is global
  const { planetaryjs } = window
  if (!canvas.value)
    return
  const globe = planetaryjs.planet()
  globe.loadPlugin(planetaryjs.plugins.earth({
    topojson: { file: '/world-110m.json' },
    // topojson: { file: '/topo-world.json' },
    oceans: { fill: '#000080' },
    land: { fill: '#339966' },
    borders: { stroke: '#008000' },
  }))

  globe.loadPlugin(planetaryjs.plugins.zoom({
    scaleExtent: [10, 1000],
  }))

  globe.loadPlugin(planetaryjs.plugins.drag({
    // Dragging the globe should pause the
    // automatic rotation until we release the mouse.
    onDragStart() {
      // this.plugins.autorotate.pause()
    },
    onDragEnd() {
      // this.plugins.autorotate.resume()
    },
  }))

  globe.projection
    .scale(175)
    .translate([175, 175])
    .rotate([0, -10, 0])

  const dpi = window.devicePixelRatio
  canvas.value.width *= dpi
  canvas.value.height *= dpi
  const context = canvas.value.getContext('2d')!
  context.scale(dpi, dpi)
  globe.draw(canvas.value)
}
</script>

<template>
  <div>
    <canvas ref="canvas" width="400" height="400" h-400px w-400px />
    <article>
      不支持:
      <ul>
        <li>点击事件</li>
        <li>标签</li>
      </ul>
    </article>
  </div>
</template>
