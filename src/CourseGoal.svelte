<script>
    export let courseGoal = '';
</script>

<style>
  h1.red {
	  color: red;
  }
</style>

<h1 class:red={courseGoal.includes('!')} >Course Goal Is: {courseGoal}</h1>