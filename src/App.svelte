<script>
  import CustomInput from "./CustomInput.svelte";
  import Toggle from "./Toggle.svelte";
  let val = "Max";
  let selected = 1;
  let price = 0;
  let agreed;
  let singleFavColor = "blue";
  let multiFavColor = ["blue"];
  let selectFavColor = "blue";
  let refInput;
  let refCustomInput;

  let enteredEmail = "";
  let formInValid = true;

  $: if (enteredEmail.includes("@")) {
    formInValid = false;
  } else {
    formInValid = true;
  }

  $: {
    console.log("Value of val", val);
  }
  $: {
    console.log("Value of selected", selected);
  }
  $: {
    console.log("Value of price", price);
  }
  $: {
    console.log("Value of agreed", agreed);
  }
  $: {
    console.log("Value of singleFavColor", singleFavColor);
  }
  $: {
    console.log("Value of multiFavColor", multiFavColor);
  }
  $: {
    console.log("Value of selectFavColor", selectFavColor);
  }

  function setValue() {
    val = event.target.value;
  }

  function checkRefs() {
    console.log("checkRefs refInput.value", refInput.value);
    console.dir(refInput);

    console.dir(refCustomInput);

    // Method in Custom Svelte component can be called using Reference.
    refCustomInput.empty();
  }
</script>

<style>
  .formInValid {
    border: 1px solid red;
  }
</style>

<!-- One way binding -->
<!-- <input type="text" value={val} on:input={setValue} /> -->

<!-- Two way binding -->
<!-- <input type="text" bind:value={val} /> -->

<CustomInput bind:val bind:this={refCustomInput} />

<Toggle bind:num={selected} />

<!-- Input with type Number with One way binding returns string value instead of number -->
<!-- <input
  type="number"
  value={price}
  on:input={e => console.log(e.target.value)} /> -->

<!-- Input with type Number with Two way binding returns number value -->
<input type="number" bind:value={price} />

<!-- checkbox two way binding with checked value  -->
<label>
  <input type="checkbox" bind:checked={agreed} />
  Agree to terms?
</label>

<h3>Single Fav Color</h3>
<label>
  <input
    type="radio"
    name="singleFavColor"
    value="red"
    bind:group={singleFavColor} />
  Red
</label>
<label>
  <input
    type="radio"
    name="singleFavColor"
    value="green"
    bind:group={singleFavColor} />
  Green
</label>
<label>
  <input
    type="radio"
    name="singleFavColor"
    value="blue"
    bind:group={singleFavColor} />
  Blue
</label>

<h3>Multiple Fav Color(Using Checkbox)</h3>
<label>
  <input
    type="checkbox"
    name="multiFavColor"
    value="red"
    bind:group={multiFavColor} />
  Red
</label>
<label>
  <input
    type="checkbox"
    name="multiFavColor"
    multiFavColor
    value="green"
    bind:group={multiFavColor} />
  Green
</label>
<label>
  <input
    type="checkbox"
    name="multiFavColor"
    value="blue"
    bind:group={multiFavColor} />
  Blue
</label>

<h3>DropDown Select Fav Color</h3>
<select bind:value={selectFavColor}>
  <option value="green">Green</option>
  <option value="red">Red</option>
  <option value="blue">Blue</option>
</select>

<hr />

<button on:click={checkRefs}>Check Refs</button>

<!-- bind:this gives reference to the HTML element  -->
<input type="text" bind:this={refInput} />

<hr />

<form on:submit|preventDefault>
  <input type="email" bind:value={enteredEmail} class:formInValid />
  <button type="submit" disabled={formInValid}>Save Data</button>
</form>
