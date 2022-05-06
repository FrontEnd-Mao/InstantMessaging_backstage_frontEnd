<template>
  <div>
    <edit-form></edit-form>
  </div>
</template>

<script>
import EditForm from "@/components/customerform/Container/Container.vue";

export default {
  components: {
    EditForm,
  },
  data() {
    return {
      eid: "",
      dialogFormVisible: false,
    };
  },
  created() {

  },
  methods: {},
};
</script>

<style>
</style>