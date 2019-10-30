<script>
    export let courseGoal = '';

    $: shouldHighLight = courseGoal.includes('!');
</script>

<style>
  h1.red {
	  color: red;
  }
</style>

<h1 class:red={shouldHighLight} >Course Goal Is: {courseGoal}</h1>