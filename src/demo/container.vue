<script setup lang="ts">
import * as Cesium from "cesium";
import { ref } from "vue";
import "cesium/Build/Cesium/Widgets/widgets.css";

// @ts-expect-error - not in includes
import { useViewerProvider } from "~composables/useViewer";

const container = ref<HTMLDivElement>();
const { isMounted } = useViewerProvider(() => {
  Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjNGRjM2M5YS0zYjM4LTRkNTItYWY2NS05ZWRmYWE0ODY4NzYiLCJpZCI6MzQxNzQwLCJpYXQiOjE3NTgwMTA2NTF9.PyBHExC-OzZi3arzqvBw6u1P2NhqIr3pqipPldjKR_8";
  const viewer = new Cesium.Viewer(container.value as HTMLDivElement, {
    geocoder: false,
    homeButton: false,
    selectionIndicator: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    navigationHelpButton: false,
    animation: false,
    timeline: false,
    vrButton: false,
    infoBox: false,
    terrain: Cesium.Terrain.fromWorldTerrain(),

    /** Support high resolution screen */
    useBrowserRecommendedResolution: false,
    msaaSamples: 4,
  });

  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
    Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
  );
  viewer.cesiumWidget.creditContainer.innerHTML = "";
  viewer.scene.globe.depthTestAgainstTerrain = true;
  viewer.scene.screenSpaceCameraController.enableCollisionDetection = true;
  viewer.scene.light = new Cesium.DirectionalLight({
    direction: new Cesium.Cartesian3(0.35, -0.918, -0.283358),
  });

  return viewer;
});
</script>

<template>
  <div relative>
    <div ref="container" rounded h-full w-full />

    <RouterView v-if="isMounted" />
  </div>
</template>
