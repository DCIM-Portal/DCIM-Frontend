import moment from 'moment'
export default {
  data() {
    return {
      columnNameToType: {
        serial: this.boldText,
        power_status: this.powerTag,
        sync_status: this.statusTag,
        onboard_status: this.statusTag,
        onboard_step: this.statusTag,
        updated_at: this.dateTimeISO8601,
        created_at: this.dateTimeISO8601,
        brand: this.text,
        product: this.text
      }
    }
  },
  methods: {
    dateTimeISO8601(input) {
      return moment(input).format('MMMM D YYYY, h:mma')
    },
    boldText(input) {
      return input ? `<strong>${input}</strong>` :
        `<span class="tag has-shadow">
          <span class="icon">
            <i class="mdi mdi-18px mdi-minus-circle-outline"></i>
          </span>N/A</span>`
    },
    text(input) {
      return input ? input :
        `<span class="tag has-shadow">
          <span class="icon">
            <i class="mdi mdi-18px mdi-minus-circle-outline"></i>
          </span>N/A</span>`
    },
    powerTag(input) {
      switch(input) {
        case 'on':
          return `<span class="tag power is-success has-shadow">
            <span class="icon">
              <i class="mdi mdi-18px mdi-power"></i>
            </span>On</span>`
          break
        case 'off':
          return `<span class="tag power is-danger has-shadow">
            <span class="icon">
              <i class="mdi mdi-18px mdi-power"></i>
            </span>Off</span>`
          break
        default:
          return `<span class="tag has-shadow">
            <span class="icon">
              <i class="mdi mdi-18px mdi-minus-circle-outline"></i>
            </span>N/A</span>`
      }
    },
    statusTag(input) {
      switch(input) {
        case 'success':
        case 'complete':
          return `<span class="tag is-success has-shadow">
            <span class="icon">
              <i class="mdi mdi-18px mdi-checkbox-marked-circle-outline"></i>
            </span>${input}</span>`
          break
        case 'in_progress':
          return `<span class="tag is-info has-shadow">
            <svg class="progress-spinner" viewBox="0 0 50 50">
              <circle
                class="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke-width="5"/>
            </svg>${input}</span>`
          break
        case 'shutdown':
        case 'power_off':
        case 'pxe':
        case 'discover':
        case 'manage':
        case 'bmc_creds':
          return `<span class="tag is-info has-shadow">
            <span class="icon">
              <i class="mdi mdi-18px mdi-information-outline"></i>
            </span>${input}</span>`
          break
        case null:
          return `<span class="tag has-shadow">
            <span class="icon">
              <i class="mdi mdi-18px mdi-minus-circle-outline"></i>
            </span>N/A</span>`
          break
        default:
          return `<span class="tag is-danger has-shadow">
            <span class="icon">
              <i class="mdi mdi-18px mdi-minus-circle-outline"></i>
            </span>${input}</span>`
      }
    }
  }
}
