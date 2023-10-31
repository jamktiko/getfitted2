<script>
    /* import { u } from '$lib/userStore'; */
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  
    export let valittuFiltteri = [];
  
    function lisaaFiltteri() {
      dispatch('lisaaFiltteri', valittuFiltteri);
    }
  
    function tyhjennaFiltteri() {
      valittuFiltteri = [];
      dispatch('lisaaFiltteri', valittuFiltteri);
    }
  
    function filtteriPaalla(kategoria) {
      if (valittuFiltteri.includes(kategoria)) {
        valittuFiltteri = valittuFiltteri.filter(
          (filter) => filter !== kategoria
        );
      } else {
        valittuFiltteri = [...valittuFiltteri, kategoria];
      }
      dispatch('filtteriVaihettu', valittuFiltteri);
    }
  
    function isChecked(kategoria) {
      return valittuFiltteri.includes(kategoria);
    }
  </script>
  
  <div class="modal">
    <div class="modal-sisalto">
      <label class="checkbox-container">
        <input
          type="checkbox"
          checked={isChecked('Tops')}
          on:change={() => filtteriPaalla('Tops')}
        />
        <span class="checkmark" />
        Tops
      </label>
      <label class="checkbox-container">
        <input
          type="checkbox"
          checked={isChecked('Bottoms')}
          on:change={() => filtteriPaalla('Bottoms')}
        />
        <span class="checkmark" />
        Bottoms
      </label>
      <label class="checkbox-container">
        <input
          type="checkbox"
          checked={isChecked('Shoes')}
          on:change={() => filtteriPaalla('Shoes')}
        />
        <span class="checkmark" />
        Shoes
      </label>
      <label class="checkbox-container">
        <input
          type="checkbox"
          checked={isChecked('Hats')}
          on:change={() => filtteriPaalla('Hats')}
        />
        <span class="checkmark" />
        Hats
      </label>
      <label class="checkbox-container">
        <input
          type="checkbox"
          checked={isChecked('Accessories')}
          on:change={() => filtteriPaalla('Accessories')}
        />
        <span class="checkmark" />
        <span> Accessories </span>
      </label>
      <div class="buttonit">
        <button on:click={lisaaFiltteri} class="apply">APPLY</button>
        <button on:click={tyhjennaFiltteri} class="clear">CLEAR</button>
      </div>
    </div>
  </div>
  
  <style>
  
    @import url('https://fonts.googleapis.com/css2?family=Heebo&display=swap');
    .buttonit {
      display: flex;
      justify-content: space-evenly;
    } 
    input {
      visibility: hidden;
    }
    .checkmark {
      /* display: inline-block;
      content: '';
      width: 1.5em;
      height: 1.5em;
      border: 1px solid #e3befd;
      background-color: transparent;
      border-radius: 20%;
      margin-right: 1.2em; */
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.5em;
      height: 1.5em;
      border: 1px solid #e3befd;
      background-color: transparent;
      border-radius: 20%;
      margin-right: 1.2em;
      /* position: relative; */
      z-index: 1;
      line-height: 1.5em;
    }
    .checkmark::before {
      content: '\10102';
      display: none;
      font-size: 1em;
      font-weight: lighter;
      color: white;
      /*  position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%); */
    }
    .checkbox-container {
      margin: 1em;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .checkbox-container input[type='checkbox']:checked + .checkmark::before {
      display: inline-block;
      align-items: center;
    }
    input[type='checkbox'] {
      opacity: 0;
      position: absolute;
      width: 1.5em;
      height: 1.5em;
      z-index: 2;
      cursor: pointer;
    }
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .modal-sisalto {
      background: rgb(97, 96, 96);
      padding: 20px;
      border-radius: 5px;
      font-family: 'Source Code Pro', monospace;
      font-size: 0.9em;
      color: white;
      position: left;
    }
    button {
      margin-top: 1.4em;
      font-size: 1em;
      color: rgb(248, 247, 244);
      background: transparent;
      border: none;
      font-family: 'Heebo', sans-serif;
      font-weight: bold;
    }
  </style>
  