<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="仓库id，外键" prop="warehouseId">
        <el-input
          v-model="queryParams.warehouseId"
          placeholder="请输入仓库id，外键"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物品id，外键" prop="itemId">
        <el-input
          v-model="queryParams.itemId"
          placeholder="请输入物品id，外键"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备用列1" prop="beiyong1">
        <el-input
          v-model="queryParams.beiyong1"
          placeholder="请输入备用列1"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备用列2" prop="beiyong2">
        <el-input
          v-model="queryParams.beiyong2"
          placeholder="请输入备用列2"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备用列3" prop="beiyong3">
        <el-input
          v-model="queryParams.beiyong3"
          placeholder="请输入备用列3"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['storehouse:witem:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['storehouse:witem:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['storehouse:witem:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['storehouse:witem:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="witemList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="仓库id，外键" align="center" prop="warehouseId" />
      <el-table-column label="物品id，外键" align="center" prop="itemId" />
      <el-table-column label="备用列1" align="center" prop="beiyong1" />
      <el-table-column label="备用列2" align="center" prop="beiyong2" />
      <el-table-column label="备用列3" align="center" prop="beiyong3" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['storehouse:witem:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['storehouse:witem:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改仓库-物品关系对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="仓库id，外键" prop="warehouseId">
          <el-input v-model="form.warehouseId" placeholder="请输入仓库id，外键" />
        </el-form-item>
        <el-form-item label="物品id，外键" prop="itemId">
          <el-input v-model="form.itemId" placeholder="请输入物品id，外键" />
        </el-form-item>
        <el-form-item label="备用列1" prop="beiyong1">
          <el-input v-model="form.beiyong1" placeholder="请输入备用列1" />
        </el-form-item>
        <el-form-item label="备用列2" prop="beiyong2">
          <el-input v-model="form.beiyong2" placeholder="请输入备用列2" />
        </el-form-item>
        <el-form-item label="备用列3" prop="beiyong3">
          <el-input v-model="form.beiyong3" placeholder="请输入备用列3" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listWitem, getWitem, delWitem, addWitem, updateWitem } from "@/api/storehouse/witem";

export default {
  name: "Witem",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 仓库-物品关系表格数据
      witemList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        warehouseId: null,
        itemId: null,
        beiyong1: null,
        beiyong2: null,
        beiyong3: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询仓库-物品关系列表 */
    getList() {
      this.loading = true;
      listWitem(this.queryParams).then(response => {
        this.witemList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        warehouseId: null,
        itemId: null,
        beiyong1: null,
        beiyong2: null,
        beiyong3: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.warehouseId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加仓库-物品关系";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const warehouseId = row.warehouseId || this.ids
      getWitem(warehouseId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改仓库-物品关系";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.warehouseId != null) {
            updateWitem(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWitem(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const warehouseIds = row.warehouseId || this.ids;
      this.$modal.confirm('是否确认删除仓库-物品关系编号为"' + warehouseIds + '"的数据项？').then(function() {
        return delWitem(warehouseIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('storehouse/witem/export', {
        ...this.queryParams
      }, `witem_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
