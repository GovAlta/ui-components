<template>
  <goa-microsite-header type="alpha" @_feedbackClick="onFeedbackClick"></goa-microsite-header>
</template>

<script setup lang="ts">
function onFeedbackClick() {
  console.log("Feedback clicked");
  alert("Thank you for your feedback!");
}
</script>
