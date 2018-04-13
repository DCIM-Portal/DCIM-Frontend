<template>
  <div class="visual_dc">
    <Scene touch-action="none" oncontextmenu="return false">
      <Camera
        v-model="camera"
        :type="cameraType"
        :alpha="Math.PI / 2"
        :beta="15 * Math.PI / 32"
        :radius="25"
      />
      <DirectionalLight
        v-model="frontDirectionalLight"
        :direction="[0.5, -0.75, 1]"
      />
      <DirectionalLight
        v-model="backDirectionalLight"
        :direction="[-0.5, -0.75, -1]"
      />
      <Box :position="[0, 0, 5]"/>
      <enclosure-racks-manager />
    </Scene>
  </div>
</template>

<script>
  // Begin: Vue-BabylonJS quirks
  import Scene from 'vue-babylonjs/lib/scene'
  // Default environment loads default camera despite our inclusion of a camera
  Scene.methods.defaultEnvironment = function() {}
  // End: Vue-BabylonJS quirks

  import EnclosureRacksManager from "./EnclosureRacksManager";

  export default {
    name: "VisualDC",
    components: {
      EnclosureRacksManager,
      'enclosure-racks-manager': EnclosureRacksManager
    },
    data() {
      return {
        scene: null,
        camera: null,
        cameraType: "arcRotate",
        frontDirectionalLight: null,
        backDirectionalLight: null,
      }
    },
    watch: {
      camera() {
        console.log(this.camera)
      },
    }
  }
</script>

<style scoped>

</style>
