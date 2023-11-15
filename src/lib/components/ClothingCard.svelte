<script>
	export let userClothing;
</script>

<!-- Näytetään käyttäjän vaatekappale kuvana -->
<div class="vaate">
	<img src={userClothing.kuvaUrl} alt="Vaatekappale" />
</div>

<!-- <style>
    .vaate {
      border: 1px solid rgb (10, 10, 10);
      padding: 10px;
      margin: 10px;
      text-align: center;
    }
  
    img {
      max-width: 100%;
      height: auto;
      /*max-height: 200px;
        margin-bottom: 10px;*/
    }
  </style> -->
