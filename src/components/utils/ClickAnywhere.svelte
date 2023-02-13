<script lang="ts">
  import { onMount } from "svelte";
  import { nextFrame } from "$lib/helpers/ui";
  export let callback: () => void;
  
  let mounted: boolean = false;
  onMount(async () => { 
    await nextFrame();
    mounted = true 
  });

  function clicked(e: Event) {
    if (!mounted) return;
    callback();
  }
</script>


<svelte:body on:click={clicked} />
