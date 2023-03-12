<script lang="ts" setup>
import { onMounted } from "vue";
import {
  NForm,
  NFormItemGi,
  NInput,
  NInputNumber,
  NGrid,
  NSelect,
  NButton,
} from "naive-ui";
import logo from "utools/logo.png";
import { useConfig, API_MODEL_OPT, retrieve } from "@/hooks/useConfig";
import { useRouter } from "vue-router";

const { configFormRef, config, updateConfig, configRules } = useConfig();

const apiModelOptions = API_MODEL_OPT.map((v: string) => ({
  label: v,
  value: v,
}));

const router = useRouter();

onMounted(() => {
  config.value = retrieve();
});
</script>

<template>
  <div class="chat-config flex h-full" style="background-color: #393a35">
    <div class="px-4 mx-auto" style="max-width: 580px">
      <img class="mx-auto" :src="logo" alt="" />
      <header class="space-y-10">
        <n-form
          ref="configFormRef"
          :model="config"
          :rules="configRules"
          label-placement="top"
          label-width="auto"
          require-mark-placement="right-hanging"
          size="small"
        >
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi
              :span="12"
              label="OPENAI_API_KEY"
              path="OPENAI.API_KEY"
            >
              <n-input
                required
                v-model:value="config.OPENAI.API_KEY"
                placeholder="OpenAI API 所需的 apiKey"
              />
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              label="OPENAI_API_BASE_URL"
              path="OPENAI.API_BASE_URL"
            >
              <n-input
                v-model:value="config.OPENAI.API_BASE_URL"
                placeholder="API 接口地址"
              />
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              label="OPENAI_API_MODEL"
              path="OPENAI.API_MODEL"
            >
              <n-select
                v-model:value="config.OPENAI.API_MODEL"
                placeholder="API 模型"
                :options="apiModelOptions"
              />
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              label="API_REVERSE_PROXY"
              path="OPENAI.API_REVERSE_PROXY"
            >
              <n-input
                v-model:value="config.OPENAI.API_REVERSE_PROXY"
                placeholder="Web API 反向代理地址"
              />
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              label="OPENAI_ACCESS_TOKEN"
              path="OPENAI.ACCESS_TOKEN"
            >
              <n-input
                v-model:value="config.OPENAI.ACCESS_TOKEN"
                placeholder="使用 Web API 所需的 accessToken"
                type="textarea"
                :autosize="{
                  minRows: 2,
                  maxRows: 3,
                }"
              />
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              label="TIMEOUT(超时时间s)"
              path="TIMEOUT"
            >
              <n-input-number v-model:value="config.TIMEOUT" />
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              label="SOCKS_PROXY_HOST"
              path="SOCKS_PROXY_HOST"
            >
              <n-input
                v-model:value="config.SOCKS_PROXY_HOST"
                placeholder="Socks代理"
              />
            </n-form-item-gi>
            <n-form-item-gi
              :span="12"
              label="SOCKS_PROXY_PORT"
              path="SOCKS_PROXY_PORT"
            >
              <n-input
                v-model:value="config.SOCKS_PROXY_PORT"
                placeholder="Socks代理端口"
              />
            </n-form-item-gi>
          </n-grid>
          <div class="text-center">
            <n-button type="primary" @click="updateConfig(), router.push('/')">
              保存配置
            </n-button>
          </div>
        </n-form>
      </header>
    </div>
  </div>
</template>

<style lang="scss">
.chat-config {
  span {
    color: rgb(139, 181, 188);

    &.n-button__content {
      color: white;
    }
  }
}
</style>
