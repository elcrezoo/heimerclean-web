/** Resolves a `public/` path against Vite's base so the site also works from a sub-path (e.g. GitHub Pages). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

declare module 'vue' {
  interface ComponentCustomProperties {
    $asset: typeof asset
  }
}
