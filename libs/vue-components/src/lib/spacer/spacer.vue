<script setup lang="ts">
import type {
  GoabSpacerHorizontalSpacing,
  GoabSpacerVerticalSpacing,
} from "@abgov/ui-components-common";
import { useWcProps } from "../common/useWcProps";

interface Props {
  hSpacing?: GoabSpacerHorizontalSpacing;
  vSpacing?: GoabSpacerVerticalSpacing;
  testId?: string;
}

const props = defineProps<Props>();

const wcProps = useWcProps(props);
</script>

<template>
  <goa-spacer v-bind="wcProps" />
</template>
