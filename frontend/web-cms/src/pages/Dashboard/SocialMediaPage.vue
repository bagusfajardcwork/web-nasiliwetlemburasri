<template>
  <div class="row">
    <div class="col-xxl-6">
      <div class="row">
        <div class="col-lg-4 col-6">
          <InstagramFollowers />
        </div>
        <div class="col-lg-4 col-6">
          <LinkedInFollowers />
        </div>
        <div class="col-lg-4 col-6">
          <TikTokFollowers />
        </div>
        <div class="col-lg-4 col-6">
          <FacebookFollowers />
        </div>
        <div class="col-lg-4 col-6">
          <XFollowers />
        </div>
        <div class="col-lg-4 col-6">
          <YouTubeSubscribers />
        </div>
      </div>
    </div>
    <div class="col-xxl-6">
      <LinkedInNetFollowersChart />
    </div>
    <div class="col-xxl-4 col-md-6">
      <Suggestions />
    </div>
    <div class="col-xxl-4 col-md-6">
      <FollowersByGenderChart />
    </div>
    <div class="col-xxl-4 col-md-12">
      <RecentInstagramFollowers />
    </div>
    <div class="col-lg-8">
      <FacebookCampaignOverviewChart />
    </div>
    <div class="col-lg-4">
      <UpgradePlan />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InstagramFollowers from "@/components/Dashboard/SocialMedia/InstagramFollowers.vue";
import LinkedInFollowers from "@/components/Dashboard/SocialMedia/LinkedInFollowers.vue";
import TikTokFollowers from "@/components/Dashboard/SocialMedia/TikTokFollowers.vue";
import FacebookFollowers from "@/components/Dashboard/SocialMedia/FacebookFollowers.vue";
import XFollowers from "@/components/Dashboard/SocialMedia/XFollowers.vue";
import YouTubeSubscribers from "@/components/Dashboard/SocialMedia/YouTubeSubscribers.vue";
import LinkedInNetFollowersChart from "@/components/Dashboard/SocialMedia/LinkedInNetFollowersChart.vue";
import Suggestions from "@/components/Dashboard/SocialMedia/Suggestions.vue";
import FollowersByGenderChart from "@/components/Dashboard/SocialMedia/FollowersByGenderChart.vue";
import RecentInstagramFollowers from "@/components/Dashboard/SocialMedia/RecentInstagramFollowers.vue";
import FacebookCampaignOverviewChart from "@/components/Dashboard/SocialMedia/FacebookCampaignOverviewChart.vue";
import UpgradePlan from "@/components/Dashboard/SocialMedia/UpgradePlan.vue";

export default defineComponent({
  name: "SocialMediaPage",
  components: {
    InstagramFollowers,
    LinkedInFollowers,
    TikTokFollowers,
    FacebookFollowers,
    XFollowers,
    YouTubeSubscribers,
    LinkedInNetFollowersChart,
    Suggestions,
    FollowersByGenderChart,
    RecentInstagramFollowers,
    FacebookCampaignOverviewChart,
    UpgradePlan,
  },
});
</script>
