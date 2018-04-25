<template>
  <visual-dc
    view="enclosure_racks"
    model-name="zone"
    :model-id="modelId"
  />
</template>

<script>
  import ApiService from '@/common/api.service'
  import VisualDC from '@/components/lib/VisualDC/VisualDC'

  export default {
    name: 'Zone',
    components: {
      'visual-dc': VisualDC
    },
    data () {
      return {
        modelId: parseInt(this.$route.params.id),
        rawApiData: null
      }
    },
    mounted() {
      this.$store.commit('setPageSubtitle', this.$options.name)
      ApiService
        .get(`${this.$route.meta.apiPath}/${this.modelId}`)
        .then((response) => {
          this.rawApiData = response['data']
        })
    },
    watch: {
      rawApiData() {
        this.$store.commit('setPageSubtitle', `${this.$options.name} ${this.rawApiData.data.name}`)
      }
    }
  }
</script>
<style lang="scss">
</style>
