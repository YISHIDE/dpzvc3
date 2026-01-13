/**
 * Created by admin on 2025/10/26.
 */
import type { App } from "vue";
import Upload from "./upload";
Upload.install = (app: App): void => {
  app.component("Upload", Upload); // 注册全局组件
};
type IWithInstall<T> = T & { install(app: App): void };
const _Upload = Upload as IWithInstall<typeof Upload>;
export default _Upload;
// export default Upload
export type { UploadProps } from "./types";
