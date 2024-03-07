import type { RouterOptions } from "@nuxt/schema"
import type { RouteRecordRaw } from "#vue-router"
import { useDomain } from "../composables/useDomain";
import { runInContext } from "vm";

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterOptions>{
  routes: (_routes) => {
    const domain = useDomain();

    if (!isBaseDomain(domain) || domain !== 'localhost') {
      let routes: RouteRecordRaw[] = [];
      routes = findAndReplace(`domains-${domain}`, `/domains/${domain}`, _routes);

      if (routes.length < 1) {
        routes = findAndReplace(`domains-default`, `/domains/:default()`, _routes);
      }

      return routes;
    }

    return _routes.filter(r => r.name && !r.name!.toString().includes("domains"));
  }
}

function isBaseDomain(domain:string) {
  // Regular expression to match a base domain
  const baseDomainRegex = /^[^.]+\.[^.]+$/;

  // Test if the domain matches the base domain regex
  return baseDomainRegex.test(domain);
}

function findAndReplace(nameValue: string, pathValue: string, _routes: readonly RouteRecordRaw[]) {
  const foundRoutes = _routes.filter(r => r.name && r.name.toString().includes(nameValue));
  const replacedRoutes = foundRoutes.map(r => {
    r.path = r.path === `${pathValue}` ? r.path.replace(pathValue, "/") : r.path.replace(pathValue + "/", "/");
    return r;
  });

  if (replacedRoutes.length > 0) {
    return replacedRoutes;
  }

  return [];
}
