declare module '*.less';
declare module 'motion/lib/index';

declare type PolyfilledWindow = Window &
  typeof globalThis & {
    readonly ShadyCSS: any;
  };

declare const ICON_PATH: string;
declare const ICON_PATH_TUTORING: string;