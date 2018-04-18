<template>
  <Box :options="meshOptions" :position="position" :key="id">
    <Material
      diffuse="#78909C"
      :specular="[0.1, 0.1, 0.1]"
      emissive="#000000"
    />
  </Box>
</template>

<script>
  let { Vector3, Vector4 } = require('vue-babylonjs/classes');

  export default {
    name: "EnclosureRack",
    data() {
      return {
        scale: 0.8
      }
    },
    props: {
      data: {
        type: Object,
        default: () => {}
      }
    },
    computed: {
      meshOptions() {
        return {
          width: this.scale,
          depth: this.scale,
          height: this.relativeHeight,
          faceUV: this.faceUV
        }
      },
      relativeHeight() {
        return 1991/600/42*this.height*this.scale
      },
      faceUV() {
        let output = new Array(6).fill(new Vector4(0, 0, 0, 0))
        output[4] = new Vector4(0, 0, 1, 1)
        return output
      },
      id() {
        return this.data['id']
      },
      height() {
        return this.data['height']
      },
      x() {
        return this.data['x']
      },
      y() {
        return this.data['y']
      },
      position() {
        return new Vector3(-(this.x + 0.5), this.relativeHeight / 2, this.y + 0.5)
      }
    }
  }
</script>

<style scoped>

</style>
