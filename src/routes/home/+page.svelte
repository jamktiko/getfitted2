<script>
    import { goto } from '$app/navigation';
	import { all , u } from '$lib/stores/userStore';
    import InspectFit from '$lib/components/InspectFit.svelte';
	$: if ($u.isLoggedIn) {
		console.log('User is logged in:', $u.userName);
		console.log('Users clothes:', $u.userClothes);
	}
    $: if ($u.isLoggedIn) {
		console.log('All clothes:', $all.allFits);
	}
    let valittuKuva = null;
    
    function handleFittiClick() {
      valittuKuva = $all.allFits;
  
    }
    function handleSuljeFitti() {
      valittuKuva = null;
    }
  </script>
  
  <main class="p-2 pb-16 m-4">
    {#if valittuKuva}
        <InspectFit {valittuKuva} on:close={handleSuljeFitti} />
    {:else}
    <div class="flex">
      <button class="flex-1 p-4 m-4 font-mono text-sm text-purple-500 border-b border-purple-500">All</button>
      <button class="flex-1 p-4 m-4 font-mono text-sm text-black" on:click={() => goto('/home/feedme')}>Me</button>
    </div>
    <div class="grid grid-cols-2 gap-4 mt-4">
      <!-- each lohko käy läpi kaikkien käyttäjien fitit ja näyttää niiden kuvat -->
      {#each $all.allFits as fit}
        <div class="fitti" on:click={() => handleFittiClick(fit)}>
          <img src={fit.imageUrl} alt="Fittikuva" class="w-full h-auto"/>
        </div>
      {/each}
    </div>
    {/if}
  </main>
  
  
  <!-- <style>
    main {
      padding: 8px;
    }
    .active {
      flex: 1;
      width: 50%;
      box-sizing: border-box;
      padding: 1em;
      margin: 1em;
      font-family: 'Source Code Pro', monospace;
      background-color: transparent;
      border: none;
      cursor: pointer;
      font-size: 1em;
      color: #c97eff;
      border-bottom-style: solid;
    }
    .kontti {
      display: flex;
    }
    img {
      max-width: 100%;
      height: auto;
      /*max-height: 200px;
        margin-bottom: 10px;*/
    }
  
    .fitti-grid {
      /* display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px; /* väli vaatteiden välillä */
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(2, 1fr);
      align-items: center;
      align-content: center;
      gap: 1.6875rem;
      align-self: stretch;
      flex-wrap: wrap;
      margin-top: 1em;
    }
  
    .active {
      flex: 1;
      width: 50%;
      box-sizing: border-box;
      padding: 1em;
      margin: 1em;
      font-family: 'Source Code Pro', monospace;
      background-color: transparent;
      border: none;
      cursor: pointer;
      font-size: 1em;
      color: #c97eff;
      border-bottom-style: solid;
    }
  
    .inactive {
      flex: 1;
      width: 50%;
      box-sizing: border-box;
      padding: 1em;
      margin: 1em;
      font-family: 'Source Code Pro', monospace;
      background-color: transparent;
      border: none;
      cursor: pointer;
      font-size: 1em;
      color: #000000;
    }
  </style> -->
  