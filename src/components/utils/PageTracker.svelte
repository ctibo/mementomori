<script lang="ts">
  import { onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { profile } from '$lib/settings/profile';
  import { Network } from '$lib/enums';
  import { searchStr } from '$lib/search'

const unsubsribe = page.subscribe($page => {
    searchStr.set($page?.params?.slug) 
    profile.update($profile => ({
      ...$profile,
      network: Boolean($page.params?.network)
        ? $page.params.network
        : Network.MAINNET 
    }))
  });
  
  onDestroy(unsubsribe);
</script>
