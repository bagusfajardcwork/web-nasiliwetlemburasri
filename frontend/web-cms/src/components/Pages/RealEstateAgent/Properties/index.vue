<template>
  <div class="card bg-white border-0 rounded-3 mb-4">
    <div class="card-body p-25">
      <!-- Search and Add Property -->
      <div
        class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4"
      >
        <form class="position-relative table-src-form me-0">
          <input
            type="text"
            class="form-control border-0"
            placeholder="Search here...."
            v-model="searchQuery"
            @input="filterProperties"
          />
          <i
            class="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y text-secondary"
          >
            search
          </i>
        </form>
        <button
          class="btn btn-outline-primary fw-medium rounded-3 hover-bg"
          data-bs-toggle="modal"
          data-bs-target="#propertyModal"
          @click="openAddModal"
        >
          <span class="d-flex align-items-center" style="gap: 5px">
            <i class="ri-add-line d-none d-sm-inline-block fs-20 lh-1"></i>
            <span>Add New Property</span>
          </span>
        </button>
      </div>

      <!-- Property Table -->
      <div class="default-table-area all-products px-20">
        <div class="table-responsive">
          <table class="table align-middle">
            <thead>
              <tr>
                <th scope="col">
                  <div
                    class="form-check d-flex align-items-center"
                    style="gap: 10px"
                  >
                    <input
                      class="form-check-input position-relative top-1"
                      type="checkbox"
                      v-model="selectAll"
                      @change="toggleSelectAll"
                    />
                    <label class="position-relative fs-14">Code</label>
                  </div>
                </th>
                <th scope="col">
                  <span class="fs-14">Property</span>
                </th>
                <th scope="col">
                  <span class="fs-14">Address</span>
                </th>
                <th scope="col">
                  <span class="fs-14">Views</span>
                </th>
                <th scope="col">
                  <span class="fs-14">Date</span>
                </th>
                <th scope="col">
                  <span class="fs-14">Status</span>
                </th>
                <th scope="col"></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="property in paginatedProperties" :key="property.id">
                <td class="text-body">
                  <div
                    class="form-check d-flex align-items-center"
                    style="gap: 10px"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :value="property.id"
                      v-model="selectedProperties"
                    />
                    <label class="position-relative top-2">
                      {{ property.code }}
                    </label>
                  </div>
                </td>
                <td>
                  <RouterLink
                    to="/real-estate-agent/properties"
                    class="d-flex align-items-center"
                  >
                    <img
                      :src="property.imageUrl || getDefaultImageUrl()"
                      class="rounded-3"
                      style="width: 60px; height: 60px; object-fit: cover"
                      alt="property-image"
                      @error="handleImageError"
                    />
                    <div class="ms-2 ps-1">
                      <span class="fs-13 text-body mb-1 d-block">
                        {{ property.type }}
                      </span>
                      <h6 class="fw-medium fs-15 text-secondary mb-0">
                        {{ property.name }}
                      </h6>
                    </div>
                  </RouterLink>
                </td>
                <td class="text-secondary">
                  <p style="max-width: 300px">{{ property.address }}</p>
                </td>
                <td class="text-secondary">
                  {{ property.views.toLocaleString() }}
                </td>
                <td class="text-secondary">{{ formatDate(property.date) }}</td>
                <td>
                  <span
                    :class="{
                      'd-inline-block border px-2 rounded-pill fs-12 fw-medium': true,
                      'bg-success-80 border-success-60 text-success-60':
                        property.status === 'Active',
                      'bg-danger-70 border-danger-60 text-danger-60':
                        property.status === 'Inactive',
                    }"
                  >
                    {{ property.status }}
                  </span>
                </td>
                <td>
                  <div class="d-flex align-items-center gap-1">
                    <button
                      class="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
                      @click="viewProperty(property)"
                    >
                      <i class="material-symbols-outlined fs-16 text-primary">
                        visibility
                      </i>
                    </button>
                    <button
                      class="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
                      data-bs-toggle="modal"
                      data-bs-target="#propertyModal"
                      @click="editProperty(property)"
                    >
                      <i class="material-symbols-outlined fs-16 text-body">
                        edit
                      </i>
                    </button>
                    <button
                      class="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
                      @click="confirmDelete(property.id)"
                    >
                      <i class="material-symbols-outlined fs-16 text-danger">
                        delete
                      </i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredProperties.length === 0">
                <td colspan="7" class="text-center py-4">
                  No properties found
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          class="d-flex justify-content-center justify-content-sm-between align-items-center text-center flex-wrap gap-2 showing-wrap"
        >
          <span class="fs-13">
            Showing {{ showingStart }} to {{ showingEnd }} of
            {{ filteredProperties.length }} Results
          </span>

          <nav aria-label="Page navigation example">
            <ul class="pagination mb-0 justify-content-center">
              <li class="page-item">
                <button
                  class="page-link icon hover-bg"
                  :disabled="currentPage === 1"
                  @click="changePage(currentPage - 1)"
                >
                  <i class="material-symbols-outlined">keyboard_arrow_left</i>
                </button>
              </li>
              <li class="page-item" v-for="page in totalPages" :key="page">
                <button
                  class="page-link"
                  :class="{ active: currentPage === page }"
                  @click="changePage(page)"
                >
                  {{ page }}
                </button>
              </li>
              <li class="page-item">
                <button
                  class="page-link icon hover-bg"
                  :disabled="currentPage === totalPages"
                  @click="changePage(currentPage + 1)"
                >
                  <i class="material-symbols-outlined">keyboard_arrow_right</i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- Property Modal -->
      <div
        class="modal fade"
        id="propertyModal"
        tabindex="-1"
        aria-labelledby="propertyModalLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered"
          style="max-width: 550px"
        >
          <div class="modal-content rounded-0">
            <div class="modal-header border-0 p-4 border-bottom">
              <h1 class="modal-title fs-18">
                {{ isEditing ? "Edit Property" : "Add New Property" }}
              </h1>
              <button
                type="button"
                class="btn-close campaigns-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="resetForm"
              ></button>
            </div>
            <div class="modal-body p-4">
              <form @submit.prevent="submitForm">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group mb-4">
                      <label class="label text-secondary">Code</label>
                      <input
                        type="text"
                        class="form-control h-60 border-border-color"
                        v-model="formData.code"
                        placeholder="TRZ-32"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group mb-4">
                      <label class="label text-secondary">Property Name</label>
                      <input
                        type="text"
                        class="form-control h-60 border-border-color"
                        v-model="formData.name"
                        placeholder="Golden Sun Room"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group mb-4">
                      <label class="label text-secondary">Property Type</label>
                      <input
                        type="text"
                        class="form-control h-60 border-border-color"
                        v-model="formData.type"
                        placeholder="Luxury Apartment"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group mb-4">
                      <label class="label text-secondary">Address</label>
                      <input
                        type="text"
                        class="form-control h-60 border-border-color"
                        v-model="formData.address"
                        placeholder="789 Northern Lights Drive, Calgary, AB"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group mb-4">
                      <label class="label text-secondary">Views</label>
                      <input
                        type="number"
                        class="form-control h-60 border-border-color"
                        v-model="formData.views"
                        placeholder="2012"
                        required
                        min="0"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group mb-4">
                      <label class="label text-secondary">Date</label>
                      <input
                        type="date"
                        class="form-control h-60 border-border-color"
                        v-model="formData.date"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group mb-4">
                      <label class="label text-secondary">Status</label>
                      <select
                        class="form-select form-control h-60"
                        v-model="formData.status"
                        required
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group mb-4 only-file-upload">
                      <label class="label text-secondary">
                        Upload Property Images
                      </label>
                      <div
                        class="form-control h-100 text-center position-relative p-4 p-lg-5"
                      >
                        <div class="product-upload">
                          <label for="file-upload" class="file-upload mb-0">
                            <i
                              class="ri-folder-image-line bg-primary bg-opacity-10 p-2 rounded-1 text-primary"
                            ></i>
                            <span class="d-block text-body fs-14">
                              Drag and drop an image or
                              <span
                                class="text-primary text-decoration-underline"
                              >
                                Browse
                              </span>
                            </span>
                          </label>
                          <input
                            id="file-upload"
                            class="form__file bottom-0"
                            type="file"
                            @change="handleFileUpload"
                            accept="image/*"
                          />
                        </div>
                      </div>
                      <div v-if="formData.imagePreview" class="mt-2">
                        <img
                          :src="formData.imagePreview"
                          class="rounded-2"
                          style="width: 50px; height: 50px; object-fit: cover"
                        />
                        <button
                          type="button"
                          class="btn btn-sm btn-outline-danger ms-2"
                          @click="removeImage"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="d-flex justify-content-end flex-wrap gap-3">
                      <button
                        type="button"
                        class="btn btn-danger py-2 px-4 fw-medium fs-16 text-white"
                        data-bs-dismiss="modal"
                        @click="resetForm"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        class="btn btn-primary py-2 px-4 fw-medium fs-16"
                        data-bs-dismiss="modal"
                        :disabled="isSubmitting"
                      >
                        <span v-if="isSubmitting">
                          <span
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Processing...
                        </span>
                        <span v-else>
                          {{ isEditing ? "Update" : "Create" }}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title">Confirm Delete</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>
                Are you sure you want to delete this property? This action
                cannot be undone.
              </p>
            </div>
            <div class="modal-footer border-0">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                @click="deleteProperty"
                :disabled="isDeleting"
              >
                <span v-if="isDeleting">
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Deleting...
                </span>
                <span v-else> Delete </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { Modal } from "bootstrap";

