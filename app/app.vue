<script setup lang="ts">
const siteUrl = "https://github-organizations-cambodia.vercel.app";

const metaTitle = "GitHub Organizations Cambodia";
const metaDescription = `Discover Cambodian tech organizations and open-source communities on GitHub — automatically fetched and always up to date.`;
const ogImageUrl = `${siteUrl}/preview.jpg`;
const ogUrl = siteUrl;
const ogSiteName = "GitHub Organizations Cambodia";

useSeoMeta({
  title: metaTitle,
  ogTitle: metaTitle,
  description: metaDescription,
  ogDescription: metaDescription,
  ogImage: ogImageUrl,
  ogImageUrl: ogImageUrl,
  ogImageType: "image/jpeg",
  ogType: "website",
  ogUrl,
  ogSiteName,
  twitterCard: "summary_large_image",
  twitterTitle: metaTitle,
  twitterDescription: metaDescription,
  twitterImage: ogImageUrl
});
</script>

<template>
  <NuxtLoadingIndicator color="#3b82f6" />
  <NuxtPage />
  <ui-tooltip />
</template>
