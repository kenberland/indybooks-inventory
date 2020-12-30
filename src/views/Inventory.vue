<template>
  <div id="scanner">
  </div>
</template>

<script>
import Quagga from 'quagga';
export default {
  name: 'Inventory',
  data() {
    return {
    }
  },
  mounted: function() {
    Quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: '#scanner'
      },
      decoder : {
        readers : ["ean_reader"]
      }
    }, function(err) {
      if (err) {
        console.log(err);
        return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
    });
    Quagga.onDetected(function(data) {
      console.log(data);
    })
  }
}
</script>