interface Property {
  id: number;
  code: string;
  type: string;
  name: string;
  image: string;
  imageUrl?: string;
  address: string;
  views: number;
  date: string;
  status: "Active" | "Inactive";
}

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Properties",
  setup() {
    const properties = ref<Property[]>([
      {
        id: 1,
        code: "TRZ-32",
        type: "Luxury Apartment",
        name: "The Golden Haven",
        image: "property-17.jpg",
        address: "123 Sunshine Boulevard, Vancouver, BC",
        views: 1450,
        date: "2025-11-12",
        status: "Active",
      },
      {
        id: 2,
        code: "TRZ-35",
        type: "High-End Villa",
        name: "Tranquil Meadows",
        image: "property-18.jpg",
        address: "456 Whispering Pines Lane, Toronto, ON",
        views: 1890,
        date: "2025-11-10",
        status: "Active",
      },
      {
        id: 3,
        code: "TRZ-36",
        type: "Beachfront House",
        name: "Aurora Heights",
        image: "property-19.jpg",
        address: "789 Northern Lights Drive, Calgary, AB",
        views: 1320,
        date: "2025-11-08",
        status: "Active",
      },
      {
        id: 4,
        code: "TRZ-37",
        type: "Mountain Cabin",
        name: "Crystal Cove Villas",
        image: "property-20.jpg",
        address: "234 Seaside Avenue, Halifax, NS",
        views: 1124,
        date: "2025-11-10",
        status: "Inactive",
      },
      {
        id: 5,
        code: "TRZ-39",
        type: "Business Center",
        name: "Verdant Valley Estates",
        image: "property-21.jpg",
        address: "567 Greenfield Circle, Winnipeg, MB",
        views: 1532,
        date: "2025-10-18",
        status: "Active",
      },
      {
        id: 6,
        code: "TRZ-42",
        type: "Conference & Event Venue",
        name: "Summit Business Hub",
        image: "property-22.jpg",
        address: "890 Innovation Street, Ottawa, ON",
        views: 7721,
        date: "2025-10-17",
        status: "Active",
      },
      {
        id: 7,
        code: "TRZ-46",
        type: "Luxury Resort",
        name: "Pinnacle Plaza",
        image: "property-23.jpg",
        address: "345 Cityscape Road, Edmonton, AB",
        views: 5214,
        date: "2025-10-13",
        status: "Inactive",
      },
      {
        id: 8,
        code: "TRZ-47",
        type: "Beachfront Resort",
        name: "The Nexus Tower",
        image: "property-24.jpg",
        address: "123 Sunshine Boulevard, Vancouver, BC",
        views: 1450,
        date: "2025-11-12",
        status: "Active",
      },
      {
        id: 9,
        code: "TRZ-48",
        type: "Eco-Friendly Hotel",
        name: "Golden Sands Lodge",
        image: "property-25.jpg",
        address: "456 Whispering Pines Lane, Toronto, ON",
        views: 1890,
        date: "2025-11-10",
        status: "Active",
      },
      {
        id: 10,
        code: "TRZ-49",
        type: "Boutique Hotel",
        name: "Azure Bay Inn",
        image: "property-26.jpg",
        address: "789 Northern Lights Drive, Calgary, AB",
        views: 1320,
        date: "2025-11-08",
        status: "Active",
      },
    ]);

    // Form data
    const formData = ref({
      id: 0,
      code: "",
      type: "",
      name: "",
      image: "",
      address: "",
      views: 0,
      date: "",
      status: "Active" as "Active" | "Inactive",
      imagePreview: "",
      imageFile: null as File | null,
    });

    // UI state
    const isEditing = ref(false);
    const searchQuery = ref("");
    const selectedProperties = ref<number[]>([]);
    const selectAll = ref(false);
    const currentPage = ref(1);
    const itemsPerPage = 8;
    const propertyToDelete = ref<number | null>(null);
    const isSubmitting = ref(false);
    const isDeleting = ref(false);

    // Modal instances
    let propertyModal: Modal;
    let deleteModal: Modal;

    // Initialize modals when component mounts
    onMounted(() => {
      const modalElement = document.getElementById("propertyModal");
      if (modalElement) {
        propertyModal = new Modal(modalElement);
      } else {
        console.error("Property modal element not found.");
      }
      const deleteModalElement = document.getElementById("deleteModal");
      if (deleteModalElement) {
        deleteModal = new Modal(deleteModalElement);
      } else {
        console.error("Delete modal element not found.");
      }

      // Initialize image URLs for existing properties
      properties.value.forEach((property) => {
        if (property.image) {
          property.imageUrl = getImageUrl(property.image);
        }
      });
    });

    // Computed properties
    const filteredProperties = computed(() => {
      if (!searchQuery.value) return properties.value;
      const query = searchQuery.value.toLowerCase();
      return properties.value.filter(
        (property) =>
          property.code.toLowerCase().includes(query) ||
          property.name.toLowerCase().includes(query) ||
          property.type.toLowerCase().includes(query) ||
          property.address.toLowerCase().includes(query) ||
          property.status.toLowerCase().includes(query)
      );
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredProperties.value.length / itemsPerPage);
    });

    const paginatedProperties = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredProperties.value.slice(start, end);
    });

    const showingStart = computed(() => {
      return (currentPage.value - 1) * itemsPerPage + 1;
    });

    const showingEnd = computed(() => {
      const end = currentPage.value * itemsPerPage;
      return end > filteredProperties.value.length
        ? filteredProperties.value.length
        : end;
    });

    // Methods
    const getDefaultImageUrl = () => {
      return require("@/assets/images/property-17.jpg");
    };

    const getImageUrl = (imageName: string) => {
      try {
        return require(`@/assets/images/${imageName}`);
      } catch (error) {
        console.error(`Error loading image ${imageName}:`, error);
        return getDefaultImageUrl();
      }
    };

    const handleImageError = (event: Event) => {
      const img = event.target as HTMLImageElement;
      img.src = getDefaultImageUrl();
    };

    const handleFileUpload = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const file = input.files[0];

        // Validate file type
        if (!file.type.match("image.*")) {
          alert("Please select an image file (JPEG, PNG, etc.)");
          return;
        }

        // Validate file size (2MB max)
        if (file.size > 2 * 1024 * 1024) {
          alert("Image must be less than 2MB");
          return;
        }

        formData.value.imageFile = file;

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          formData.value.imagePreview = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    };

    const formatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric",
      };
      return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const filterProperties = () => {
      currentPage.value = 1;
      selectedProperties.value = [];
      selectAll.value = false;
    };

    const changePage = (page: number) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };

    const toggleSelectAll = () => {
      if (selectAll.value) {
        selectedProperties.value = paginatedProperties.value.map(
          (property) => property.id
        );
      } else {
        selectedProperties.value = [];
      }
    };

    const removeImage = () => {
      formData.value.imagePreview = "";
      formData.value.imageFile = null;
      formData.value.image = "";
    };

    const resetForm = () => {
      formData.value = {
        id: 0,
        code: "",
        type: "",
        name: "",
        image: "",
        address: "",
        views: 0,
        date: "",
        status: "Active",
        imagePreview: "",
        imageFile: null,
      };
      isEditing.value = false;
      isSubmitting.value = false;
    };

    const openAddModal = () => {
      resetForm();
      propertyModal.show();
    };

    const submitForm = () => {
      if (isEditing.value) {
        updateProperty();
      } else {
        addProperty();
      }
    };

    const addProperty = async () => {
      isSubmitting.value = true;

      try {
        const newId =
          properties.value.length > 0
            ? Math.max(...properties.value.map((p) => p.id)) + 1
            : 1;

        // In a real app, you would upload the image file to a server here
        // For demo purposes, we'll just use the file name
        const imageName = formData.value.imageFile
          ? formData.value.imageFile.name
          : "property-17.jpg";

        const newProperty: Property = {
          id: newId,
          code: formData.value.code,
          type: formData.value.type,
          name: formData.value.name,
          image: imageName,
          imageUrl: formData.value.imagePreview || getDefaultImageUrl(),
          address: formData.value.address,
          views: formData.value.views,
          date: formData.value.date,
          status: formData.value.status,
        };

        properties.value.unshift(newProperty);
        propertyModal.hide();
        resetForm();
      } catch (error) {
        console.error("Error adding property:", error);
        alert("Failed to add property. Please try again.");
      } finally {
        isSubmitting.value = false;
      }
    };

    const editProperty = (property: Property) => {
      isEditing.value = true;
      formData.value = {
        id: property.id,
        code: property.code,
        type: property.type,
        name: property.name,
        image: property.image,
        address: property.address,
        views: property.views,
        date: property.date,
        status: property.status,
        imagePreview: property.imageUrl || getImageUrl(property.image),
        imageFile: null,
      };
      propertyModal.show();
    };

    const updateProperty = async () => {
      isSubmitting.value = true;

      try {
        const index = properties.value.findIndex(
          (p) => p.id === formData.value.id
        );

        if (index !== -1) {
          // In a real app, you would upload the new image file to a server here
          // For demo purposes, we'll just use the file name if a new file was selected
          const imageName = formData.value.imageFile
            ? formData.value.imageFile.name
            : properties.value[index].image;

          properties.value[index] = {
            ...properties.value[index],
            code: formData.value.code,
            type: formData.value.type,
            name: formData.value.name,
            image: imageName,
            imageUrl:
              formData.value.imagePreview || properties.value[index].imageUrl,
            address: formData.value.address,
            views: formData.value.views,
            date: formData.value.date,
            status: formData.value.status,
          };
        }

        propertyModal.hide();
        resetForm();
      } catch (error) {
        console.error("Error updating property:", error);
        alert("Failed to update property. Please try again.");
      } finally {
        isSubmitting.value = false;
      }
    };

    const confirmDelete = (id: number) => {
      propertyToDelete.value = id;
      deleteModal.show();
    };

    const deleteProperty = async () => {
      isDeleting.value = true;

      try {
        if (propertyToDelete.value) {
          properties.value = properties.value.filter(
            (p) => p.id !== propertyToDelete.value
          );
          deleteModal.hide();
          propertyToDelete.value = null;

          // Reset to first page if we deleted the last item on the current page
          if (paginatedProperties.value.length === 0 && currentPage.value > 1) {
            currentPage.value = currentPage.value - 1;
          }
        }
      } catch (error) {
        console.error("Error deleting property:", error);
        alert("Failed to delete property. Please try again.");
      } finally {
        isDeleting.value = false;
      }
    };

    const viewProperty = (property: Property) => {
      console.log("Viewing property:", property);
      // In a real app, you would navigate to a detailed view
      // Example: router.push(`/properties/${property.id}`);
    };

    return {
      properties,
      formData,
      isEditing,
      searchQuery,
      selectedProperties,
      selectAll,
      currentPage,
      filteredProperties,
      paginatedProperties,
      totalPages,
      showingStart,
      showingEnd,
      isSubmitting,
      isDeleting,
      getDefaultImageUrl,
      getImageUrl,
      formatDate,
      filterProperties,
      changePage,
      toggleSelectAll,
      handleFileUpload,
      removeImage,
      resetForm,
      handleImageError,
      submitForm,
      addProperty,
      editProperty,
      updateProperty,
      confirmDelete,
      deleteProperty,
      viewProperty,
      openAddModal,
    };
  },
});
</script>
