<template>
  <div id="commonTable">
    <el-table :data="data" :max-height="maxHeight" tooltip-effect="light" :highlight-current-row=true
              　　　　　　@selection-change="handleSelectionChange">
      <slot name="table_oper"/>
      <el-table-column type="index" width="60" label="序号"></el-table-column>
      <template v-for="(item, index) in columns">
        <el-table-column
          v-if="item.show != false"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :align="item.align?item.align:'center'"
          :width="item.width"
          :formatter="item.formatter?item.formatter : formatterValue"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      style="text-align: right;margin:23px 0;"
      :class="(pager.total<=10) ? 'hidePagination' : 'showPagination'"
      background
      :current-page="pager.page"
      :page-size="pager.unit"
      :total="pager.total"
      layout="prev, pager, next">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'Table',
    props: {
      columns: Array,
      data: Array,
      pager: Object,
      maxHeight: {
        type: Number,
        default: 616
      }
    },
    filters: {
      ellipsis(value) {
        if (!value) return "";
        if (value.length > 5) {
          return value.slice(0, 30) + "...";
        }
        return value;
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.$emit('handleSelectionChange', val);
      },
      handleCurrentChange(val) {
        this.$emit('handleCurrentChange', val);
      },
      formatterValue(row, column, cellValue) {
        return cellValue;
      }
    }
  }
</script>
<style lang="css">
  .hidePagination{
    display: none;
  }
  .showPagination{
    display: block;
  }
</style>
