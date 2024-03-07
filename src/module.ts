import { createResolver, extendPages, defineNuxtModule, addPlugin } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions { }

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'subdomain',
    configKey: 'subdomain'
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    addPlugin({
      mode: 'server',
      src: resolve('./runtime/plugin')
    })

    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(resolve('./runtime/composables'))
    })
    nuxt.hook('pages:routerOptions', ({ files }) => {
      files.push({
        path: resolve('./runtime/app/router.options')
      })
    })
  },
})
