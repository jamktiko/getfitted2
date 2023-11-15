<script>
	export let userFit;
</script>

<!-- Näytetään käyttäjän fittikuva -->
<div class="fitti">
	<img src={userFit.kuvaUrl} alt="Fittikuva" class="w-full h-auto" loading="lazy" />
</div>

<!-- <style>
  /*   .fitti {
      border: 1px solid rgb (10, 10, 10);
      padding: 10px;
      margin: 10px;
      text-align: center;
    }
  */
    img {
      max-width: 100%;
      height: auto;
      /*max-height: 200px;
      margin-bottom: 10px;*/
    } 
  
  </style> -->
