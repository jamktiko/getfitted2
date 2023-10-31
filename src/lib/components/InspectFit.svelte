<script>

    /*   import { fade, fly, scale, slide } from 'svelte/transition';
      import { sineOut } from 'svelte/easing'; */
      import { createEventDispatcher } from 'svelte';
    
      const dispatch = createEventDispatcher();
    
      export let valittuKuva = null;
    
      function handleSulku() {
        dispatch('close');
      }
    
      console.log(valittuKuva);
    
      let isLiked = false;
    
      function toggleLike() {
        isLiked = !isLiked;
      }
    </script>
    
    <head>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
      />
    </head>
    <main>
      {#if valittuKuva}
        <button on:click={handleSulku} class="nuoli"> <i class="arrow" /></button>
    
        <div class="modali">
          <img src={valittuKuva.imageUrl} alt="käyttäjän vaate" class="iso-kuva" />
        </div>
        <div class="proflike">
          <h3 class="user">@username</h3>
    
          <span id="heart" on:click={toggleLike} class:liked={isLiked}>
            {#if isLiked}
              <i class="fa fa-heart" aria-hidden="true" />
            {:else}
              <i class="fa fa-heart-o" aria-hidden="true" />
            {/if}
          </span>
        </div>
        <div class="desc">
          <p class="info"><li>North Face bottoms, bought 2023</li></p>
          <p class="info"><li>Everest beige vest, bought 2023</li></p>
          <p class="info"><li>North Face gloves</li></p>
        </div>
    
      {/if}
    </main>
    
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Heebo&display=swap');
    
      /* .getfittedlogo {
        display: none;
      } */
      main {
        margin: -8px;
        z-index: 1;
      }
    
      .modali {
        display: flex;
        flex-direction: column;
        align-items: center; 
        position: relative;
        /* top: 0;
        left: 0; */
        width: 100%;
        background-color: white;
      }
    
      .iso-kuva {
        /* height: 100%; */
        width: 100%;
        max-height: 100%;
        top: 0; 
      }
    
      .nuoli {
        position: absolute;
        top: 7.5em;
        left: 1.5em; 
        background-color: transparent; 
    
        color: white; 
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        z-index: 1000; 
        display: flex;
        align-items: center; 
        justify-content: center;
      }
    
      .arrow {
        border: solid white;
        border-radius: 15%;
        border-width: 0 4px 4px 0;
    
        padding: 0.5em;
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        cursor: pointer;
    
      }
    
      .fa-heart-o {
        color: #d499ff;
        cursor: pointer;
        font-size: 28px;
        display: flex;
        justify-content: center;
        margin-right: 1.5em;
        margin-top: 0.9em;
      }
    
      .fa-heart {
        color: #d499ff;
        cursor: pointer;
        font-size: 28px;
        display: flex;
        justify-content: center;
        margin-right: 1.5em;
        margin-top: 0.9em;
      }
      .proflike {
        position: relative;
        z-index: 1;
        height: 50px;
        border-bottom: solid 1px rgb(90, 90, 90);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-bottom: 2em;
      }
      .user {
        display: flex;
        justify-content: center;
        margin-left: 1.5em;
        margin-top: 1.5em;
        color: rgb(90, 90, 90);
        font-family: 'Heebo', sans-serif;
      }
      .info {
        font-family: 'Source Code Pro', monospace;
        color: rgb(90, 90, 90);
        display: flex;
        justify-content: flex-start;
        margin-left: 1.5em;
        font-size: 0.8em;
      }
      .desc {
        margin-bottom: 10em;
    
      }
    </style>
    