declare module "cookie-cutter" {
  interface Option {
    expires: number;
  }

  export function get(
    key: string
  )
  export function set(
    key: string,
    value: string,
    option?: Option,
  )
}