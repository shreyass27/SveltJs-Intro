<script>
  export let controlType = "";
  export let label;
  export let id;
  export let value;
  export let row = "3";
  export let valid = true;
  export let validityMessage = `Please enter valid ${label}`;
  let touched = false;

  // export let onInput= () => {}
</script>

<style>
  input,
  textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: none;
    border-bottom: 2px solid #ccc;
    border-radius: 3px 3px 0 0;
    background: white;
    padding: 0.15rem 0.25rem;
    transition: border-color 0.1s ease-out;
  }

  input:focus,
  textarea:focus {
    border-color: #e40763;
    outline: none;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    width: 100%;
  }

  .form-control {
    padding: 0.5rem 0;
    width: 100%;
    margin: 0.25rem 0;
  }

  .invalid {
    border-color: red;
    background: #fde3e3;
  }

  .error-message {
    color: red;
    margin: 0.25rem 0;
  }
</style>

<div class="form-control">
  <label for="title">{label}</label>
  {#if controlType === 'textarea'}
    <!-- Passing onInput function via props -->
    <!-- <textarea row="3" {id} value={value} on:input={onInput} /> -->
    <!-- Using Event Forwarding -->
    <textarea
      class:invalid={!valid && touched}
      {row}
      {id}
      bind:value
      on:blur={() => (touched = true)} />
  {:else}
    <input
      class:invalid={!valid && touched}
      type="text"
      id={id || 'title'}
      {value}
      on:input
      on:blur={() => (touched = true)} />
  {/if}

  {#if !valid && touched && validityMessage}
    <p class="error-message">{validityMessage}</p>
  {/if}
</div>
