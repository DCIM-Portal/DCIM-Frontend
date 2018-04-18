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

  export default {
    name: "EnclosureRacksManager",
    data() {
      return {
        localRacks: {
          // Committed to server
          solid: {},
          // To be sent to server
          pending: {},
          // Mouse down, not sure if dragging camera
          uncertain: {},
          // Awaiting placement under cursor
          ghost: {},
          // Not on ZoneGrid
          drawer: {}
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
        let min_x = Infinity
        let min_y = Infinity
        let max_x = -Infinity
        let max_y = -Infinity
        if (!this.racks.length) {
          min_x = max_x = min_y = max_y = 0
        }
        let racks = Object.assign(
          {},
          this.localRacks.solid
        )
        for (let key in racks) {
          let rack = racks[key]
          // Adjust bounds according to this EnclosureRack
          if (rack.x < min_x) min_x = rack.x;
          if (rack.y < min_y) min_y = rack.y;
          if (rack.x > max_x) max_x = rack.x;
          if (rack.y > max_y) max_y = rack.y;
        }
        if ([min_x, min_y].includes(Infinity) || [max_x, max_y].includes(Infinity)) {
          console.log("Cannot compute ZoneGrid bounds: Coordinate value error in EnclosureRacks list")
          return false
        }
        return [min_x, max_x, min_y, max_y]
      }
    },
    watch: {
      racks() {
        // Populate localRacks with prop racks
        this.localRacks.solid = {}
        this.localRacks.drawer = {}
        this.racks.forEach((rack) => {
          if (this.rackIsPlaced(rack)) this.localRacks.solid[rack.id] = rack
          else this.localRacks.drawer[rack.id] = rack
        })
      }
    },
    methods: {
      rackIsPlaced(rack) {
        return !(rack.x === null || rack.y === null);
      }
    }
  }
</script>

<style scoped>

</style>
