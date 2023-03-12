
import { useMessage, FormItemRule } from "naive-ui";
import { ref, unref, Ref } from "vue";
import type { DB_Config } from "utools/preload/db";
import type { FormValidationError } from "naive-ui";

const { initServer, retrieve, update, DEFAULT_CONFIG, API_MODEL_OPT } = window.preload;


function useConfig() {

  const config = ref<DB_Config>(DEFAULT_CONFIG) as Ref<DB_Config>;
  const configFormRef = ref();
  const message = useMessage();

  const configRules = {
    OPENAI: {
      API_KEY: {
        required: true,
        validator(_rule: FormItemRule, value: string) {
          return !!value || !!config.value.OPENAI.ACCESS_TOKEN;
        },
      },
      ACCESS_TOKEN: {
        required: true,
        validator(_rule: FormItemRule, value: string) {
          return !!value || !!config.value.OPENAI.API_KEY;
        },
      },
    },
  };


  const updateConfig = () => {
    configFormRef.value?.validate((errors: FormValidationError) => {
      if (!errors) {
        message.success("success");
        update("config", unref(config))
        initServer()
      } else {
        console.log(errors);
        message.error("API_KEY 或者 ACCESS_TOKEN，需要填写一个");
      }
    });
  }

  return {
    config,
    configFormRef,
    configRules,
    updateConfig,
  }
}


export { initServer, retrieve, useConfig, DB_Config, API_MODEL_OPT }
