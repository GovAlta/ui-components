<script setup lang="ts">
import { useRouter } from "vue-router";
import {
  GoabAppFooter,
  GoabAppHeader,
  GoabMicrositeHeader,
  GoabOneColumnLayout,
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
} from "@abgov/vue-components";
import { bugRouteDefinitions, featureRouteDefinitions, docsRouteDefinitions } from "./route-manifest";

const router = useRouter();
const baseUrl = import.meta.env.BASE_URL;

const handleSideMenuNavigate = (path: string) => {
  const internal = path.startsWith(baseUrl) ? "/" + path.slice(baseUrl.length) : path;
  router.push(internal);
};
</script>

<template>
  <div class="app-layout">
    <GoabWorkSideMenu
      heading="Vue Testing Playground"
      :url="baseUrl"
      :open="true"
      @onNavigate="handleSideMenuNavigate"
    >
      <template #primary>
        <GoabWorkSideMenuGroup icon="alert-circle" heading="Bugs">
          <GoabWorkSideMenuItem
            v-for="route in bugRouteDefinitions"
            :key="route.path"
            :label="route.id + ' - ' + route.title"
            :url="baseUrl + route.path"
          />
        </GoabWorkSideMenuGroup>
        <GoabWorkSideMenuGroup icon="star" heading="Features">
          <GoabWorkSideMenuItem
            v-for="route in featureRouteDefinitions"
            :key="route.path"
            :label="route.id + ' - ' + route.title"
            :url="baseUrl + route.path"
          />
        </GoabWorkSideMenuGroup>
        <GoabWorkSideMenuGroup icon="book" heading="Docs">
          <GoabWorkSideMenuItem
            v-for="route in docsRouteDefinitions"
            :key="route.path"
            :label="route.id + ' - ' + route.title"
            :url="baseUrl + route.path"
          />
        </GoabWorkSideMenuGroup>
        <GoabWorkSideMenuItem
          icon="list"
          label="Everything"
          :url="baseUrl + 'everything'"
        />
      </template>
    </GoabWorkSideMenu>
    <div class="main-wrapper">
      <section class="main">
      <router-view />
      </section>
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.main-wrapper {
  flex: 1;
  height: 100%;
  width: 100%;
  overflow: auto;
}

.main {
  padding: var(--goa-space-2xl);
}
</style>
