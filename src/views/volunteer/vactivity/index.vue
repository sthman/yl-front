<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="志愿活动名称" prop="vactivityName">
        <el-input
          v-model="queryParams.vactivityName"
          placeholder="请输入志愿活动名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发布机构id" prop="publishingOrgId">
        <el-input
          v-model="queryParams.publishingOrgId"
          placeholder="请输入发布机构id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="招募人数" prop="vactivityNum">
        <el-input
          v-model="queryParams.vactivityNum"
          placeholder="请输入招募人数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="剩余人数" prop="remainingCount">
        <el-input
          v-model="queryParams.remainingCount"
          placeholder="请输入剩余人数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker clearable
          v-model="queryParams.startTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动地点" prop="vactivityAddress">
        <el-input
          v-model="queryParams.vactivityAddress"
          placeholder="请输入活动地点"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="活动积分" prop="vactivityStar">
        <el-input
          v-model="queryParams.vactivityStar"
          placeholder="请输入活动积分"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker clearable
          v-model="queryParams.endTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择结束时间">
        </el-date-picker>
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
          v-hasPermi="['volunteer:vactivity:add']"
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
          v-hasPermi="['volunteer:vactivity:edit']"
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
          v-hasPermi="['volunteer:vactivity:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['volunteer:vactivity:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="vactivityList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="志愿活动id" align="center" prop="vactivityId" />
      <el-table-column label="志愿活动名称" align="center" prop="vactivityName" />
      <el-table-column label="志愿活动内容" align="center" prop="vactivityContent" />
      <el-table-column label="发布机构id" align="center" prop="publishingOrgId" />
      <el-table-column label="发布机构类型" align="center" prop="publishingOrgType" />
      <el-table-column label="招募人数" align="center" prop="vactivityNum" />
      <el-table-column label="剩余人数" align="center" prop="remainingCount" />
      <el-table-column label="开始时间" align="center" prop="startTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动状态" align="center" prop="vactivityStatus" />
      <el-table-column label="活动地点" align="center" prop="vactivityAddress" />
      <el-table-column label="活动积分" align="center" prop="vactivityStar" />
      <el-table-column label="结束时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
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
            v-hasPermi="['volunteer:vactivity:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['volunteer:vactivity:remove']"
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

    <!-- 添加或修改志愿者招募对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="志愿活动名称" prop="vactivityName">
          <el-input v-model="form.vactivityName" placeholder="请输入志愿活动名称" />
        </el-form-item>
        <el-form-item label="志愿活动内容">
          <editor v-model="form.vactivityContent" :min-height="192"/>
        </el-form-item>
        <el-form-item label="发布机构id" prop="publishingOrgId">
          <el-input v-model="form.publishingOrgId" placeholder="请输入发布机构id" />
        </el-form-item>
        <el-form-item label="招募人数" prop="vactivityNum">
          <el-input v-model="form.vactivityNum" placeholder="请输入招募人数" />
        </el-form-item>
        <el-form-item label="剩余人数" prop="remainingCount">
          <el-input v-model="form.remainingCount" placeholder="请输入剩余人数" />
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker clearable
            v-model="form.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动地点" prop="vactivityAddress">
          <el-input v-model="form.vactivityAddress" placeholder="请输入活动地点" />
        </el-form-item>
        <el-form-item label="活动积分" prop="vactivityStar">
          <el-input v-model="form.vactivityStar" placeholder="请输入活动积分" />
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker clearable
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择结束时间">
          </el-date-picker>
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
import { listVactivity, getVactivity, delVactivity, addVactivity, updateVactivity } from "@/api/volunteer/vactivity";

export default {
  name: "Vactivity",
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
      // 志愿者招募表格数据
      vactivityList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        vactivityName: null,
        vactivityContent: null,
        publishingOrgId: null,
        publishingOrgType: null,
        vactivityNum: null,
        remainingCount: null,
        startTime: null,
        vactivityStatus: null,
        vactivityAddress: null,
        vactivityStar: null,
        endTime: null,
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
    /** 查询志愿者招募列表 */
    getList() {
      this.loading = true;
      listVactivity(this.queryParams).then(response => {
        this.vactivityList = response.rows;
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
        vactivityId: null,
        vactivityName: null,
        vactivityContent: null,
        publishingOrgId: null,
        publishingOrgType: null,
        vactivityNum: null,
        remainingCount: null,
        startTime: null,
        vactivityStatus: null,
        vactivityAddress: null,
        vactivityStar: null,
        endTime: null,
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
      this.ids = selection.map(item => item.vactivityId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加志愿者招募";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const vactivityId = row.vactivityId || this.ids
      getVactivity(vactivityId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改志愿者招募";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.vactivityId != null) {
            updateVactivity(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addVactivity(this.form).then(response => {
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
      const vactivityIds = row.vactivityId || this.ids;
      this.$modal.confirm('是否确认删除志愿者招募编号为"' + vactivityIds + '"的数据项？').then(function() {
        return delVactivity(vactivityIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('volunteer/vactivity/export', {
        ...this.queryParams
      }, `vactivity_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
