<script>
  import CourseGoal from './CourseGoal.svelte';

  let courseGoal = "";
</script>

<input type="text" bind:value={courseGoal} />

<CourseGoal {courseGoal}  />
