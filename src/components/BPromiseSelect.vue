<template>
<b-field>
  <b-select v-model="value" placeholder="Select Delivery Time" icon="truck-fast" expanded>
    <option
      v-for="option in promise"
      :value="option.id"
      :key="option.id"
      :selected="option.id == value">
      {{ option.description }}
    </option>
  </b-select>
</b-field>
</template>

<script>
export default {
  name: 'BPromiseSelect',
  props: {
    value: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      promise: [
        {id: "24hHD", description: "24 Hour Delivery to Your Home"},
        {id: "1hPU", description: "Pickup at our Location in 1 Hour"}
      ]
    }
  },
}
</script>
