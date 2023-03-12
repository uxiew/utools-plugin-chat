<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  NSpin,
  NInput,
  NForm,
  NGrid,
  NFormItemGi,
  NSelect,
  NButton,
  NInputNumber,
} from "naive-ui";
import { fetchChatConfig } from "@/api";
import { useConfig, DB_Config, API_MODEL_OPT } from "@/hooks/useConfig";
import pkg from "@/../package.json";

const { config, configRules, updateConfig, configFormRef } = useConfig();
const loading = ref(false);

async function fetchConfig() {
  try {
    loading.value = true;
    const { data } = await fetchChatConfig<DB_Config>();
    config.value = data;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchConfig();
});

const apiModelOptions = API_MODEL_OPT.map((v: string) => ({
  label: v,
  value: v,
}));
</script>

<template>
  <NSpin :show="loading">
    <div class="px-4 space-y-2 min-h-[460px]">
      <h2 class="text-xl font-bold">Version - {{ pkg.version }}</h2>
      <div class="px-2 rounded-md">
        <header>
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
                    minRows: 3,
                    maxRows: 5,
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
            <div class="text-center -mt-2">
              <n-button type="primary" @click="updateConfig">保存配置</n-button>
            </div>
          </n-form>
        </header>
      </div>
      <!-- <p>{{ $t("setting.api") }}：{{ config?.apiModel ?? "-" }}</p>
      <p>{{ $t("setting.reverseProxy") }}：{{ config?.reverseProxy ?? "-" }}</p>
      <p>{{ $t("setting.timeout") }}：{{ config?.timeoutMs ?? "-" }}</p>
      <p>{{ $t("setting.socks") }}：{{ config?.socksProxy ?? "-" }}</p> -->
    </div>
  </NSpin>
</template>
