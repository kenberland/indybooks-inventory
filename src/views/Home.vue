<template>
<b-table
  :data="stores"
  :hoverable="true"
  :mobile-cards="true">

  <b-table-column field="id" label="ID" width="40" numeric centered v-slot="props">
    {{ props.row.id }}
  </b-table-column>

  <b-table-column field="first_name" label="First Name" centered v-slot="props">
    {{ props.row.first_name }}
  </b-table-column>

  <b-table-column field="last_name" label="Last Name" centered v-slot="props">
    {{ props.row.last_name }}
  </b-table-column>

  <b-table-column field="date" label="Date" centered v-slot="props">
    <span class="tag is-success">
      {{ new Date(props.row.date).toLocaleDateString() }}
    </span>
  </b-table-column>

  <b-table-column label="Gender" centered v-slot="props">
    <span>
      <b-icon :icon="props.row.gender === 'Male' ? 'mars' : 'venus'"/>
      {{ props.row.gender }}
    </span>
  </b-table-column>
</b-table>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      stores: []
    }
  },
  beforeMount: function() {
    this.stores = [
      { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016/10/15 13:43:27', 'gender': 'Male' },
      { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016/12/15 06:00:53', 'gender': 'Male' },
      { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016/04/26 06:26:28', 'gender': 'Female' },
      { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016/04/10 10:28:46', 'gender': 'Male' },
      { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016/12/06 14:38:38', 'gender': 'Female' }
    ]
    if(localStorage.token) {
      this.axios.get('https://api.indybooks.net/v5/auth/my/stores', {
        headers: {
          'Authorization': localStorage.token
        }
      })
      .then((response) => {
        console.log(response.data);
      })
      this.axios.get('https://api.indybooks.net/v5/auth/inventory/stores/1234/isbn/5678', {
        headers: {
          'Authorization': localStorage.token
        }
      })
      .then((response) => {
        console.log(response.data);
      })
    }
  }
}
</script>
