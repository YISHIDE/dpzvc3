/**
 * Created by admin on 2025/11/4.
 */
import type { App } from "vue";
import Badge from "./badge";
Badge.install = (app: App): void => {
  app.component("Badge", Badge); // 注册全局组件
};
type IWithInstall<T> = T & { install(app: App): void };
const _Badge = Badge as IWithInstall<typeof Badge>;
export default _Badge;
export type { BadgeProps } from "./types";
