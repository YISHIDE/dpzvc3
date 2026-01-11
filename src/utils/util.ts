// utils.ts
import type { ComponentPublicInstance } from "vue";

/** 驼峰转连字符 */
export function camelcaseToHyphen(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

/** 向上查找组件 */
export function findComponentUpward(
  content: ComponentPublicInstance,
  componentName: string | string[],
): ComponentPublicInstance | null {
  const componentNames =
    typeof componentName === "string" ? [componentName] : componentName;

  let parent = content.$parent;
  let name = parent?.$options.name;

  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent;
    name = parent?.$options.name;
  }

  return parent ?? null;
}

/** 向下查找第一个匹配组件 */
export function findComponentDownward(
  content: ComponentPublicInstance,
  componentName: string,
): ComponentPublicInstance | null {
  const childrens = (content as any).$children as ComponentPublicInstance[];
  let children: ComponentPublicInstance | null = null;

  for (let i = 0; i < childrens.length; i++) {
    const child = childrens[i];
    const name = child.$options.name;
    if (name === componentName) {
      children = child;
      break;
    } else {
      children = findComponentDownward(child, componentName);
      if (children) break;
    }
  }

  return children;
}

/** 向下查找所有匹配组件 */
export function findComponentsDownward(
  content: ComponentPublicInstance,
  componentName: string,
  components: ComponentPublicInstance[] = [],
): ComponentPublicInstance[] {
  const childrens = (content as any).$children as ComponentPublicInstance[];
  childrens.forEach((child) => {
    const name = child.$options.name;
    const childs = (child as any).$children as ComponentPublicInstance[];

    if (name === componentName) components.push(child);
    if (childs.length) {
      findComponentsDownward(child, componentName, components);
    }
  });

  return components;
}

/** 生成随机字符串 */
export function randomStr(len = 32): string {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let str = "";
  const max = chars.length;
  for (let i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * max));
  }
  return str;
}

/** JPEG 编码器（any 处理） */
export const JPEG: { JPEGEncoder: any } = {
  JPEGEncoder: function (a: any) {
    /* 原始算法保持 any */
  },
};

/** 滚动到指定位置 */
export function scrollTop(
  el: HTMLElement | Window,
  from = 0,
  to: number,
  duration = 500,
) {
  if (typeof window !== "undefined" && !window.requestAnimationFrame) {
    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
  }

  const difference = Math.abs(from - to);
  const step = Math.ceil((difference / duration) * 50);

  function scroll(start: number, end: number, step: number) {
    if (start === end) return;

    const d =
      start < end ? Math.min(start + step, end) : Math.max(start - step, end);

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      (el as HTMLElement).scrollTop = d;
    }

    window.requestAnimationFrame(() => scroll(d, end, step));
  }

  scroll(from, to, step);
}

/** Cookie 操作 */
interface CookieOptions {
  path?: string;
  expire?: number;
  [key: string]: any;
}

export const cookieStorage = {
  getItem(key?: string): string | Record<string, string> | null {
    const result: any = {};
    const cookies = document.cookie ? document.cookie.split("; ") : [];
    const decodes = /(%[0-9A-Z]{2})+/g;

    for (const cookie of cookies) {
      const parts = cookie.split("=");
      let name = parts.shift()!;
      let value = parts.join("=");

      name = name.replace(decodes, decodeURIComponent);
      value = value.replace(decodes, decodeURIComponent);

      if (name === key) return value;
      if (!key) result[name] = value;
    }

    return !key ? result : null;
  },

  removeItem(key: string, options: CookieOptions = {}) {
    const opts = Object.assign({ path: "/", expire: -1 }, options);
    this.setItem(key, "", opts);
  },

  key(index: number): string {
    const cookies = document.cookie ? document.cookie.split(/;\s*/) : [];
    if (index < 0 || index >= cookies.length) return "";
    return cookies[index].split("=").shift()!;
  },

  setItem(key: string, value: string, options: CookieOptions = {}) {
    const opts = Object.assign({ path: "/" }, options);
    let cookieStr = encodeURIComponent(key) + "=" + encodeURIComponent(value);
    if (opts.expire)
      cookieStr += "; expires=" + new Date(opts.expire).toUTCString();
    if (opts.path) cookieStr += "; path=" + opts.path;
    document.cookie = cookieStr;
  },
};
