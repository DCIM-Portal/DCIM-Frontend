<template>
  <section>
    <LineSystem :options="zoneGridOptions" />
    <TiledGround :options="zoneGroundOptions">
      <Material :alpha="0.2" />
    </TiledGround>
    <!-- Origin indicator; remove before production: -->
    <Tube :options="debugTubeOptions" />
  </section>
</template>

<script>
  let { Vector3 } = require('vue-babylonjs/classes');

  export default {
    name: "ZoneGrid",
    props: {
      minX: {
        type: Number,
        default: 0
      },
      maxX: {
        type: Number,
        default: 0
      },
      minY: {
        type: Number,
        default: 0
      },
      maxY: {
        type: Number,
        default: 0
      },
    },
    computed: {
      debugTubeOptions() {
        return {radius: 0.05, path: [new Vector3(0,0,1),new Vector3(0,0,0)]}
      },
      localMinX() {
        return -(this.minX - 1)
      },
      localMaxX() {
        return -(this.maxX + 2)
      },
      localMinY() {
        return (this.minY - 1)
      },
      localMaxY() {
        return (this.maxY + 2)
      },
      zoneGridOptions() {
        return {lines: this.zoneGridLines}
      },
      zoneGridLines() {
        let min_x = this.localMinX
        let min_y = this.localMinY
        let max_x = this.localMaxX
        let max_y = this.localMaxY

        let lines = []
        for (let x of Array.from({length: min_x-max_x+1}, (_,i) => i+max_x)) {
          let path = []
          path.push(new Vector3(x, 0, min_y))
          path.push(new Vector3(x, 0, max_y))
          lines.push(path)
        }
        for (let z of Array.from({length: max_y-min_y+1}, (_,i) => i+min_y)) {
          let path = []
          path.push(new Vector3(min_x, 0, z))
          path.push(new Vector3(max_x, 0, z))
          lines.push(path)
        }

        return lines
      },
      zoneGroundOptions() {
        return {
          xmin: this.localMaxX - 4,
          xmax: this.localMinX + 4,
          zmin: this.localMinY - 4,
          zmax: this.localMaxY + 4
        }
      }
    }
  }
</script>

<style scoped>

</style>
