<template>
  <div class="card bg-white border-0 rounded-3 mb-4">
    <div class="card-body p-4">
      <h3 class="mb-4">Reviews</h3>

      <div
        class="default-table-area campaigns-table customer-ratings-table px-20"
      >
        <div class="table-responsive">
          <table class="table border-0">
            <thead>
              <tr class="border-bottom">
                <th scope="col">
                  <span class="fs-14 text-secondary fw-medium letter-spacing-1">
                    User ID
                  </span>
                </th>
                <th scope="col">
                  <span class="fs-14 text-secondary fw-medium letter-spacing-1">
                    Customer Name
                  </span>
                </th>
                <th scope="col">
                  <span class="fs-14 text-secondary fw-medium letter-spacing-1">
                    Ratings
                  </span>
                </th>
                <th scope="col">
                  <span class="fs-14 text-secondary fw-medium letter-spacing-1">
                    Reviews
                  </span>
                </th>
                <th scope="col">
                  <span class="fs-14 text-secondary fw-medium letter-spacing-1">
                    Date
                  </span>
                </th>
                <th scope="col" class="text-end">
                  <span
                    class="fs-10 text-secondary fw-medium letter-spacing-1"
                  ></span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="review in paginatedReviews" :key="review.id">
                <td
                  class="fs-14 text-secondary border-border-color-50"
                  style="padding-top: 17px; padding-bottom: 17px"
                >
                  {{ review.id }}
                </td>
                <td
                  class="border-border-color-50"
                  style="padding-top: 17px; padding-bottom: 17px"
                >
                  <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                      <img
                        :src="review.avatar"
                        class="rounded-circle"
                        style="width: 30px; height: 30px"
                        alt="user"
                      />
                    </div>
                    <div class="flex-grow-1 ms-2">
                      <h4 class="fs-14 fw-semibold mb-0 text-secondary-50">
                        {{ review.name }}
                      </h4>
                    </div>
                  </div>
                </td>
                <td
                  class="border-border-color-50"
                  style="padding-top: 17px; padding-bottom: 17px"
                >
                  <div class="d-flex align-items-center gap-1">
                    <i class="text-danger ri-star-fill"></i>
                    <span class="fs-12 text-body position-relative top-1">
                      {{ review.rating.toFixed(1) }}
                    </span>
                  </div>
                </td>
                <td
                  class="border-border-color-50"
                  style="padding-top: 17px; padding-bottom: 17px"
                >
                  <h4 class="fs-14 fw-semibold text-secondary mb-1">
                    {{ review.title }}
                  </h4>
                  <p
                    class="fs-14 text-body"
                    style="max-width: 617px; line-height: 1.8"
                  >
                    {{ review.content }}
                  </p>
                </td>
                <td
                  class="fs-14 text-secondary border-border-color-50"
                  style="padding-top: 17px; padding-bottom: 17px"
                >
                  {{ formatDate(review.date) }}
                </td>
                <td
                  class="text-end border-border-color-50"
                  style="padding-top: 17px; padding-bottom: 17px"
                >
                  <div
                    class="d-flex justify-content-end align-items-center gap-2"
                  >
                    <button
                      class="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
                      @click="viewReview(review)"
                    >
                      <i class="material-symbols-outlined fs-16 text-primary">
                        visibility
                      </i>
                    </button>
                    <button
                      class="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
                      @click="editReview(review)"
                    >
                      <i
                        class="material-symbols-outlined fs-16 text-primary-div-50"
                      >
                        edit
                      </i>
                    </button>
                    <button
                      class="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
                      @click="deleteReview(review.id)"
                    >
                      <i class="material-symbols-outlined fs-16 text-danger">
                        delete
                      </i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="d-flex justify-content-center justify-content-sm-between align-items-center text-center flex-wrap gap-2 showing-wrap"
        >
          <span class="fs-13">
            Showing {{ showingStart }}-{{ showingEnd }} of
            {{ totalReviews }} Results
          </span>

          <nav aria-label="Page navigation example">
            <ul class="pagination mb-0 justify-content-center">
              <li class="page-item">
                <button
                  class="page-link icon hover-bg"
                  aria-label="Previous"
                  @click="prevPage"
                  :disabled="currentPage === 1"
                >
                  <i class="material-symbols-outlined">keyboard_arrow_left</i>
                </button>
              </li>
              <li class="page-item" v-for="page in totalPages" :key="page">
                <button
                  class="page-link"
                  :class="{ active: page === currentPage }"
                  @click="goToPage(page)"
                >
                  {{ page }}
                </button>
              </li>
              <li class="page-item">
                <button
                  class="page-link icon hover-bg"
                  aria-label="Next"
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                >
                  <i class="material-symbols-outlined">keyboard_arrow_right</i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  title: string;
  content: string;
  date: Date;
}

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Reviews",
  data() {
    return {
      reviews: [] as Review[],
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    totalReviews(): number {
      return this.reviews.length;
    },
    totalPages(): number {
      return Math.ceil(this.reviews.length / this.itemsPerPage);
    },
    paginatedReviews(): Review[] {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.reviews.slice(start, end);
    },
    showingStart(): number {
      return (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    showingEnd(): number {
      const end = this.currentPage * this.itemsPerPage;
      return end > this.totalReviews ? this.totalReviews : end;
    },
  },
  created() {
    this.generateMockReviews();
  },
  methods: {
    generateMockReviews() {
      const names = [
        "Joanna Watson",
        "Jenelia Anderson",
        "Jonathon Ronan",
        "Michael Scott",
        "Pam Beesly",
        "Jim Halpert",
        "Dwight Schrute",
        "Angela Martin",
        "Kevin Malone",
      ];
      const avatars = [
        require("@/assets/images/user-166.png"),
        require("@/assets/images/user-167.png"),
        require("@/assets/images/user-168.png"),
        require("@/assets/images/user-169.png"),
        require("@/assets/images/user-170.png"),
        require("@/assets/images/user-171.png"),
      ];
      const titles = [
        "Amazing Ambiance and Delicious Food!",
        "Best Brunch Spot in Town",
        "Good Food, Slow Service",
        "Perfect for Special Occasions",
        "Hidden Gem in the City",
        "Would Come Back Again",
        "Great Service, Average Food",
        "Lovely Atmosphere",
      ];
      const contents = [
        "Trezo was a fantastic dining experience. The ambiance is warm and inviting, perfect for a date night or celebration.",
        "Visited Trezo for brunch with friends, and it exceeded our expectations. The avocado toast was fresh, and their mimosas were spot-on.",
        "The food at Trezo was delicious, but the service was a bit slow. We had to wait a while for our appetizers.",
        "Celebrated my anniversary here and it was perfect. The staff went above and beyond to make our evening special.",
        "Found this place by accident and so glad we did! The menu is creative and everything we tried was flavorful.",
        "The steak was cooked to perfection and the wine selection was impressive. Definitely coming back!",
        "Service was excellent but the food was just okay. Maybe we ordered the wrong things?",
        "The decor is beautiful and the outdoor seating area is lovely in the evening. Great for photos too!",
      ];

      for (let i = 1; i <= 30; i++) {
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomAvatar =
          avatars[Math.floor(Math.random() * avatars.length)];
        const randomTitle = titles[Math.floor(Math.random() * titles.length)];
        const randomContent =
          contents[Math.floor(Math.random() * contents.length)];
        const randomRating = 3 + Math.random() * 2; // Ratings between 3.0 and 5.0
        const randomDate = new Date();
        randomDate.setDate(
          randomDate.getDate() - Math.floor(Math.random() * 30)
        );

        this.reviews.push({
          id: `#${i.toString().padStart(3, "0")}`,
          name: randomName,
          avatar: randomAvatar,
          rating: randomRating,
          title: randomTitle,
          content: randomContent,
          date: randomDate,
        });
      }

      // Sort by date (newest first)
      this.reviews.sort((a, b) => b.date.getTime() - a.date.getTime());
    },
    formatDate(date: Date): string {
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "2-digit",
      };
      return date.toLocaleDateString("en-US", options);
    },
    viewReview(review: Review) {
      console.log("Viewing review:", review);
      // Implement view logic here
    },
    editReview(review: Review) {
      console.log("Editing review:", review);
      // Implement edit logic here
    },
    deleteReview(id: string) {
      if (confirm("Are you sure you want to delete this review?")) {
        this.reviews = this.reviews.filter((review) => review.id !== id);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page: number) {
      this.currentPage = page;
    },
  },
});
</script>
