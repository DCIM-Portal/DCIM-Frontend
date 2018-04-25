import merge from 'lodash/merge'

const META = '__meta__'

export default class VueRouterRoutesBuilder {
  constructor() {
    this.routesTree = {}
    this.index = 0
  }

  add(path, component = null, title = null, info = null, meta = {}) {
    let pathTree = {}
    let tree = pathTree // init / root
    let pathParts = path.split('/')
    pathParts.forEach((pathPart) => {
      tree[pathPart] = {}
      tree = tree[pathPart]
    })
    tree[META] = {}
    tree = tree[META]
    if (component) tree['component'] = component
    if (title) tree['title'] = title
    if (info) tree['info'] = info
    tree['path'] = path
    tree['index'] = this.index
    this.index ++

    // Consideration for detail component
    let detailComponent = meta['detailComponent']
    delete meta['detailComponent']

    // Merge meta and branch into tree
    Object.assign(tree, meta)
    merge(this.routesTree, pathTree)

    // Auto-generate detail component
    if (detailComponent)
      this.add(`${path}/:id`, detailComponent, null, null, meta)
  }

  flatten(accumulator = this.routesTree, parentMeta = {}, depth = 0) {
    let routesArray = []
    let currentRoute = {}

    let meta = {}
    delete(parentMeta['title'])
    delete(parentMeta['component'])
    delete(parentMeta['info'])
    merge(meta, parentMeta, VueRouterRoutesBuilder.getMetaFromNode(accumulator))
    delete(meta['index'])

    if (depth > 0) routesArray.push(Object.assign(currentRoute, meta, {depth: depth}))
    this.constructor.orderedChildNamesFromNode(accumulator).forEach((childNodeName) => {
      routesArray = routesArray.concat(this.flatten(accumulator[childNodeName], meta, depth+1))
    })

    return routesArray
  }

  toVueRouterRoutes() {
    let builderRoutesArray = this.flatten()
    let vueRouterRoutes = []
    builderRoutesArray.forEach((builderRoute) => {
      // Handle redirect
      if (builderRoute['redirect']) {
        vueRouterRoutes.push({
          path: builderRoute['path'],
          redirect: builderRoute['redirect']
        })
        return
      }

      // Only routes with Vue components can be a vue-router route
      if (!builderRoute['component']) return

      // Most routes
      let vueRouterRoute = {
        path: builderRoute['path'],
        name: builderRoute['title'],
        component: builderRoute['component']
      }
      delete(builderRoute['path'])
      delete(builderRoute['title'])
      delete(builderRoute['component'])
      vueRouterRoute['meta'] = builderRoute
      vueRouterRoutes.push(vueRouterRoute)
    })
    return vueRouterRoutes
  }

  static getMetaFromNode(node) {
    if (node[META]) return node[META]
    return {}
  }

  static orderedChildNamesFromNode(obj) {
    return Object.keys(obj).filter(e => e !== META).sort((a, b) => {
      return VueRouterRoutesBuilder.getMetaFromNode(obj[a]).index -
        VueRouterRoutesBuilder.getMetaFromNode(obj[b]).index
    })
  }

  getParentRoutes() {
    return this.flatten().filter((route) => route.depth === 2)
  }

  getParentTreeFromPath(path) {
    let pathParts = path.split('/').slice(0, 2)
    let tree = this.routesTree
    pathParts.forEach((pathPart) => {
      tree = tree[pathPart]
    })
    return tree
  }

  getParentRouteFromPath(path) {
    let tree = this.getParentTreeFromPath(path)
    return this.flatten()[tree[META].index]
  }

  getSectionsFromPath(path) {
    let tree = this.getParentTreeFromPath(path)
    let nextRoutes = this.flatten().slice(tree[META].index+1)
    let returnRoutes = []
    nextRoutes.some((route) => {
      if (route.depth <= 2) return true;
      if (route.depth === 3) returnRoutes.push(route)
    })
    return returnRoutes
  }

  getLinkableRouteFromPath(path) {
    let routes = this.flatten()
    let candidateRoute = routes.find((route) => route.path === path)
    if (typeof candidateRoute !== "undefined" && candidateRoute !== null ? candidateRoute.component : void 0)
      return candidateRoute
    if (path.endsWith('/')) return null
    return this.getLinkableRouteFromPath(path + '/')
  }

  getIndexOfPath(path) {
    let pathParts = path.split('/')
    let tree = this.routesTree
    pathParts.forEach((pathPart) => {
      tree = tree[pathPart]
    })
    return tree[META].index
  }

  getSubroutesOfPath(path) {
    let index = this.getIndexOfPath(path)

    let remainingRoutes = this.flatten().slice(index)
    let requiredDepth = remainingRoutes[0].depth + 1
    remainingRoutes = remainingRoutes.splice(1)
    let returnRoutes = []
    remainingRoutes.some((route) => {
      if (route.depth < requiredDepth) return true
      if (route.depth === requiredDepth) returnRoutes.push(route)
    })

    return returnRoutes
  }

  getFlatAncestryOfPath(path) {
    let index = this.getIndexOfPath(path)
    let leadingRoutes = this.flatten().splice(0, index+1).reverse()
    let currentDepth = leadingRoutes[0].depth
    let returnRoutes = [leadingRoutes[0]]

    leadingRoutes.forEach((route) => {
      if (route.depth < currentDepth) {
        currentDepth --
        returnRoutes.push(route)
      }
    })

    return returnRoutes.reverse()
  }
}
