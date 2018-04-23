<template>
  <Box :options="meshOptions" :position="position" :key="id">
    <Material
      v-model="material"
      :specular="[0.1, 0.1, 0.1]"
      emissive="#000000"
    >
      <Texture v-model="texture" :key="id" />
    </Material>
  </Box>
</template>

<script>
  let { Vector3, Vector4, DynamicTexture } = require('vue-babylonjs/classes');

  // Begin: Vue-BabylonJS quirks
  import Texture from 'vue-babylonjs/lib/texture'
  // Texture needs to be a DynamicTexture
  Texture.methods.create = function() {
    let texture = this.value || new DynamicTexture(this.name, 512, this.$scene);
    this.$replace(texture);
  }
  // End: Vue-BabylonJS quirks

  export default {
    name: "EnclosureRack",
    data() {
      return {
        scale: 0.8,
        scene: null,
        material: null,
        texture: null
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
      name() {
        return this.data['name']
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
    },
    watch: {
      texture() {
        let highlight = false
        let noHighlightColor = "#78909C";
        let yesHighlightColor = "#8ba3af";
        let highlightColor = highlight ? yesHighlightColor : noHighlightColor;
        this.texture.drawText(this.name, null, null, "160px 'Roboto Condensed'", "white", highlightColor)
        this.texture.wAng = Math.PI / 180 * 90
      }
    }
  }
</script>

<style scoped>

</style>
