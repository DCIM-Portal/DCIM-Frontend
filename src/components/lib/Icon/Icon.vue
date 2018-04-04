<template>
  <component :is="icon"/>
</template>

<script>
export default {
  name: 'BIcon',
  props: {
    icon: String,
  }
}
</script>
