<script>
	import ContactCard from './ContactCard.svelte';

	export let name;
	let count = 0;
	let jobTitle = '';
	let jobDetails = {
		description: '',
		imageUrl: ''
	}

	function logger(data) {
		console.log(data)
	}

	function increment() {
		++count;
	}

	function changeName() {
		name = 'Coool'
	}

	function handleNameChange(e) {
		name = e.target.value;
	}

	let upperName = '';
	$: {
		upperName = name.toUpperCase();
		logger(upperName);
	}

	$: console.log('ContactCard jobDetails', jobDetails);

	function returnUppercase(text) {
		console.log('returnUppercase(text)', text);
		return text.toUpperCase();
	}
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1>Hello {name}!</h1>
<h3>{count}</h3>
<button on:click={increment}>Increment</button>
<h2>UpperCase using $: => {upperName}</h2>
<h2>UpperCase using function => {returnUppercase(name)}</h2>
<button on:click={changeName}>Change Name</button>
<div>
	<!-- Unidirectional Data flow -->
	<!-- <input type="text" value={name} on:input={handleNameChange}/> -->
	<!-- Two way data binding flow -->
	<input type="text" bind:value={name} />
	<input type="text" bind:value={jobTitle} />
	<input type="text" bind:value={jobDetails.imageUrl} />
	<textarea bind:value={jobDetails.description} rows="3" /> 
</div>

<ContactCard userName={name} {jobTitle} {...jobDetails} />