<template>
  <div class="visual_dc">
    <Scene
      v-model="scene"
      touch-action="none"
      oncontextmenu="return false"
    >
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
      <enclosure-racks-manager
        :racks="apiRacksList"
        v-on:set-camera-position="onSetCameraPosition"
        v-on:set-camera-target="onSetCameraTarget"
      />
    </Scene>
  </div>
</template>

<script>
  // Begin: Vue-BabylonJS quirks
  import Scene from 'vue-babylonjs/lib/scene'
  // Default environment loads default camera despite our inclusion of a camera
  Scene.methods.defaultEnvironment = function() {}
  // End: Vue-BabylonJS quirks

  let { Color4 } = require('vue-babylonjs/classes');

  // Data provider
  import ApiService from '@/common/api.service'

  // VisualDC components
  import EnclosureRacksManager from "./EnclosureRacksManager";

  export default {
    name: "VisualDC",
    components: {
      EnclosureRacksManager,
      'enclosure-racks-manager': EnclosureRacksManager
    },
    props: {
      view: {
        type: String,
        default: null
      },
      modelName: {
        type: String,
        default: null
      },
      modelId: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        scene: null,
        camera: null,
        cameraType: "arcRotate",
        frontDirectionalLight: null,
        backDirectionalLight: null,

        rawApiData: null,
      }
    },
    watch: {
      scene() {
        this.scene.clearColor = new Color4(0, 0, 0, 0)
      },
    },
    mounted() {
      this.fetchEnclosureRacks()
    },
    computed: {
      apiRacksList() {
        try {
          return this.rawApiData['data']
        } catch(err) {
          return []
        }
      }
    },
    methods: {
      fetchEnclosureRacks() {
        ApiService
          .get(`/${this.view}?filters[0][]=${this.modelName}_id=${this.modelId}`)
          .then((response) => {
            this.rawApiData = response['data']
          })
          .catch((rejection) => {
            console.log(`Unhandled API response: ${rejection}`)
          })
      },
      onSetCameraPosition(position) {
        this.camera.setPosition(position)
      },
      onSetCameraTarget(target) {
        this.camera.setTarget(target)
      }
    }
  }
</script>

<style scoped>

</style>
