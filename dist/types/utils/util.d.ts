import type { ComponentPublicInstance } from "vue";
/** 驼峰转连字符 */
export declare function camelcaseToHyphen(str: string): string;
/** 向上查找组件 */
export declare function findComponentUpward(content: ComponentPublicInstance, componentName: string | string[]): ComponentPublicInstance | null;
/** 向下查找第一个匹配组件 */
export declare function findComponentDownward(content: ComponentPublicInstance, componentName: string): ComponentPublicInstance | null;
/** 向下查找所有匹配组件 */
export declare function findComponentsDownward(content: ComponentPublicInstance, componentName: string, components?: ComponentPublicInstance[]): ComponentPublicInstance[];
/** 生成随机字符串 */
export declare function randomStr(len?: number): string;
/** JPEG 编码器（any 处理） */
export declare const JPEG: {
    JPEGEncoder: any;
};
/** 滚动到指定位置 */
export declare function scrollTop(el: HTMLElement | Window, from: number | undefined, to: number, duration?: number): void;
/** Cookie 操作 */
interface CookieOptions {
    path?: string;
    expire?: number;
    [key: string]: any;
}
export declare const cookieStorage: {
    getItem(key?: string): string | Record<string, string> | null;
    removeItem(key: string, options?: CookieOptions): void;
    key(index: number): string;
    setItem(key: string, value: string, options?: CookieOptions): void;
};
export {};
//# sourceMappingURL=util.d.ts.map