type StaticImageData = {
  src: string;
  height: number;
  width: number;
  placeholder?: string;
};

declare module '*.png' {
  const content: StaticImageData;
  export default content;
}
