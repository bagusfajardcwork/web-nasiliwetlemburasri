<template>
  <div class="main-content-container overflow-hidden">
    <WelcomeBack />
    <div class="row">
      <div class="col-lg-4 col-md-6">
        <TotalEmployees />
      </div>
      <div class="col-lg-4 col-md-6">
        <ResignedEmployees />
      </div>
      <div class="col-lg-4 col-md-12">
        <NewEmployees />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8">
        <EmployeeAttendanceTrendsChart />
      </div>
      <div class="col-lg-4">
        <EmployeeWorkFormatChart />
      </div>
    </div>
    <div class="row">
      <div class="col-xxl-4">
        <EmployeeSalaryChart />
      </div>
      <div class="col-xxl-8">
        <EmployeeLeaveRequest />
      </div>
    </div>

    <EmployeeList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WelcomeBack from "../../components/Dashboard/HRM/WelcomeBack.vue";
import TotalEmployees from "../../components/Dashboard/HRM/TotalEmployees.vue";
import ResignedEmployees from "../../components/Dashboard/HRM/ResignedEmployees.vue";
import NewEmployees from "../../components/Dashboard/HRM/NewEmployees.vue";
import EmployeeAttendanceTrendsChart from "../../components/Dashboard/HRM/EmployeeAttendanceTrendsChart.vue";
import EmployeeWorkFormatChart from "../../components/Dashboard/HRM/EmployeeWorkFormatChart.vue";
import EmployeeSalaryChart from "../../components/Dashboard/HRM/EmployeeSalaryChart.vue";
import EmployeeLeaveRequest from "../../components/Dashboard/HRM/EmployeeLeaveRequest.vue";
import EmployeeList from "../../components/Dashboard/HRM/EmployeeList.vue";

export default defineComponent({
  name: "HRMPage",
  components: {
    WelcomeBack,
    TotalEmployees,
    ResignedEmployees,
    NewEmployees,
    EmployeeAttendanceTrendsChart,
    EmployeeWorkFormatChart,
    EmployeeSalaryChart,
    EmployeeLeaveRequest,
    EmployeeList,
  },
});
</script>
