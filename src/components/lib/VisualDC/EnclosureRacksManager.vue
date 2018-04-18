<template>
  <section>
    <zone-grid
      :min-x="bounds[0]"
      :max-x="bounds[1]"
      :min-y="bounds[2]"
      :max-y="bounds[3]"
    />
    <enclosure-rack v-for="rack in localRacks.solid" v-if="rackIsPlaced(rack)" :data="rack" :key="rack['id']" />
  </section>
</template>

<script>
  import ZoneGrid from "./ZoneGrid";
  import EnclosureRack from "./EnclosureRack"
  let { Vector3 } = require('vue-babylonjs/classes');

  export default {
    name: "EnclosureRacksManager",
    data() {
      return {
        localRacks: {
          // Committed to server and on ZoneGrid
          solid: {},
          // Committed to server and not on ZoneGrid
          drawer: {},
          // To be sent to server
          pending: {},
          // Mouse down, not sure if dragging camera
          uncertain: {},
          // Awaiting placement under cursor
          ghost: {}
        }
      }
    },
    props: {
      racks: {
        type: Array,
        default: []
      }
    },
    components: {
      EnclosureRack,
      'zone-grid': ZoneGrid,
      'enclosure-rack': EnclosureRack
    },
    computed: {
      bounds() {
        let minX = Infinity
        let minY = Infinity
        let maxX = -Infinity
        let maxY = -Infinity
        if (!this.racks.length) {
          minX = maxX = minY = maxY = 0
        }
        let racks = Object.assign(
          {},
          this.localRacks.solid
        )
        for (let key in racks) {
          let rack = racks[key]
          // Adjust bounds according to this EnclosureRack
          if (rack.x < minX) minX = rack.x;
          if (rack.y < minY) minY = rack.y;
          if (rack.x > maxX) maxX = rack.x;
          if (rack.y > maxY) maxY = rack.y;
        }
        if ([minX, minY].includes(Infinity) || [maxX, maxY].includes(Infinity)) {
          console.log("VisualDC: Cannot compute ZoneGrid bounds: Coordinate value error in EnclosureRacks list")
          return false
        }
        return [minX, maxX, minY, maxY]
      }
    },
    watch: {
      racks() {
        let isInitialRackLoad = Object.keys(this.localRacks.solid).length === 0
          && this.localRacks.solid.constructor === Object

        // Populate localRacks with prop racks
        this.localRacks.solid = {}
        this.localRacks.drawer = {}
        this.racks.forEach((rack) => {
          if (this.rackIsPlaced(rack)) this.localRacks.solid[rack.id] = rack
          else this.localRacks.drawer[rack.id] = rack
        })

        if (isInitialRackLoad) {
          this.reorientCamera()
        }
      }
    },
    methods: {
      rackIsPlaced(rack) {
        return !(rack.x === null || rack.y === null);
      },
      racksMidpoint() {
        let xTotal = 0, yTotal = 0
        let numOfEnclosureRacks = Object.keys(this.localRacks.solid).length
        Object.keys(this.localRacks.solid).forEach((id) => {
          let rack = this.localRacks.solid[id]
          xTotal += rack.x
          yTotal += rack.y
        })
        return [xTotal / numOfEnclosureRacks, yTotal / numOfEnclosureRacks]
      },
      reorientCamera() {
        let xy = this.racksMidpoint()
        let x = xy[0] + 0.5
        let y = xy[1] + 0.5
        if (isNaN(x) || isNaN(y)) {
          x = y = 0
          console.log("VisualDC: Cannot reorient camera: Value error from midpoint of EnclosureRacks")
        }
        this.$emit('set-camera-position', new Vector3(-x, 15, y))
        this.$emit('set-camera-target', new Vector3(-x, 0, y - 0.000000000000001))
      }
    }
  }
</script>

<style scoped>

</style>
