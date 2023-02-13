<script lang="ts">
  import { page } from '$app/stores';
</script>


<section class="container">
  <div class="contained">
    <h1 class="huge-title">
      {$page.status}
    </h1>

    <p class="text">
      {$page.error.message}
    </p>
  </div>
</section>


<style lang="scss">
  .contained {
    text-align: center;
    padding: 5vh 0;
  }
  .text {
    font-size: 1.25em;
  }
</style>
