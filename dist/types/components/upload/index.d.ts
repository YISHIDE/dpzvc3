/**
 * Created by admin on 2025/10/26.
 */
import type { App } from "vue";
import Upload from "./upload";
type IWithInstall<T> = T & {
    install(app: App): void;
};
declare const _Upload: IWithInstall<typeof Upload>;
export default _Upload;
export type { UploadProps } from "./types";
//# sourceMappingURL=index.d.ts.map