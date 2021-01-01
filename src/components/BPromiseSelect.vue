<template>
<b-field>
  <b-select v-model="localValue" placeholder="Select Delivery Time" icon="truck-fast" @input="handleInput" expanded>
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
      localValue: null,
      promise: [
        {id: "24hHD", description: "24 Hour Delivery to Your Home"},
        {id: "1hPU", description: "Pickup at our Location in 1 Hour"}
      ]
    }
  },
  watch: {
    value(value) {
      this.setValue(value);
    }
  },
  mounted() {
    this.setValue(this.value);
  },
  methods: {
    setValue(value) {
      this.localValue = value;
    },
    handleInput(value) {
      this.$emit("input", value);
      this.localValue = value;
    }
  }
}
</script>
