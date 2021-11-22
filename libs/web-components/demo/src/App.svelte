<script>
  import '../../src';
  export let name;
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

  <div class="container">
    <goa-button text="Hello"></goa-button>
    <goa-button>
      In the button
    </goa-button>
    <goa-input></goa-input>
  </div>
</main>

<style>

  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }

    .container {
      display: inline-block;
      max-width: 640px;
    }
  }
</style>
