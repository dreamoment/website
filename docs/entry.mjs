import { escape } from 'html-escaper';
/* empty css                                 */import { optimize } from 'svgo';
import 'http-cache-semantics';
import 'kleur/colors';
import 'node:fs/promises';
import 'node:os';
import 'node:path';
import 'node:url';
import 'magic-string';
import 'node:stream';
import 'slash';
import 'image-size';
import mime from 'mime';
/* empty css                                                                *//* empty css                                   */
function baseCreateComponent(cb, moduleId) {
  cb.isAstroComponentFactory = true;
  cb.moduleId = moduleId;
  return cb;
}
function createComponentWithOptions(opts) {
  const cb = baseCreateComponent(opts.factory, opts.moduleId);
  cb.propagation = opts.propagation;
  return cb;
}
function createComponent(arg1, moduleId) {
  if (typeof arg1 === "function") {
    return baseCreateComponent(arg1, moduleId);
  } else {
    return createComponentWithOptions(arg1);
  }
}

const ASTRO_VERSION = "1.9.2";

function createDeprecatedFetchContentFn() {
  return () => {
    throw new Error("Deprecated: Astro.fetchContent() has been replaced with Astro.glob().");
  };
}
function createAstroGlobFn() {
  const globHandler = (importMetaGlobResult, globValue) => {
    let allEntries = [...Object.values(importMetaGlobResult)];
    if (allEntries.length === 0) {
      throw new Error(`Astro.glob(${JSON.stringify(globValue())}) - no matches found.`);
    }
    return Promise.all(allEntries.map((fn) => fn()));
  };
  return globHandler;
}
function createAstro(filePathname, _site, projectRootStr) {
  const site = _site ? new URL(_site) : void 0;
  const referenceURL = new URL(filePathname, `http://localhost`);
  const projectRoot = new URL(projectRootStr);
  return {
    site,
    generator: `Astro v${ASTRO_VERSION}`,
    fetchContent: createDeprecatedFetchContentFn(),
    glob: createAstroGlobFn(),
    resolve(...segments) {
      let resolved = segments.reduce((u, segment) => new URL(segment, u), referenceURL).pathname;
      if (resolved.startsWith(projectRoot.pathname)) {
        resolved = "/" + resolved.slice(projectRoot.pathname.length);
      }
      return resolved;
    }
  };
}

const escapeHTML = escape;
class HTMLBytes extends Uint8Array {
}
Object.defineProperty(HTMLBytes.prototype, Symbol.toStringTag, {
  get() {
    return "HTMLBytes";
  }
});
class HTMLString extends String {
  get [Symbol.toStringTag]() {
    return "HTMLString";
  }
}
const markHTMLString = (value) => {
  if (value instanceof HTMLString) {
    return value;
  }
  if (typeof value === "string") {
    return new HTMLString(value);
  }
  return value;
};
function isHTMLString(value) {
  return Object.prototype.toString.call(value) === "[object HTMLString]";
}
function markHTMLBytes(bytes) {
  return new HTMLBytes(bytes);
}
async function* unescapeChunksAsync(iterable) {
  for await (const chunk of iterable) {
    yield unescapeHTML(chunk);
  }
}
function* unescapeChunks(iterable) {
  for (const chunk of iterable) {
    yield unescapeHTML(chunk);
  }
}
function unescapeHTML(str) {
  if (!!str && typeof str === "object") {
    if (str instanceof Uint8Array) {
      return markHTMLBytes(str);
    } else if (str instanceof Response && str.body) {
      const body = str.body;
      return unescapeChunksAsync(body);
    } else if (typeof str.then === "function") {
      return Promise.resolve(str).then((value) => {
        return unescapeHTML(value);
      });
    } else if (Symbol.iterator in str) {
      return unescapeChunks(str);
    } else if (Symbol.asyncIterator in str) {
      return unescapeChunksAsync(str);
    }
  }
  return markHTMLString(str);
}

var idle_prebuilt_default = `(self.Astro=self.Astro||{}).idle=t=>{const e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)},window.dispatchEvent(new Event("astro:idle"));`;

var load_prebuilt_default = `(self.Astro=self.Astro||{}).load=a=>{(async()=>await(await a())())()},window.dispatchEvent(new Event("astro:load"));`;

var media_prebuilt_default = `(self.Astro=self.Astro||{}).media=(s,a)=>{const t=async()=>{await(await s())()};if(a.value){const e=matchMedia(a.value);e.matches?t():e.addEventListener("change",t,{once:!0})}},window.dispatchEvent(new Event("astro:media"));`;

var only_prebuilt_default = `(self.Astro=self.Astro||{}).only=t=>{(async()=>await(await t())())()},window.dispatchEvent(new Event("astro:only"));`;

var visible_prebuilt_default = `(self.Astro=self.Astro||{}).visible=(s,c,n)=>{const r=async()=>{await(await s())()};let i=new IntersectionObserver(e=>{for(const t of e)if(!!t.isIntersecting){i.disconnect(),r();break}});for(let e=0;e<n.children.length;e++){const t=n.children[e];i.observe(t)}},window.dispatchEvent(new Event("astro:visible"));`;

var astro_island_prebuilt_default = `var l;{const c={0:t=>t,1:t=>JSON.parse(t,o),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(JSON.parse(t,o)),5:t=>new Set(JSON.parse(t,o)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(JSON.parse(t)),9:t=>new Uint16Array(JSON.parse(t)),10:t=>new Uint32Array(JSON.parse(t))},o=(t,s)=>{if(t===""||!Array.isArray(s))return s;const[e,n]=s;return e in c?c[e](n):void 0};customElements.get("astro-island")||customElements.define("astro-island",(l=class extends HTMLElement{constructor(){super(...arguments);this.hydrate=()=>{if(!this.hydrator||this.parentElement&&this.parentElement.closest("astro-island[ssr]"))return;const s=this.querySelectorAll("astro-slot"),e={},n=this.querySelectorAll("template[data-astro-template]");for(const r of n){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("data-astro-template")||"default"]=r.innerHTML,r.remove())}for(const r of s){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("name")||"default"]=r.innerHTML)}const a=this.hasAttribute("props")?JSON.parse(this.getAttribute("props"),o):{};this.hydrator(this)(this.Component,a,e,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),window.removeEventListener("astro:hydrate",this.hydrate),window.dispatchEvent(new CustomEvent("astro:hydrate"))}}connectedCallback(){!this.hasAttribute("await-children")||this.firstChild?this.childrenConnectedCallback():new MutationObserver((s,e)=>{e.disconnect(),this.childrenConnectedCallback()}).observe(this,{childList:!0})}async childrenConnectedCallback(){window.addEventListener("astro:hydrate",this.hydrate);let s=this.getAttribute("before-hydration-url");s&&await import(s),this.start()}start(){const s=JSON.parse(this.getAttribute("opts")),e=this.getAttribute("client");if(Astro[e]===void 0){window.addEventListener(\`astro:\${e}\`,()=>this.start(),{once:!0});return}Astro[e](async()=>{const n=this.getAttribute("renderer-url"),[a,{default:r}]=await Promise.all([import(this.getAttribute("component-url")),n?import(n):()=>()=>{}]),i=this.getAttribute("component-export")||"default";if(!i.includes("."))this.Component=a[i];else{this.Component=a;for(const d of i.split("."))this.Component=this.Component[d]}return this.hydrator=r,this.hydrate},s,this)}attributeChangedCallback(){this.hydrator&&this.hydrate()}},l.observedAttributes=["props"],l))}`;

function determineIfNeedsHydrationScript(result) {
  if (result._metadata.hasHydrationScript) {
    return false;
  }
  return result._metadata.hasHydrationScript = true;
}
const hydrationScripts = {
  idle: idle_prebuilt_default,
  load: load_prebuilt_default,
  only: only_prebuilt_default,
  media: media_prebuilt_default,
  visible: visible_prebuilt_default
};
function determinesIfNeedsDirectiveScript(result, directive) {
  if (result._metadata.hasDirectives.has(directive)) {
    return false;
  }
  result._metadata.hasDirectives.add(directive);
  return true;
}
function getDirectiveScriptText(directive) {
  if (!(directive in hydrationScripts)) {
    throw new Error(`Unknown directive: ${directive}`);
  }
  const directiveScriptText = hydrationScripts[directive];
  return directiveScriptText;
}
function getPrescripts(type, directive) {
  switch (type) {
    case "both":
      return `<style>astro-island,astro-slot{display:contents}</style><script>${getDirectiveScriptText(directive) + astro_island_prebuilt_default}<\/script>`;
    case "directive":
      return `<script>${getDirectiveScriptText(directive)}<\/script>`;
  }
  return "";
}

const headAndContentSym = Symbol.for("astro.headAndContent");
function isHeadAndContent(obj) {
  return typeof obj === "object" && !!obj[headAndContentSym];
}

function serializeListValue(value) {
  const hash = {};
  push(value);
  return Object.keys(hash).join(" ");
  function push(item) {
    if (item && typeof item.forEach === "function")
      item.forEach(push);
    else if (item === Object(item))
      Object.keys(item).forEach((name) => {
        if (item[name])
          push(name);
      });
    else {
      item = item === false || item == null ? "" : String(item).trim();
      if (item) {
        item.split(/\s+/).forEach((name) => {
          hash[name] = true;
        });
      }
    }
  }
}
function isPromise(value) {
  return !!value && typeof value === "object" && typeof value.then === "function";
}

var _a$2;
const renderTemplateResultSym = Symbol.for("astro.renderTemplateResult");
class RenderTemplateResult {
  constructor(htmlParts, expressions) {
    this[_a$2] = true;
    this.htmlParts = htmlParts;
    this.error = void 0;
    this.expressions = expressions.map((expression) => {
      if (isPromise(expression)) {
        return Promise.resolve(expression).catch((err) => {
          if (!this.error) {
            this.error = err;
            throw err;
          }
        });
      }
      return expression;
    });
  }
  get [(_a$2 = renderTemplateResultSym, Symbol.toStringTag)]() {
    return "AstroComponent";
  }
  async *[Symbol.asyncIterator]() {
    const { htmlParts, expressions } = this;
    for (let i = 0; i < htmlParts.length; i++) {
      const html = htmlParts[i];
      const expression = expressions[i];
      yield markHTMLString(html);
      yield* renderChild(expression);
    }
  }
}
function isRenderTemplateResult(obj) {
  return typeof obj === "object" && !!obj[renderTemplateResultSym];
}
async function* renderAstroTemplateResult(component) {
  for await (const value of component) {
    if (value || value === 0) {
      for await (const chunk of renderChild(value)) {
        switch (chunk.type) {
          case "directive": {
            yield chunk;
            break;
          }
          default: {
            yield markHTMLString(chunk);
            break;
          }
        }
      }
    }
  }
}
function renderTemplate(htmlParts, ...expressions) {
  return new RenderTemplateResult(htmlParts, expressions);
}

function isAstroComponentFactory(obj) {
  return obj == null ? false : obj.isAstroComponentFactory === true;
}
async function renderToString(result, componentFactory, props, children) {
  const factoryResult = await componentFactory(result, props, children);
  if (factoryResult instanceof Response) {
    const response = factoryResult;
    throw response;
  }
  let parts = new HTMLParts();
  const templateResult = isHeadAndContent(factoryResult) ? factoryResult.content : factoryResult;
  for await (const chunk of renderAstroTemplateResult(templateResult)) {
    parts.append(chunk, result);
  }
  return parts.toString();
}
function isAPropagatingComponent(result, factory) {
  let hint = factory.propagation || "none";
  if (factory.moduleId && result.propagation.has(factory.moduleId) && hint === "none") {
    hint = result.propagation.get(factory.moduleId);
  }
  return hint === "in-tree" || hint === "self";
}

const defineErrors = (errs) => errs;
const AstroErrorData = defineErrors({
  UnknownCompilerError: {
    title: "Unknown compiler error.",
    code: 1e3
  },
  StaticRedirectNotAvailable: {
    title: "`Astro.redirect` is not available in static mode.",
    code: 3001,
    message: "Redirects are only available when using `output: 'server'`. Update your Astro config if you need SSR features.",
    hint: "See https://docs.astro.build/en/guides/server-side-rendering/#enabling-ssr-in-your-project for more information on how to enable SSR."
  },
  ClientAddressNotAvailable: {
    title: "`Astro.clientAddress` is not available in current adapter.",
    code: 3002,
    message: (adapterName) => `\`Astro.clientAddress\` is not available in the \`${adapterName}\` adapter. File an issue with the adapter to add support.`
  },
  StaticClientAddressNotAvailable: {
    title: "`Astro.clientAddress` is not available in static mode.",
    code: 3003,
    message: "`Astro.clientAddress` is only available when using `output: 'server'`. Update your Astro config if you need SSR features.",
    hint: "See https://docs.astro.build/en/guides/server-side-rendering/#enabling-ssr-in-your-project for more information on how to enable SSR."
  },
  NoMatchingStaticPathFound: {
    title: "No static path found for requested path.",
    code: 3004,
    message: (pathName) => `A \`getStaticPaths()\` route pattern was matched, but no matching static path was found for requested path \`${pathName}\`.`,
    hint: (possibleRoutes) => `Possible dynamic routes being matched: ${possibleRoutes.join(", ")}.`
  },
  OnlyResponseCanBeReturned: {
    title: "Invalid type returned by Astro page.",
    code: 3005,
    message: (route, returnedValue) => `Route \`${route ? route : ""}\` returned a \`${returnedValue}\`. Only a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned from Astro files.`,
    hint: "See https://docs.astro.build/en/guides/server-side-rendering/#response for more information."
  },
  MissingMediaQueryDirective: {
    title: "Missing value for `client:media` directive.",
    code: 3006,
    message: 'Media query not provided for `client:media` directive. A media query similar to `client:media="(max-width: 600px)"` must be provided'
  },
  NoMatchingRenderer: {
    title: "No matching renderer found.",
    code: 3007,
    message: (componentName, componentExtension, plural, validRenderersCount) => `Unable to render \`${componentName}\`.

${validRenderersCount > 0 ? `There ${plural ? "are." : "is."} ${validRenderersCount} renderer${plural ? "s." : ""} configured in your \`astro.config.mjs\` file,
but ${plural ? "none were." : "it was not."} able to server-side render \`${componentName}\`.` : `No valid renderer was found ${componentExtension ? `for the \`.${componentExtension}\` file extension.` : `for this file extension.`}`}`,
    hint: (probableRenderers) => `Did you mean to enable the ${probableRenderers} integration?

See https://docs.astro.build/en/core-concepts/framework-components/ for more information on how to install and configure integrations.`
  },
  NoClientEntrypoint: {
    title: "No client entrypoint specified in renderer.",
    code: 3008,
    message: (componentName, clientDirective, rendererName) => `\`${componentName}\` component has a \`client:${clientDirective}\` directive, but no client entrypoint was provided by \`${rendererName}\`.`,
    hint: "See https://docs.astro.build/en/reference/integrations-reference/#addrenderer-option for more information on how to configure your renderer."
  },
  NoClientOnlyHint: {
    title: "Missing hint on client:only directive.",
    code: 3009,
    message: (componentName) => `Unable to render \`${componentName}\`. When using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.`,
    hint: (probableRenderers) => `Did you mean to pass \`client:only="${probableRenderers}"\`? See https://docs.astro.build/en/reference/directives-reference/#clientonly for more information on client:only`
  },
  InvalidGetStaticPathParam: {
    title: "Invalid value returned by a `getStaticPaths` path.",
    code: 3010,
    message: (paramType) => `Invalid params given to \`getStaticPaths\` path. Expected an \`object\`, got \`${paramType}\``,
    hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
  },
  InvalidGetStaticPathsReturn: {
    title: "Invalid value returned by getStaticPaths.",
    code: 3011,
    message: (returnType) => `Invalid type returned by \`getStaticPaths\`. Expected an \`array\`, got \`${returnType}\``,
    hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
  },
  GetStaticPathsRemovedRSSHelper: {
    title: "getStaticPaths RSS helper is not available anymore.",
    code: 3012,
    message: "The RSS helper has been removed from `getStaticPaths`. Try the new @astrojs/rss package instead.",
    hint: "See https://docs.astro.build/en/guides/rss/ for more information."
  },
  GetStaticPathsExpectedParams: {
    title: "Missing params property on `getStaticPaths` route.",
    code: 3013,
    message: "Missing or empty required `params` property on `getStaticPaths` route.",
    hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
  },
  GetStaticPathsInvalidRouteParam: {
    title: "Invalid value for `getStaticPaths` route parameter.",
    code: 3014,
    message: (key, value, valueType) => `Invalid getStaticPaths route parameter for \`${key}\`. Expected undefined, a string or a number, received \`${valueType}\` (\`${value}\`)`,
    hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
  },
  GetStaticPathsRequired: {
    title: "`getStaticPaths()` function required for dynamic routes.",
    code: 3015,
    message: "`getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.",
    hint: `See https://docs.astro.build/en/core-concepts/routing/#dynamic-routes for more information on dynamic routes.

Alternatively, set \`output: "server"\` in your Astro config file to switch to a non-static server build.
See https://docs.astro.build/en/guides/server-side-rendering/ for more information on non-static rendering.`
  },
  ReservedSlotName: {
    title: "Invalid slot name.",
    code: 3016,
    message: (slotName) => `Unable to create a slot named \`${slotName}\`. \`${slotName}\` is a reserved slot name. Please update the name of this slot.`
  },
  NoAdapterInstalled: {
    title: "Cannot use Server-side Rendering without an adapter.",
    code: 3017,
    message: `Cannot use \`output: 'server'\` without an adapter. Please install and configure the appropriate server adapter for your final deployment.`,
    hint: "See https://docs.astro.build/en/guides/server-side-rendering/ for more information."
  },
  NoMatchingImport: {
    title: "No import found for component.",
    code: 3018,
    message: (componentName) => `Could not render \`${componentName}\`. No matching import has been found for \`${componentName}\`.`,
    hint: "Please make sure the component is properly imported."
  },
  InvalidPrerenderExport: {
    title: "Invalid prerender export.",
    code: 3019,
    message: (prefix, suffix) => {
      let msg = `A \`prerender\` export has been detected, but its value cannot be statically analyzed.`;
      if (prefix !== "const")
        msg += `
Expected \`const\` declaration but got \`${prefix}\`.`;
      if (suffix !== "true")
        msg += `
Expected \`true\` value but got \`${suffix}\`.`;
      return msg;
    },
    hint: "Mutable values declared at runtime are not supported. Please make sure to use exactly `export const prerender = true`."
  },
  UnknownViteError: {
    title: "Unknown Vite Error.",
    code: 4e3
  },
  FailedToLoadModuleSSR: {
    title: "Could not import file.",
    code: 4001,
    message: (importName) => `Could not import \`${importName}\`.`,
    hint: "This is often caused by a typo in the import path. Please make sure the file exists."
  },
  InvalidGlob: {
    title: "Invalid glob pattern.",
    code: 4002,
    message: (globPattern) => `Invalid glob pattern: \`${globPattern}\`. Glob patterns must start with './', '../' or '/'.`,
    hint: "See https://docs.astro.build/en/guides/imports/#glob-patterns for more information on supported glob patterns."
  },
  UnknownCSSError: {
    title: "Unknown CSS Error.",
    code: 5e3
  },
  CSSSyntaxError: {
    title: "CSS Syntax Error.",
    code: 5001
  },
  UnknownMarkdownError: {
    title: "Unknown Markdown Error.",
    code: 6e3
  },
  MarkdownFrontmatterParseError: {
    title: "Failed to parse Markdown frontmatter.",
    code: 6001
  },
  MarkdownContentSchemaValidationError: {
    title: "Content collection frontmatter invalid.",
    code: 6002,
    message: (collection, entryId, error) => {
      return [
        `${String(collection)} \u2192 ${String(entryId)} frontmatter does not match collection schema.`,
        ...error.errors.map((zodError) => zodError.message)
      ].join("\n");
    },
    hint: "See https://docs.astro.build/en/guides/content-collections/ for more information on content schemas."
  },
  UnknownConfigError: {
    title: "Unknown configuration error.",
    code: 7e3
  },
  ConfigNotFound: {
    title: "Specified configuration file not found.",
    code: 7001,
    message: (configFile) => `Unable to resolve \`--config "${configFile}"\`. Does the file exist?`
  },
  ConfigLegacyKey: {
    title: "Legacy configuration detected.",
    code: 7002,
    message: (legacyConfigKey) => `Legacy configuration detected: \`${legacyConfigKey}\`.`,
    hint: "Please update your configuration to the new format.\nSee https://astro.build/config for more information."
  },
  UnknownCLIError: {
    title: "Unknown CLI Error.",
    code: 8e3
  },
  GenerateContentTypesError: {
    title: "Failed to generate content types.",
    code: 8001,
    message: "`astro sync` command failed to generate content collection types.",
    hint: "Check your `src/content/config.*` file for typos."
  },
  UnknownError: {
    title: "Unknown Error.",
    code: 99999
  }
});

function normalizeLF(code) {
  return code.replace(/\r\n|\r(?!\n)|\n/g, "\n");
}
function getErrorDataByCode(code) {
  const entry = Object.entries(AstroErrorData).find((data) => data[1].code === code);
  if (entry) {
    return {
      name: entry[0],
      data: entry[1]
    };
  }
}

function codeFrame(src, loc) {
  if (!loc || loc.line === void 0 || loc.column === void 0) {
    return "";
  }
  const lines = normalizeLF(src).split("\n").map((ln) => ln.replace(/\t/g, "  "));
  const visibleLines = [];
  for (let n = -2; n <= 2; n++) {
    if (lines[loc.line + n])
      visibleLines.push(loc.line + n);
  }
  let gutterWidth = 0;
  for (const lineNo of visibleLines) {
    let w = `> ${lineNo}`;
    if (w.length > gutterWidth)
      gutterWidth = w.length;
  }
  let output = "";
  for (const lineNo of visibleLines) {
    const isFocusedLine = lineNo === loc.line - 1;
    output += isFocusedLine ? "> " : "  ";
    output += `${lineNo + 1} | ${lines[lineNo]}
`;
    if (isFocusedLine)
      output += `${Array.from({ length: gutterWidth }).join(" ")}  | ${Array.from({
        length: loc.column
      }).join(" ")}^
`;
  }
  return output;
}

class AstroError extends Error {
  constructor(props, ...params) {
    var _a;
    super(...params);
    this.type = "AstroError";
    const { code, name, title, message, stack, location, hint, frame } = props;
    this.errorCode = code;
    if (name && name !== "Error") {
      this.name = name;
    } else {
      this.name = ((_a = getErrorDataByCode(this.errorCode)) == null ? void 0 : _a.name) ?? "UnknownError";
    }
    this.title = title;
    if (message)
      this.message = message;
    this.stack = stack ? stack : this.stack;
    this.loc = location;
    this.hint = hint;
    this.frame = frame;
  }
  setErrorCode(errorCode) {
    this.errorCode = errorCode;
  }
  setLocation(location) {
    this.loc = location;
  }
  setName(name) {
    this.name = name;
  }
  setMessage(message) {
    this.message = message;
  }
  setHint(hint) {
    this.hint = hint;
  }
  setFrame(source, location) {
    this.frame = codeFrame(source, location);
  }
  static is(err) {
    return err.type === "AstroError";
  }
}

const PROP_TYPE = {
  Value: 0,
  JSON: 1,
  RegExp: 2,
  Date: 3,
  Map: 4,
  Set: 5,
  BigInt: 6,
  URL: 7,
  Uint8Array: 8,
  Uint16Array: 9,
  Uint32Array: 10
};
function serializeArray(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = value.map((v) => {
    return convertToSerializedForm(v, metadata, parents);
  });
  parents.delete(value);
  return serialized;
}
function serializeObject(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = Object.fromEntries(
    Object.entries(value).map(([k, v]) => {
      return [k, convertToSerializedForm(v, metadata, parents)];
    })
  );
  parents.delete(value);
  return serialized;
}
function convertToSerializedForm(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  const tag = Object.prototype.toString.call(value);
  switch (tag) {
    case "[object Date]": {
      return [PROP_TYPE.Date, value.toISOString()];
    }
    case "[object RegExp]": {
      return [PROP_TYPE.RegExp, value.source];
    }
    case "[object Map]": {
      return [
        PROP_TYPE.Map,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object Set]": {
      return [
        PROP_TYPE.Set,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object BigInt]": {
      return [PROP_TYPE.BigInt, value.toString()];
    }
    case "[object URL]": {
      return [PROP_TYPE.URL, value.toString()];
    }
    case "[object Array]": {
      return [PROP_TYPE.JSON, JSON.stringify(serializeArray(value, metadata, parents))];
    }
    case "[object Uint8Array]": {
      return [PROP_TYPE.Uint8Array, JSON.stringify(Array.from(value))];
    }
    case "[object Uint16Array]": {
      return [PROP_TYPE.Uint16Array, JSON.stringify(Array.from(value))];
    }
    case "[object Uint32Array]": {
      return [PROP_TYPE.Uint32Array, JSON.stringify(Array.from(value))];
    }
    default: {
      if (value !== null && typeof value === "object") {
        return [PROP_TYPE.Value, serializeObject(value, metadata, parents)];
      } else {
        return [PROP_TYPE.Value, value];
      }
    }
  }
}
function serializeProps(props, metadata) {
  const serialized = JSON.stringify(serializeObject(props, metadata));
  return serialized;
}

const HydrationDirectivesRaw = ["load", "idle", "media", "visible", "only"];
const HydrationDirectives = new Set(HydrationDirectivesRaw);
const HydrationDirectiveProps = new Set(HydrationDirectivesRaw.map((n) => `client:${n}`));
function extractDirectives(displayName, inputProps) {
  let extracted = {
    isPage: false,
    hydration: null,
    props: {}
  };
  for (const [key, value] of Object.entries(inputProps)) {
    if (key.startsWith("server:")) {
      if (key === "server:root") {
        extracted.isPage = true;
      }
    }
    if (key.startsWith("client:")) {
      if (!extracted.hydration) {
        extracted.hydration = {
          directive: "",
          value: "",
          componentUrl: "",
          componentExport: { value: "" }
        };
      }
      switch (key) {
        case "client:component-path": {
          extracted.hydration.componentUrl = value;
          break;
        }
        case "client:component-export": {
          extracted.hydration.componentExport.value = value;
          break;
        }
        case "client:component-hydration": {
          break;
        }
        case "client:display-name": {
          break;
        }
        default: {
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value;
          if (!HydrationDirectives.has(extracted.hydration.directive)) {
            throw new Error(
              `Error: invalid hydration directive "${key}". Supported hydration methods: ${Array.from(
                HydrationDirectiveProps
              ).join(", ")}`
            );
          }
          if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") {
            throw new AstroError(AstroErrorData.MissingMediaQueryDirective);
          }
          break;
        }
      }
    } else if (key === "class:list") {
      if (value) {
        extracted.props[key.slice(0, -5)] = serializeListValue(value);
      }
    } else {
      extracted.props[key] = value;
    }
  }
  for (const sym of Object.getOwnPropertySymbols(inputProps)) {
    extracted.props[sym] = inputProps[sym];
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer, result, astroId, props, attrs } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport.value) {
    throw new Error(
      `Unable to resolve a valid export for "${metadata.displayName}"! Please open an issue at https://astro.build/issues!`
    );
  }
  const island = {
    children: "",
    props: {
      uid: astroId
    }
  };
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      island.props[key] = escapeHTML(value);
    }
  }
  island.props["component-url"] = await result.resolve(decodeURI(componentUrl));
  if (renderer.clientEntrypoint) {
    island.props["component-export"] = componentExport.value;
    island.props["renderer-url"] = await result.resolve(decodeURI(renderer.clientEntrypoint));
    island.props["props"] = escapeHTML(serializeProps(props, metadata));
  }
  island.props["ssr"] = "";
  island.props["client"] = hydrate;
  let beforeHydrationUrl = await result.resolve("astro:scripts/before-hydration.js");
  if (beforeHydrationUrl.length) {
    island.props["before-hydration-url"] = beforeHydrationUrl;
  }
  island.props["opts"] = escapeHTML(
    JSON.stringify({
      name: metadata.displayName,
      value: metadata.hydrateArgs || ""
    })
  );
  return island;
}

var _a$1;
const astroComponentInstanceSym = Symbol.for("astro.componentInstance");
class AstroComponentInstance {
  constructor(result, props, slots, factory) {
    this[_a$1] = true;
    this.result = result;
    this.props = props;
    this.factory = factory;
    this.slotValues = {};
    for (const name in slots) {
      this.slotValues[name] = slots[name]();
    }
  }
  async init() {
    this.returnValue = this.factory(this.result, this.props, this.slotValues);
    return this.returnValue;
  }
  async *render() {
    if (this.returnValue === void 0) {
      await this.init();
    }
    let value = this.returnValue;
    if (isPromise(value)) {
      value = await value;
    }
    if (isHeadAndContent(value)) {
      yield* value.content;
    } else {
      yield* renderChild(value);
    }
  }
}
_a$1 = astroComponentInstanceSym;
function validateComponentProps(props, displayName) {
  if (props != null) {
    for (const prop of Object.keys(props)) {
      if (HydrationDirectiveProps.has(prop)) {
        console.warn(
          `You are attempting to render <${displayName} ${prop} />, but ${displayName} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`
        );
      }
    }
  }
}
function createAstroComponentInstance(result, displayName, factory, props, slots = {}) {
  validateComponentProps(props, displayName);
  const instance = new AstroComponentInstance(result, props, slots, factory);
  if (isAPropagatingComponent(result, factory) && !result.propagators.has(factory)) {
    result.propagators.set(factory, instance);
  }
  return instance;
}
function isAstroComponentInstance(obj) {
  return typeof obj === "object" && !!obj[astroComponentInstanceSym];
}

async function* renderChild(child) {
  child = await child;
  if (child instanceof SlotString) {
    if (child.instructions) {
      yield* child.instructions;
    }
    yield child;
  } else if (isHTMLString(child)) {
    yield child;
  } else if (Array.isArray(child)) {
    for (const value of child) {
      yield markHTMLString(await renderChild(value));
    }
  } else if (typeof child === "function") {
    yield* renderChild(child());
  } else if (typeof child === "string") {
    yield markHTMLString(escapeHTML(child));
  } else if (!child && child !== 0) ; else if (isRenderTemplateResult(child)) {
    yield* renderAstroTemplateResult(child);
  } else if (isAstroComponentInstance(child)) {
    yield* child.render();
  } else if (ArrayBuffer.isView(child)) {
    yield child;
  } else if (typeof child === "object" && (Symbol.asyncIterator in child || Symbol.iterator in child)) {
    yield* child;
  } else {
    yield child;
  }
}

const slotString = Symbol.for("astro:slot-string");
class SlotString extends HTMLString {
  constructor(content, instructions) {
    super(content);
    this.instructions = instructions;
    this[slotString] = true;
  }
}
function isSlotString(str) {
  return !!str[slotString];
}
async function renderSlot(_result, slotted, fallback) {
  if (slotted) {
    let iterator = renderChild(slotted);
    let content = "";
    let instructions = null;
    for await (const chunk of iterator) {
      if (chunk.type === "directive") {
        if (instructions === null) {
          instructions = [];
        }
        instructions.push(chunk);
      } else {
        content += chunk;
      }
    }
    return markHTMLString(new SlotString(content, instructions));
  }
  return fallback;
}
async function renderSlots(result, slots = {}) {
  let slotInstructions = null;
  let children = {};
  if (slots) {
    await Promise.all(
      Object.entries(slots).map(
        ([key, value]) => renderSlot(result, value).then((output) => {
          if (output.instructions) {
            if (slotInstructions === null) {
              slotInstructions = [];
            }
            slotInstructions.push(...output.instructions);
          }
          children[key] = output;
        })
      )
    );
  }
  return { slotInstructions, children };
}

const Fragment = Symbol.for("astro:fragment");
const Renderer = Symbol.for("astro:renderer");
const encoder = new TextEncoder();
const decoder = new TextDecoder();
function stringifyChunk(result, chunk) {
  switch (chunk.type) {
    case "directive": {
      const { hydration } = chunk;
      let needsHydrationScript = hydration && determineIfNeedsHydrationScript(result);
      let needsDirectiveScript = hydration && determinesIfNeedsDirectiveScript(result, hydration.directive);
      let prescriptType = needsHydrationScript ? "both" : needsDirectiveScript ? "directive" : null;
      if (prescriptType) {
        let prescripts = getPrescripts(prescriptType, hydration.directive);
        return markHTMLString(prescripts);
      } else {
        return "";
      }
    }
    default: {
      if (isSlotString(chunk)) {
        let out = "";
        const c = chunk;
        if (c.instructions) {
          for (const instr of c.instructions) {
            out += stringifyChunk(result, instr);
          }
        }
        out += chunk.toString();
        return out;
      }
      return chunk.toString();
    }
  }
}
class HTMLParts {
  constructor() {
    this.parts = "";
  }
  append(part, result) {
    if (ArrayBuffer.isView(part)) {
      this.parts += decoder.decode(part);
    } else {
      this.parts += stringifyChunk(result, part);
    }
  }
  toString() {
    return this.parts;
  }
  toArrayBuffer() {
    return encoder.encode(this.parts);
  }
}

const ClientOnlyPlaceholder = "astro-client-only";
class Skip {
  constructor(vnode) {
    this.vnode = vnode;
    this.count = 0;
  }
  increment() {
    this.count++;
  }
  haveNoTried() {
    return this.count === 0;
  }
  isCompleted() {
    return this.count > 2;
  }
}
Skip.symbol = Symbol("astro:jsx:skip");
let originalConsoleError;
let consoleFilterRefs = 0;
async function renderJSX(result, vnode) {
  switch (true) {
    case vnode instanceof HTMLString:
      if (vnode.toString().trim() === "") {
        return "";
      }
      return vnode;
    case typeof vnode === "string":
      return markHTMLString(escapeHTML(vnode));
    case typeof vnode === "function":
      return vnode;
    case (!vnode && vnode !== 0):
      return "";
    case Array.isArray(vnode):
      return markHTMLString(
        (await Promise.all(vnode.map((v) => renderJSX(result, v)))).join("")
      );
  }
  let skip;
  if (vnode.props) {
    if (vnode.props[Skip.symbol]) {
      skip = vnode.props[Skip.symbol];
    } else {
      skip = new Skip(vnode);
    }
  } else {
    skip = new Skip(vnode);
  }
  return renderJSXVNode(result, vnode, skip);
}
async function renderJSXVNode(result, vnode, skip) {
  if (isVNode(vnode)) {
    switch (true) {
      case !vnode.type: {
        throw new Error(`Unable to render ${result._metadata.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
      }
      case vnode.type === Symbol.for("astro:fragment"):
        return renderJSX(result, vnode.props.children);
      case vnode.type.isAstroComponentFactory: {
        let props = {};
        let slots = {};
        for (const [key, value] of Object.entries(vnode.props ?? {})) {
          if (key === "children" || value && typeof value === "object" && value["$$slot"]) {
            slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
          } else {
            props[key] = value;
          }
        }
        return markHTMLString(await renderToString(result, vnode.type, props, slots));
      }
      case (!vnode.type && vnode.type !== 0):
        return "";
      case (typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder):
        return markHTMLString(await renderElement$1(result, vnode.type, vnode.props ?? {}));
    }
    if (vnode.type) {
      let extractSlots2 = function(child) {
        if (Array.isArray(child)) {
          return child.map((c) => extractSlots2(c));
        }
        if (!isVNode(child)) {
          _slots.default.push(child);
          return;
        }
        if ("slot" in child.props) {
          _slots[child.props.slot] = [..._slots[child.props.slot] ?? [], child];
          delete child.props.slot;
          return;
        }
        _slots.default.push(child);
      };
      if (typeof vnode.type === "function" && vnode.type["astro:renderer"]) {
        skip.increment();
      }
      if (typeof vnode.type === "function" && vnode.props["server:root"]) {
        const output2 = await vnode.type(vnode.props ?? {});
        return await renderJSX(result, output2);
      }
      if (typeof vnode.type === "function") {
        if (skip.haveNoTried() || skip.isCompleted()) {
          useConsoleFilter();
          try {
            const output2 = await vnode.type(vnode.props ?? {});
            let renderResult;
            if (output2 && output2[AstroJSX]) {
              renderResult = await renderJSXVNode(result, output2, skip);
              return renderResult;
            } else if (!output2) {
              renderResult = await renderJSXVNode(result, output2, skip);
              return renderResult;
            }
          } catch (e) {
            if (skip.isCompleted()) {
              throw e;
            }
            skip.increment();
          } finally {
            finishUsingConsoleFilter();
          }
        } else {
          skip.increment();
        }
      }
      const { children = null, ...props } = vnode.props ?? {};
      const _slots = {
        default: []
      };
      extractSlots2(children);
      for (const [key, value] of Object.entries(props)) {
        if (value["$$slot"]) {
          _slots[key] = value;
          delete props[key];
        }
      }
      const slotPromises = [];
      const slots = {};
      for (const [key, value] of Object.entries(_slots)) {
        slotPromises.push(
          renderJSX(result, value).then((output2) => {
            if (output2.toString().trim().length === 0)
              return;
            slots[key] = () => output2;
          })
        );
      }
      await Promise.all(slotPromises);
      props[Skip.symbol] = skip;
      let output;
      if (vnode.type === ClientOnlyPlaceholder && vnode.props["client:only"]) {
        output = await renderComponentToIterable(
          result,
          vnode.props["client:display-name"] ?? "",
          null,
          props,
          slots
        );
      } else {
        output = await renderComponentToIterable(
          result,
          typeof vnode.type === "function" ? vnode.type.name : vnode.type,
          vnode.type,
          props,
          slots
        );
      }
      if (typeof output !== "string" && Symbol.asyncIterator in output) {
        let parts = new HTMLParts();
        for await (const chunk of output) {
          parts.append(chunk, result);
        }
        return markHTMLString(parts.toString());
      } else {
        return markHTMLString(output);
      }
    }
  }
  return markHTMLString(`${vnode}`);
}
async function renderElement$1(result, tag, { children, ...props }) {
  return markHTMLString(
    `<${tag}${spreadAttributes(props)}${markHTMLString(
      (children == null || children == "") && voidElementNames.test(tag) ? `/>` : `>${children == null ? "" : await renderJSX(result, children)}</${tag}>`
    )}`
  );
}
function useConsoleFilter() {
  consoleFilterRefs++;
  if (!originalConsoleError) {
    originalConsoleError = console.error;
    try {
      console.error = filteredConsoleError;
    } catch (error) {
    }
  }
}
function finishUsingConsoleFilter() {
  consoleFilterRefs--;
}
function filteredConsoleError(msg, ...rest) {
  if (consoleFilterRefs > 0 && typeof msg === "string") {
    const isKnownReactHookError = msg.includes("Warning: Invalid hook call.") && msg.includes("https://reactjs.org/link/invalid-hook-call");
    if (isKnownReactHookError)
      return;
  }
  originalConsoleError(msg, ...rest);
}

/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
const dictionary = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
const binary = dictionary.length;
function bitwise(str) {
  let hash = 0;
  if (str.length === 0)
    return hash;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash(text) {
  let num;
  let result = "";
  let integer = bitwise(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    result = dictionary[num] + result;
  }
  if (integer > 0) {
    result = dictionary[integer] + result;
  }
  return sign + result;
}

const voidElementNames = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
const htmlBooleanAttributes = /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i;
const htmlEnumAttributes = /^(contenteditable|draggable|spellcheck|value)$/i;
const svgEnumAttributes = /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i;
const STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
const toIdent = (k) => k.trim().replace(/(?:(?!^)\b\w|\s+|[^\w]+)/g, (match, index) => {
  if (/[^\w]|\s/.test(match))
    return "";
  return index === 0 ? match : match.toUpperCase();
});
const toAttributeString = (value, shouldEscape = true) => shouldEscape ? String(value).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : value;
const kebab = (k) => k.toLowerCase() === k ? k : k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
const toStyleString = (obj) => Object.entries(obj).map(([k, v]) => `${kebab(k)}:${v}`).join(";");
function defineScriptVars(vars) {
  let output = "";
  for (const [key, value] of Object.entries(vars)) {
    output += `const ${toIdent(key)} = ${JSON.stringify(value)};
`;
  }
  return markHTMLString(output);
}
function formatList(values) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
function addAttribute(value, key, shouldEscape = true) {
  if (value == null) {
    return "";
  }
  if (value === false) {
    if (htmlEnumAttributes.test(key) || svgEnumAttributes.test(key)) {
      return markHTMLString(` ${key}="false"`);
    }
    return "";
  }
  if (STATIC_DIRECTIVES.has(key)) {
    console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
    return "";
  }
  if (key === "class:list") {
    const listValue = toAttributeString(serializeListValue(value), shouldEscape);
    if (listValue === "") {
      return "";
    }
    return markHTMLString(` ${key.slice(0, -5)}="${listValue}"`);
  }
  if (key === "style" && !(value instanceof HTMLString) && typeof value === "object") {
    return markHTMLString(` ${key}="${toAttributeString(toStyleString(value), shouldEscape)}"`);
  }
  if (key === "className") {
    return markHTMLString(` class="${toAttributeString(value, shouldEscape)}"`);
  }
  if (value === true && (key.startsWith("data-") || htmlBooleanAttributes.test(key))) {
    return markHTMLString(` ${key}`);
  } else {
    return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
  }
}
function internalSpreadAttributes(values, shouldEscape = true) {
  let output = "";
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, shouldEscape);
  }
  return markHTMLString(output);
}
function renderElement(name, { props: _props, children = "" }, shouldEscape = true) {
  const { lang: _, "data-astro-id": astroId, "define:vars": defineVars, ...props } = _props;
  if (defineVars) {
    if (name === "style") {
      delete props["is:global"];
      delete props["is:scoped"];
    }
    if (name === "script") {
      delete props.hoist;
      children = defineScriptVars(defineVars) + "\n" + children;
    }
  }
  if ((children == null || children == "") && voidElementNames.test(name)) {
    return `<${name}${internalSpreadAttributes(props, shouldEscape)} />`;
  }
  return `<${name}${internalSpreadAttributes(props, shouldEscape)}>${children}</${name}>`;
}

function componentIsHTMLElement(Component) {
  return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(
    `<${name}${attrHTML}>${await renderSlot(result, slots == null ? void 0 : slots.default)}</${name}>`
  );
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName)
    return definedName;
  const assignedName = constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
  return assignedName;
}

const rendererAliases = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
function guessRenderers(componentUrl) {
  const extname = componentUrl == null ? void 0 : componentUrl.split(".").pop();
  switch (extname) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/solid", "@astrojs/vue (jsx)"];
    default:
      return [
        "@astrojs/react",
        "@astrojs/preact",
        "@astrojs/solid",
        "@astrojs/vue",
        "@astrojs/svelte"
      ];
  }
}
function isFragmentComponent(Component) {
  return Component === Fragment;
}
function isHTMLComponent(Component) {
  return Component && typeof Component === "object" && Component["astro:html"];
}
async function renderFrameworkComponent(result, displayName, Component, _props, slots = {}) {
  var _a, _b;
  if (!Component && !_props["client:only"]) {
    throw new Error(
      `Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`
    );
  }
  const { renderers } = result._metadata;
  const metadata = { displayName };
  const { hydration, isPage, props } = extractDirectives(displayName, _props);
  let html = "";
  let attrs = void 0;
  if (hydration) {
    metadata.hydrate = hydration.directive;
    metadata.hydrateArgs = hydration.value;
    metadata.componentExport = hydration.componentExport;
    metadata.componentUrl = hydration.componentUrl;
  }
  const probableRendererNames = guessRenderers(metadata.componentUrl);
  const validRenderers = renderers.filter((r) => r.name !== "astro:jsx");
  const { children, slotInstructions } = await renderSlots(result, slots);
  let renderer;
  if (metadata.hydrate !== "only") {
    let isTagged = false;
    try {
      isTagged = Component && Component[Renderer];
    } catch {
    }
    if (isTagged) {
      const rendererName = Component[Renderer];
      renderer = renderers.find(({ name }) => name === rendererName);
    }
    if (!renderer) {
      let error;
      for (const r of renderers) {
        try {
          if (await r.ssr.check.call({ result }, Component, props, children)) {
            renderer = r;
            break;
          }
        } catch (e) {
          error ?? (error = e);
        }
      }
      if (!renderer && error) {
        throw error;
      }
    }
    if (!renderer && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
      const output = renderHTMLElement(result, Component, _props, slots);
      return output;
    }
  } else {
    if (metadata.hydrateArgs) {
      const passedName = metadata.hydrateArgs;
      const rendererName = rendererAliases.has(passedName) ? rendererAliases.get(passedName) : passedName;
      renderer = renderers.find(
        ({ name }) => name === `@astrojs/${rendererName}` || name === rendererName
      );
    }
    if (!renderer && validRenderers.length === 1) {
      renderer = validRenderers[0];
    }
    if (!renderer) {
      const extname = (_a = metadata.componentUrl) == null ? void 0 : _a.split(".").pop();
      renderer = renderers.filter(
        ({ name }) => name === `@astrojs/${extname}` || name === extname
      )[0];
    }
  }
  if (!renderer) {
    if (metadata.hydrate === "only") {
      throw new AstroError({
        ...AstroErrorData.NoClientOnlyHint,
        message: AstroErrorData.NoClientOnlyHint.message(metadata.displayName),
        hint: AstroErrorData.NoClientOnlyHint.hint(
          probableRendererNames.map((r) => r.replace("@astrojs/", "")).join("|")
        )
      });
    } else if (typeof Component !== "string") {
      const matchingRenderers = validRenderers.filter(
        (r) => probableRendererNames.includes(r.name)
      );
      const plural = validRenderers.length > 1;
      if (matchingRenderers.length === 0) {
        throw new AstroError({
          ...AstroErrorData.NoMatchingRenderer,
          message: AstroErrorData.NoMatchingRenderer.message(
            metadata.displayName,
            (_b = metadata == null ? void 0 : metadata.componentUrl) == null ? void 0 : _b.split(".").pop(),
            plural,
            validRenderers.length
          ),
          hint: AstroErrorData.NoMatchingRenderer.hint(
            formatList(probableRendererNames.map((r) => "`" + r + "`"))
          )
        });
      } else if (matchingRenderers.length === 1) {
        renderer = matchingRenderers[0];
        ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
          { result },
          Component,
          props,
          children,
          metadata
        ));
      } else {
        throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
      }
    }
  } else {
    if (metadata.hydrate === "only") {
      html = await renderSlot(result, slots == null ? void 0 : slots.fallback);
    } else {
      ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
        { result },
        Component,
        props,
        children,
        metadata
      ));
    }
  }
  if (renderer && !renderer.clientEntrypoint && renderer.name !== "@astrojs/lit" && metadata.hydrate) {
    throw new AstroError({
      ...AstroErrorData.NoClientEntrypoint,
      message: AstroErrorData.NoClientEntrypoint.message(
        displayName,
        metadata.hydrate,
        renderer.name
      )
    });
  }
  if (!html && typeof Component === "string") {
    const Tag = sanitizeElementName(Component);
    const childSlots = Object.values(children).join("");
    const iterable = renderAstroTemplateResult(
      await renderTemplate`<${Tag}${internalSpreadAttributes(props)}${markHTMLString(
        childSlots === "" && voidElementNames.test(Tag) ? `/>` : `>${childSlots}</${Tag}>`
      )}`
    );
    html = "";
    for await (const chunk of iterable) {
      html += chunk;
    }
  }
  if (!hydration) {
    return async function* () {
      if (slotInstructions) {
        yield* slotInstructions;
      }
      if (isPage || (renderer == null ? void 0 : renderer.name) === "astro:jsx") {
        yield html;
      } else {
        yield markHTMLString(html.replace(/\<\/?astro-slot\>/g, ""));
      }
    }();
  }
  const astroId = shorthash(
    `<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html}
${serializeProps(
      props,
      metadata
    )}`
  );
  const island = await generateHydrateScript(
    { renderer, result, astroId, props, attrs },
    metadata
  );
  let unrenderedSlots = [];
  if (html) {
    if (Object.keys(children).length > 0) {
      for (const key of Object.keys(children)) {
        if (!html.includes(key === "default" ? `<astro-slot>` : `<astro-slot name="${key}">`)) {
          unrenderedSlots.push(key);
        }
      }
    }
  } else {
    unrenderedSlots = Object.keys(children);
  }
  const template = unrenderedSlots.length > 0 ? unrenderedSlots.map(
    (key) => `<template data-astro-template${key !== "default" ? `="${key}"` : ""}>${children[key]}</template>`
  ).join("") : "";
  island.children = `${html ?? ""}${template}`;
  if (island.children) {
    island.props["await-children"] = "";
  }
  async function* renderAll() {
    if (slotInstructions) {
      yield* slotInstructions;
    }
    yield { type: "directive", hydration, result };
    yield markHTMLString(renderElement("astro-island", island, false));
  }
  return renderAll();
}
function sanitizeElementName(tag) {
  const unsafe = /[&<>'"\s]+/g;
  if (!unsafe.test(tag))
    return tag;
  return tag.trim().split(unsafe)[0].trim();
}
async function renderFragmentComponent(result, slots = {}) {
  const children = await renderSlot(result, slots == null ? void 0 : slots.default);
  if (children == null) {
    return children;
  }
  return markHTMLString(children);
}
async function renderHTMLComponent(result, Component, _props, slots = {}) {
  const { slotInstructions, children } = await renderSlots(result, slots);
  const html = Component.render({ slots: children });
  const hydrationHtml = slotInstructions ? slotInstructions.map((instr) => stringifyChunk(result, instr)).join("") : "";
  return markHTMLString(hydrationHtml + html);
}
function renderComponent(result, displayName, Component, props, slots = {}) {
  if (isPromise(Component)) {
    return Promise.resolve(Component).then((Unwrapped) => {
      return renderComponent(result, displayName, Unwrapped, props, slots);
    });
  }
  if (isFragmentComponent(Component)) {
    return renderFragmentComponent(result, slots);
  }
  if (isHTMLComponent(Component)) {
    return renderHTMLComponent(result, Component, props, slots);
  }
  if (isAstroComponentFactory(Component)) {
    return createAstroComponentInstance(result, displayName, Component, props, slots);
  }
  return renderFrameworkComponent(result, displayName, Component, props, slots);
}
function renderComponentToIterable(result, displayName, Component, props, slots = {}) {
  const renderResult = renderComponent(result, displayName, Component, props, slots);
  if (isAstroComponentInstance(renderResult)) {
    return renderResult.render();
  }
  return renderResult;
}

const uniqueElements = (item, index, all) => {
  const props = JSON.stringify(item.props);
  const children = item.children;
  return index === all.findIndex((i) => JSON.stringify(i.props) === props && i.children == children);
};
async function* renderExtraHead(result, base) {
  yield base;
  for (const part of result.extraHead) {
    yield* renderChild(part);
  }
}
function renderAllHeadContent(result) {
  const styles = Array.from(result.styles).filter(uniqueElements).map((style) => renderElement("style", style));
  result.styles.clear();
  const scripts = Array.from(result.scripts).filter(uniqueElements).map((script, i) => {
    return renderElement("script", script, false);
  });
  const links = Array.from(result.links).filter(uniqueElements).map((link) => renderElement("link", link, false));
  const baseHeadContent = markHTMLString(links.join("\n") + styles.join("\n") + scripts.join("\n"));
  if (result.extraHead.length > 0) {
    return renderExtraHead(result, baseHeadContent);
  } else {
    return baseHeadContent;
  }
}
function createRenderHead(result) {
  result._metadata.hasRenderedHead = true;
  return renderAllHeadContent.bind(null, result);
}
const renderHead = createRenderHead;
async function* maybeRenderHead(result) {
  if (result._metadata.hasRenderedHead) {
    return;
  }
  yield createRenderHead(result)();
}

typeof process === "object" && Object.prototype.toString.call(process) === "[object process]";

function __astro_tag_component__(Component, rendererName) {
  if (!Component)
    return;
  if (typeof Component !== "function")
    return;
  Object.defineProperty(Component, Renderer, {
    value: rendererName,
    enumerable: false,
    writable: false
  });
}
function spreadAttributes(values, _name, { class: scopedClassName } = {}) {
  let output = "";
  if (scopedClassName) {
    if (typeof values.class !== "undefined") {
      values.class += ` ${scopedClassName}`;
    } else if (typeof values["class:list"] !== "undefined") {
      values["class:list"] = [values["class:list"], scopedClassName];
    } else {
      values.class = scopedClassName;
    }
  }
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, true);
  }
  return markHTMLString(output);
}

const AstroJSX = "astro:jsx";
const Empty = Symbol("empty");
const toSlotName = (slotAttr) => slotAttr;
function isVNode(vnode) {
  return vnode && typeof vnode === "object" && vnode[AstroJSX];
}
function transformSlots(vnode) {
  if (typeof vnode.type === "string")
    return vnode;
  const slots = {};
  if (isVNode(vnode.props.children)) {
    const child = vnode.props.children;
    if (!isVNode(child))
      return;
    if (!("slot" in child.props))
      return;
    const name = toSlotName(child.props.slot);
    slots[name] = [child];
    slots[name]["$$slot"] = true;
    delete child.props.slot;
    delete vnode.props.children;
  }
  if (Array.isArray(vnode.props.children)) {
    vnode.props.children = vnode.props.children.map((child) => {
      if (!isVNode(child))
        return child;
      if (!("slot" in child.props))
        return child;
      const name = toSlotName(child.props.slot);
      if (Array.isArray(slots[name])) {
        slots[name].push(child);
      } else {
        slots[name] = [child];
        slots[name]["$$slot"] = true;
      }
      delete child.props.slot;
      return Empty;
    }).filter((v) => v !== Empty);
  }
  Object.assign(vnode.props, slots);
}
function markRawChildren(child) {
  if (typeof child === "string")
    return markHTMLString(child);
  if (Array.isArray(child))
    return child.map((c) => markRawChildren(c));
  return child;
}
function transformSetDirectives(vnode) {
  if (!("set:html" in vnode.props || "set:text" in vnode.props))
    return;
  if ("set:html" in vnode.props) {
    const children = markRawChildren(vnode.props["set:html"]);
    delete vnode.props["set:html"];
    Object.assign(vnode.props, { children });
    return;
  }
  if ("set:text" in vnode.props) {
    const children = vnode.props["set:text"];
    delete vnode.props["set:text"];
    Object.assign(vnode.props, { children });
    return;
  }
}
function createVNode(type, props) {
  const vnode = {
    [Renderer]: "astro:jsx",
    [AstroJSX]: true,
    type,
    props: props ?? {}
  };
  transformSetDirectives(vnode);
  transformSlots(vnode);
  return vnode;
}

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
  if (typeof Component !== "function")
    return false;
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  try {
    const result = await Component({ ...props, ...slots, children });
    return result[AstroJSX];
  } catch (e) {
  }
  return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  const { result } = this;
  const html = await renderJSX(result, createVNode(Component, { ...props, ...slots, children }));
  return { html };
}
var server_default = {
  check,
  renderToStaticMarkup
};

const $$Astro$x = createAstro("C:/code/dreamoment/website/src/components/container.astro", "", "file:///C:/code/dreamoment/website/");
const $$Container = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$x, $$props, $$slots);
  Astro2.self = $$Container;
  const { class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["max-w-screen-xl mx-auto px-5", className], "class:list")}>
  ${renderSlot($$result, $$slots["default"])}
</div>`;
}, "C:/code/dreamoment/website/src/components/container.astro");

const $$Astro$w = createAstro("C:/code/dreamoment/website/src/components/ui/link.astro", "", "file:///C:/code/dreamoment/website/");
const $$Link = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$w, $$props, $$slots);
  Astro2.self = $$Link;
  const {
    href,
    block,
    size = "lg",
    style = "primary",
    class: className,
    ...rest
  } = Astro2.props;
  const sizes = {
    lg: "px-5 py-2.5",
    md: "px-4 py-2"
  };
  const styles = {
    outline: "bg-white border-2 border-black hover:bg-gray-100 text-black ",
    primary: "bg-black text-white hover:bg-gray-800  border-2 border-transparent",
    inverted: "bg-white text-black   border-2 border-transparent",
    muted: "bg-gray-100 hover:bg-gray-200   border-2 border-transparent"
  };
  return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(href, "href")}${spreadAttributes(rest)}${addAttribute([
    "rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200",
    block && "w-full",
    sizes[size],
    styles[style],
    className
  ], "class:list")}>${renderSlot($$result, $$slots["default"])}
</a>`;
}, "C:/code/dreamoment/website/src/components/ui/link.astro");

const $$Astro$v = createAstro("C:/code/dreamoment/website/src/components/cta.astro", "", "file:///C:/code/dreamoment/website/");
const $$Cta = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$v, $$props, $$slots);
  Astro2.self = $$Cta;
  return renderTemplate`${maybeRenderHead($$result)}<div class="bg-black px-20 py-20 mt-20 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center">
  <h2 class="text-white text-3xl md:text-6xl">Build faster websites.</h2>
  <p class="text-slate-500 mt-4 text-lg md:text-xl">
    Pull content from anywhere and serve it fast with Astro's next-gen island
    architecture.
  </p>
  <div class="flex mt-5">
    ${renderComponent($$result, "Link", $$Link, { "href": "#", "style": "inverted" }, { "default": () => renderTemplate`Get Started` })}
  </div>
</div>`;
}, "C:/code/dreamoment/website/src/components/cta.astro");

const SPRITESHEET_NAMESPACE = `astroicon`;

const baseURL = "https://api.astroicon.dev/v1/";
const requests = /* @__PURE__ */ new Map();
const fetchCache = /* @__PURE__ */ new Map();
async function get(pack, name) {
  const url = new URL(`./${pack}/${name}`, baseURL).toString();
  if (requests.has(url)) {
    return await requests.get(url);
  }
  if (fetchCache.has(url)) {
    return fetchCache.get(url);
  }
  let request = async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const contentType = res.headers.get("Content-Type");
    if (!contentType.includes("svg")) {
      throw new Error(`[astro-icon] Unable to load "${name}" because it did not resolve to an SVG!

Recieved the following "Content-Type":
${contentType}`);
    }
    const svg = await res.text();
    fetchCache.set(url, svg);
    requests.delete(url);
    return svg;
  };
  let promise = request();
  requests.set(url, promise);
  return await promise;
}

const splitAttrsTokenizer = /([a-z0-9_\:\-]*)\s*?=\s*?(['"]?)(.*?)\2\s+/gim;
const domParserTokenizer = /(?:<(\/?)([a-zA-Z][a-zA-Z0-9\:]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<\!\-\-)([\s\S]*?)(\-\->)|(<\!\[CDATA\[)([\s\S]*?)(\]\]>))/gm;
const splitAttrs = (str) => {
  let res = {};
  let token;
  if (str) {
    splitAttrsTokenizer.lastIndex = 0;
    str = " " + (str || "") + " ";
    while (token = splitAttrsTokenizer.exec(str)) {
      res[token[1]] = token[3];
    }
  }
  return res;
};
function optimizeSvg(contents, name, options) {
  return optimize(contents, {
    plugins: [
      "removeDoctype",
      "removeXMLProcInst",
      "removeComments",
      "removeMetadata",
      "removeXMLNS",
      "removeEditorsNSData",
      "cleanupAttrs",
      "minifyStyles",
      "convertStyleToAttrs",
      {
        name: "cleanupIDs",
        params: { prefix: `${SPRITESHEET_NAMESPACE}:${name}` }
      },
      "removeRasterImages",
      "removeUselessDefs",
      "cleanupNumericValues",
      "cleanupListOfValues",
      "convertColors",
      "removeUnknownsAndDefaults",
      "removeNonInheritableGroupAttrs",
      "removeUselessStrokeAndFill",
      "removeViewBox",
      "cleanupEnableBackground",
      "removeHiddenElems",
      "removeEmptyText",
      "convertShapeToPath",
      "moveElemsAttrsToGroup",
      "moveGroupAttrsToElems",
      "collapseGroups",
      "convertPathData",
      "convertTransform",
      "removeEmptyAttrs",
      "removeEmptyContainers",
      "mergePaths",
      "removeUnusedNS",
      "sortAttrs",
      "removeTitle",
      "removeDesc",
      "removeDimensions",
      "removeStyleElement",
      "removeScriptElement"
    ]
  }).data;
}
const preprocessCache = /* @__PURE__ */ new Map();
function preprocess(contents, name, { optimize }) {
  if (preprocessCache.has(contents)) {
    return preprocessCache.get(contents);
  }
  if (optimize) {
    contents = optimizeSvg(contents, name);
  }
  domParserTokenizer.lastIndex = 0;
  let result = contents;
  let token;
  if (contents) {
    while (token = domParserTokenizer.exec(contents)) {
      const tag = token[2];
      if (tag === "svg") {
        const attrs = splitAttrs(token[3]);
        result = contents.slice(domParserTokenizer.lastIndex).replace(/<\/svg>/gim, "").trim();
        const value = { innerHTML: result, defaultProps: attrs };
        preprocessCache.set(contents, value);
        return value;
      }
    }
  }
}
function normalizeProps(inputProps) {
  const size = inputProps.size;
  delete inputProps.size;
  const w = inputProps.width ?? size;
  const h = inputProps.height ?? size;
  const width = w ? toAttributeSize(w) : void 0;
  const height = h ? toAttributeSize(h) : void 0;
  return { ...inputProps, width, height };
}
const toAttributeSize = (size) => String(size).replace(/(?<=[0-9])x$/, "em");
async function load(name, inputProps, optimize) {
  const key = name;
  if (!name) {
    throw new Error("<Icon> requires a name!");
  }
  let svg = "";
  let filepath = "";
  if (name.includes(":")) {
    const [pack, ..._name] = name.split(":");
    name = _name.join(":");
    filepath = `/src/icons/${pack}`;
    let get$1;
    try {
      const files = /* #__PURE__ */ Object.assign({


});
      const keys = Object.fromEntries(
        Object.keys(files).map((key2) => [key2.replace(/\.[cm]?[jt]s$/, ""), key2])
      );
      if (!(filepath in keys)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const mod = files[keys[filepath]];
      if (typeof mod.default !== "function") {
        throw new Error(
          `[astro-icon] "${filepath}" did not export a default function!`
        );
      }
      get$1 = mod.default;
    } catch (e) {
    }
    if (typeof get$1 === "undefined") {
      get$1 = get.bind(null, pack);
    }
    const contents = await get$1(name, inputProps);
    if (!contents) {
      throw new Error(
        `<Icon pack="${pack}" name="${name}" /> did not return an icon!`
      );
    }
    if (!/<svg/gim.test(contents)) {
      throw new Error(
        `Unable to process "<Icon pack="${pack}" name="${name}" />" because an SVG string was not returned!

Recieved the following content:
${contents}`
      );
    }
    svg = contents;
  } else {
    filepath = `/src/icons/${name}.svg`;
    try {
      const files = /* #__PURE__ */ Object.assign({


});
      if (!(filepath in files)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const contents = files[filepath];
      if (!/<svg/gim.test(contents)) {
        throw new Error(
          `Unable to process "${filepath}" because it is not an SVG!

Recieved the following content:
${contents}`
        );
      }
      svg = contents;
    } catch (e) {
      throw new Error(
        `[astro-icon] Unable to load "${filepath}". Does the file exist?`
      );
    }
  }
  const { innerHTML, defaultProps } = preprocess(svg, key, { optimize });
  if (!innerHTML.trim()) {
    throw new Error(`Unable to parse "${filepath}"!`);
  }
  return {
    innerHTML,
    props: { ...defaultProps, ...normalizeProps(inputProps) }
  };
}

const $$Astro$u = createAstro("C:/code/dreamoment/website/node_modules/astro-icon/lib/Icon.astro", "", "file:///C:/code/dreamoment/website/");
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$u, $$props, $$slots);
  Astro2.self = $$Icon;
  let { name, pack, title, optimize = true, class: className, ...inputProps } = Astro2.props;
  let props = {};
  if (pack) {
    name = `${pack}:${name}`;
  }
  let innerHTML = "";
  try {
    const svg = await load(name, { ...inputProps, class: className }, optimize);
    innerHTML = svg.innerHTML;
    props = svg.props;
  } catch (e) {
    {
      throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
    }
  }
  return renderTemplate`${maybeRenderHead($$result)}<svg${spreadAttributes(props)}${addAttribute(name, "astro-icon")}>${unescapeHTML((title ? `<title>${title}</title>` : "") + innerHTML)}</svg>`;
}, "C:/code/dreamoment/website/node_modules/astro-icon/lib/Icon.astro");

const sprites = /* @__PURE__ */ new WeakMap();
function trackSprite(request, name) {
  let currentSet = sprites.get(request);
  if (!currentSet) {
    currentSet = /* @__PURE__ */ new Set([name]);
  } else {
    currentSet.add(name);
  }
  sprites.set(request, currentSet);
}
const warned = /* @__PURE__ */ new Set();
async function getUsedSprites(request) {
  const currentSet = sprites.get(request);
  if (currentSet) {
    return Array.from(currentSet);
  }
  if (!warned.has(request)) {
    const { pathname } = new URL(request.url);
    console.log(`[astro-icon] No sprites found while rendering "${pathname}"`);
    warned.add(request);
  }
  return [];
}

const $$Astro$t = createAstro("C:/code/dreamoment/website/node_modules/astro-icon/lib/Spritesheet.astro", "", "file:///C:/code/dreamoment/website/");
const $$Spritesheet = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$t, $$props, $$slots);
  Astro2.self = $$Spritesheet;
  const { optimize = true, style, ...props } = Astro2.props;
  const names = await getUsedSprites(Astro2.request);
  const icons = await Promise.all(names.map((name) => {
    return load(name, {}, optimize).then((res) => ({ ...res, name })).catch((e) => {
      {
        throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
      }
    });
  }));
  return renderTemplate`${maybeRenderHead($$result)}<svg${addAttribute(`position: absolute; width: 0; height: 0; overflow: hidden; ${style ?? ""}`.trim(), "style")}${spreadAttributes({ "aria-hidden": true, ...props })} astro-icon-spritesheet>
    ${icons.map((icon) => renderTemplate`<symbol${spreadAttributes(icon.props)}${addAttribute(`${SPRITESHEET_NAMESPACE}:${icon.name}`, "id")}>${unescapeHTML(icon.innerHTML)}</symbol>`)}
</svg>`;
}, "C:/code/dreamoment/website/node_modules/astro-icon/lib/Spritesheet.astro");

const $$Astro$s = createAstro("C:/code/dreamoment/website/node_modules/astro-icon/lib/SpriteProvider.astro", "", "file:///C:/code/dreamoment/website/");
const $$SpriteProvider = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$s, $$props, $$slots);
  Astro2.self = $$SpriteProvider;
  const content = await Astro2.slots.render("default");
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${unescapeHTML(content)}` })}
${renderComponent($$result, "Spritesheet", $$Spritesheet, {})}
`;
}, "C:/code/dreamoment/website/node_modules/astro-icon/lib/SpriteProvider.astro");

const $$Astro$r = createAstro("C:/code/dreamoment/website/node_modules/astro-icon/lib/Sprite.astro", "", "file:///C:/code/dreamoment/website/");
const $$Sprite = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$r, $$props, $$slots);
  Astro2.self = $$Sprite;
  let { name, pack, title, class: className, x, y, ...inputProps } = Astro2.props;
  const props = normalizeProps(inputProps);
  if (pack) {
    name = `${pack}:${name}`;
  }
  const href = `#${SPRITESHEET_NAMESPACE}:${name}`;
  trackSprite(Astro2.request, name);
  return renderTemplate`${maybeRenderHead($$result)}<svg${spreadAttributes(props)}${addAttribute(className, "class")}${addAttribute(name, "astro-icon")}>
    ${title ? renderTemplate`<title>${title}</title>` : ""}
    <use${spreadAttributes({ "xlink:href": href, width: props.width, height: props.height, x, y })}></use>
</svg>`;
}, "C:/code/dreamoment/website/node_modules/astro-icon/lib/Sprite.astro");

Object.assign($$Sprite, { Provider: $$SpriteProvider });

const $$Astro$q = createAstro("C:/code/dreamoment/website/src/components/features.astro", "", "file:///C:/code/dreamoment/website/");
const $$Features = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$q, $$props, $$slots);
  Astro2.self = $$Features;
  const features = [
    {
      title: "Bring Your Own Framework",
      description: "Build your site using React, Svelte, Vue, Preact, web components, or just plain ol' HTML + JavaScript.",
      icon: "bx:bxs-briefcase"
    },
    {
      title: "100% Static HTML, No JS",
      description: "Astro renders your entire page to static HTML, removing all JavaScript from your final build by default.",
      icon: "bx:bxs-window-alt"
    },
    {
      title: "On-Demand Components",
      description: "Need some JS? Astro can automatically hydrate interactive components when they become visible on the page.  ",
      icon: "bx:bxs-data"
    },
    {
      title: "Broad Integration",
      description: "Astro supports TypeScript, Scoped CSS, CSS Modules, Sass, Tailwind, Markdown, MDX, and any other npm packages.",
      icon: "bx:bxs-bot"
    },
    {
      title: "SEO Enabled",
      description: "Automatic sitemaps, RSS feeds, pagination and collections take the pain out of SEO and syndication. It just works!",
      icon: "bx:bxs-file-find"
    },
    {
      title: "Community",
      description: "Astro is an open source project powered by hundreds of contributors making thousands of individual contributions.",
      icon: "bx:bxs-user"
    }
  ];
  return renderTemplate`${maybeRenderHead($$result)}<div class="mt-16 md:mt-0">
  <h2 class="text-4xl lg:text-5xl font-bold lg:tracking-tight">
    Everything you need to start a website
  </h2>
  <p class="text-lg mt-4 text-slate-600">
    Astro comes batteries included. It takes the best parts of state-of-the-art
    tools and adds its own innovations.
  </p>
</div>

<div class="grid sm:grid-cols-2 md:grid-cols-3 mt-16 gap-16">
  ${features.map((item) => renderTemplate`<div class="flex gap-4 items-start">
        <div class="mt-1 bg-black rounded-full  p-2 w-8 h-8 shrink-0">
          ${renderComponent($$result, "Icon", $$Icon, { "class": "text-white", "name": item.icon })}
        </div>
        <div>
          <h3 class="font-semibold text-lg">${item.title}</h3>${" "}
          <p class="text-slate-500 mt-2 leading-relaxed">${item.description}</p>
        </div>
      </div>`)}
</div>`;
}, "C:/code/dreamoment/website/src/components/features.astro");

function isRemoteImage(src) {
  return /^(https?:)?\/\//.test(src);
}
function removeQueryString(src) {
  const index = src.lastIndexOf("?");
  return index > 0 ? src.substring(0, index) : src;
}
function extname(src) {
  const base = basename(src);
  const index = base.lastIndexOf(".");
  if (index <= 0) {
    return "";
  }
  return base.substring(index);
}
function basename(src) {
  return removeQueryString(src.replace(/^.*[\\\/]/, ""));
}

function isOutputFormat(value) {
  return ["avif", "jpeg", "jpg", "png", "webp"].includes(value);
}
function isAspectRatioString(value) {
  return /^\d*:\d*$/.test(value);
}
function parseAspectRatio(aspectRatio) {
  if (!aspectRatio) {
    return void 0;
  }
  if (typeof aspectRatio === "number") {
    return aspectRatio;
  } else {
    const [width, height] = aspectRatio.split(":");
    return parseInt(width) / parseInt(height);
  }
}
function isSSRService(service) {
  return "transform" in service;
}
class BaseSSRService {
  async getImageAttributes(transform) {
    const { width, height, src, format, quality, aspectRatio, ...rest } = transform;
    return {
      ...rest,
      width,
      height
    };
  }
  serializeTransform(transform) {
    const searchParams = new URLSearchParams();
    if (transform.quality) {
      searchParams.append("q", transform.quality.toString());
    }
    if (transform.format) {
      searchParams.append("f", transform.format);
    }
    if (transform.width) {
      searchParams.append("w", transform.width.toString());
    }
    if (transform.height) {
      searchParams.append("h", transform.height.toString());
    }
    if (transform.aspectRatio) {
      searchParams.append("ar", transform.aspectRatio.toString());
    }
    if (transform.fit) {
      searchParams.append("fit", transform.fit);
    }
    if (transform.background) {
      searchParams.append("bg", transform.background);
    }
    if (transform.position) {
      searchParams.append("p", encodeURI(transform.position));
    }
    searchParams.append("href", transform.src);
    return { searchParams };
  }
  parseTransform(searchParams) {
    if (!searchParams.has("href")) {
      return void 0;
    }
    let transform = { src: searchParams.get("href") };
    if (searchParams.has("q")) {
      transform.quality = parseInt(searchParams.get("q"));
    }
    if (searchParams.has("f")) {
      const format = searchParams.get("f");
      if (isOutputFormat(format)) {
        transform.format = format;
      }
    }
    if (searchParams.has("w")) {
      transform.width = parseInt(searchParams.get("w"));
    }
    if (searchParams.has("h")) {
      transform.height = parseInt(searchParams.get("h"));
    }
    if (searchParams.has("ar")) {
      const ratio = searchParams.get("ar");
      if (isAspectRatioString(ratio)) {
        transform.aspectRatio = ratio;
      } else {
        transform.aspectRatio = parseFloat(ratio);
      }
    }
    if (searchParams.has("fit")) {
      transform.fit = searchParams.get("fit");
    }
    if (searchParams.has("p")) {
      transform.position = decodeURI(searchParams.get("p"));
    }
    if (searchParams.has("bg")) {
      transform.background = searchParams.get("bg");
    }
    return transform;
  }
}

function resolveSize(transform) {
  if (transform.width && transform.height) {
    return transform;
  }
  if (!transform.width && !transform.height) {
    throw new Error(`"width" and "height" cannot both be undefined`);
  }
  if (!transform.aspectRatio) {
    throw new Error(
      `"aspectRatio" must be included if only "${transform.width ? "width" : "height"}" is provided`
    );
  }
  let aspectRatio;
  if (typeof transform.aspectRatio === "number") {
    aspectRatio = transform.aspectRatio;
  } else {
    const [width, height] = transform.aspectRatio.split(":");
    aspectRatio = Number.parseInt(width) / Number.parseInt(height);
  }
  if (transform.width) {
    return {
      ...transform,
      width: transform.width,
      height: Math.round(transform.width / aspectRatio)
    };
  } else if (transform.height) {
    return {
      ...transform,
      width: Math.round(transform.height * aspectRatio),
      height: transform.height
    };
  }
  return transform;
}
async function resolveTransform(input) {
  if (typeof input.src === "string") {
    return resolveSize(input);
  }
  const metadata = "then" in input.src ? (await input.src).default : input.src;
  let { width, height, aspectRatio, background, format = metadata.format, ...rest } = input;
  if (!width && !height) {
    width = metadata.width;
    height = metadata.height;
  } else if (width) {
    let ratio = parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
    height = height || Math.round(width / ratio);
  } else if (height) {
    let ratio = parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
    width = width || Math.round(height * ratio);
  }
  return {
    ...rest,
    src: metadata.src,
    width,
    height,
    aspectRatio,
    format,
    background
  };
}
async function getImage(transform) {
  var _a, _b, _c;
  if (!transform.src) {
    throw new Error("[@astrojs/image] `src` is required");
  }
  let loader = (_a = globalThis.astroImage) == null ? void 0 : _a.loader;
  if (!loader) {
    const { default: mod } = await import('./chunks/squoosh.d4c30919.mjs').catch(() => {
      throw new Error(
        "[@astrojs/image] Builtin image loader not found. (Did you remember to add the integration to your Astro config?)"
      );
    });
    loader = mod;
    globalThis.astroImage = globalThis.astroImage || {};
    globalThis.astroImage.loader = loader;
  }
  const resolved = await resolveTransform(transform);
  const attributes = await loader.getImageAttributes(resolved);
  const isDev = (_b = (Object.assign({"BASE_URL":"/docs/","MODE":"production","DEV":false,"PROD":true},{SSR:true,}))) == null ? void 0 : _b.DEV;
  const isLocalImage = !isRemoteImage(resolved.src);
  const _loader = isDev && isLocalImage ? globalThis.astroImage.defaultLoader : loader;
  if (!_loader) {
    throw new Error("@astrojs/image: loader not found!");
  }
  const { searchParams } = isSSRService(_loader) ? _loader.serializeTransform(resolved) : globalThis.astroImage.defaultLoader.serializeTransform(resolved);
  const imgSrc = !isLocalImage && resolved.src.startsWith("//") ? `https:${resolved.src}` : resolved.src;
  let src;
  if (/^[\/\\]?@astroimage/.test(imgSrc)) {
    src = `${imgSrc}?${searchParams.toString()}`;
  } else {
    searchParams.set("href", imgSrc);
    src = `/_image?${searchParams.toString()}`;
  }
  if ((_c = globalThis.astroImage) == null ? void 0 : _c.addStaticImage) {
    src = globalThis.astroImage.addStaticImage(resolved);
  }
  return {
    ...attributes,
    src
  };
}

async function resolveAspectRatio({ src, aspectRatio }) {
  if (typeof src === "string") {
    return parseAspectRatio(aspectRatio);
  } else {
    const metadata = "then" in src ? (await src).default : src;
    return parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
  }
}
async function resolveFormats({ src, formats }) {
  const unique = new Set(formats);
  if (typeof src === "string") {
    unique.add(extname(src).replace(".", ""));
  } else {
    const metadata = "then" in src ? (await src).default : src;
    unique.add(extname(metadata.src).replace(".", ""));
  }
  return Array.from(unique).filter(Boolean);
}
async function getPicture(params) {
  const { src, widths, fit, position, background } = params;
  if (!src) {
    throw new Error("[@astrojs/image] `src` is required");
  }
  if (!widths || !Array.isArray(widths)) {
    throw new Error("[@astrojs/image] at least one `width` is required");
  }
  const aspectRatio = await resolveAspectRatio(params);
  if (!aspectRatio) {
    throw new Error("`aspectRatio` must be provided for remote images");
  }
  const allFormats = await resolveFormats(params);
  const lastFormat = allFormats[allFormats.length - 1];
  const maxWidth = Math.max(...widths);
  let image;
  async function getSource(format) {
    const imgs = await Promise.all(
      widths.map(async (width) => {
        const img = await getImage({
          src,
          format,
          width,
          fit,
          position,
          background,
          aspectRatio
        });
        if (format === lastFormat && width === maxWidth) {
          image = img;
        }
        return `${img.src} ${width}w`;
      })
    );
    return {
      type: mime.getType(format) || format,
      srcset: imgs.join(",")
    };
  }
  const sources = await Promise.all(allFormats.map((format) => getSource(format)));
  return {
    sources,
    image
  };
}

const $$Astro$p = createAstro("C:/code/dreamoment/website/node_modules/@astrojs/image/components/Image.astro", "", "file:///C:/code/dreamoment/website/");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$p, $$props, $$slots);
  Astro2.self = $$Image;
  const { loading = "lazy", decoding = "async", ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    warnForMissingAlt();
  }
  const attrs = await getImage(props);
  return renderTemplate`${maybeRenderHead($$result)}<img${spreadAttributes(attrs)}${addAttribute(loading, "loading")}${addAttribute(decoding, "decoding")}>`;
}, "C:/code/dreamoment/website/node_modules/@astrojs/image/components/Image.astro");

const $$Astro$o = createAstro("C:/code/dreamoment/website/node_modules/@astrojs/image/components/Picture.astro", "", "file:///C:/code/dreamoment/website/");
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$o, $$props, $$slots);
  Astro2.self = $$Picture;
  const {
    src,
    alt,
    sizes,
    widths,
    aspectRatio,
    fit,
    background,
    position,
    formats = ["avif", "webp"],
    loading = "lazy",
    decoding = "async",
    ...attrs
  } = Astro2.props;
  if (alt === void 0 || alt === null) {
    warnForMissingAlt();
  }
  const { image, sources } = await getPicture({
    src,
    widths,
    formats,
    aspectRatio,
    fit,
    background,
    position
  });
  delete image.width;
  delete image.height;
  return renderTemplate`${maybeRenderHead($$result)}<picture>
	${sources.map((attrs2) => renderTemplate`<source${spreadAttributes(attrs2)}${addAttribute(sizes, "sizes")}>`)}
	<img${spreadAttributes(image)}${addAttribute(loading, "loading")}${addAttribute(decoding, "decoding")}${addAttribute(alt, "alt")}${spreadAttributes(attrs)}>
</picture>`;
}, "C:/code/dreamoment/website/node_modules/@astrojs/image/components/Picture.astro");

let altWarningShown = false;
function warnForMissingAlt() {
  if (altWarningShown === true) {
    return;
  }
  altWarningShown = true;
  console.warn(`
[@astrojs/image] "alt" text was not provided for an <Image> or <Picture> component.

A future release of @astrojs/image may throw a build error when "alt" text is missing.

The "alt" attribute holds a text description of the image, which isn't mandatory but is incredibly useful for accessibility. Set to an empty string (alt="") if the image is not a key part of the content (it's decoration or a tracking pixel).
`);
}

const heroImage = {"src":"/docs/assets/hero.c8293ced.png","width":520,"height":424,"format":"png"};

const $$Astro$n = createAstro("C:/code/dreamoment/website/src/components/hero.astro", "", "file:///C:/code/dreamoment/website/");
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$n, $$props, $$slots);
  Astro2.self = $$Hero;
  return renderTemplate`${maybeRenderHead($$result)}<main class="grid lg:grid-cols-2 place-items-center pt-16 pb-8 md:pt-8">
  <div class="py-6 md:order-1 hidden md:block">
    ${renderComponent($$result, "Image", $$Image, { "src": heroImage, "alt": "Astronaut in the air", "loading": "eager", "format": "avif" })}
  </div>
  <div>
    <h1 class="text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight">
      Marketing website done with Astro
    </h1>
    <p class="text-lg mt-4 text-slate-600 max-w-xl">
      Astroship is a starter template for startups, marketing websites & landing
      pages.<wbr> Built with Astro.build, TailwindCSS & Alpine.js. You can quickly
      create any website with this starter.
    </p>
    <div class="mt-6 flex flex-col sm:flex-row gap-3">
      ${renderComponent($$result, "Link", $$Link, { "href": "#", "href": "https://web3templates.com/", "target": "_blank", "rel": "noopener" }, { "default": () => renderTemplate`Get Started` })}
      ${renderComponent($$result, "Link", $$Link, { "size": "lg", "style": "outline", "rel": "noopener", "href": "https://github.com/surjithctly/astroship", "target": "_blank" }, { "default": () => renderTemplate`View Repo` })}
    </div>
  </div>
</main>`;
}, "C:/code/dreamoment/website/src/components/hero.astro");

const $$Astro$m = createAstro("C:/code/dreamoment/website/src/components/logos.astro", "", "file:///C:/code/dreamoment/website/");
const $$Logos = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$Logos;
  return renderTemplate`${maybeRenderHead($$result)}<div class="mt-24">
  <h2 class="text-center text-slate-500">Works with your technologies</h2>
  <div class="flex gap-8 md:gap-20 items-center justify-center mt-10 flex-wrap">
    ${renderComponent($$result, "Icon", $$Icon, { "class": "h-8 md:h-12", "name": "simple-icons:react" })}
    ${renderComponent($$result, "Icon", $$Icon, { "class": "h-8 md:h-12", "name": "simple-icons:svelte" })}
    ${renderComponent($$result, "Icon", $$Icon, { "class": "h-8 md:h-14", "name": "simple-icons:tailwindcss" })}
    ${renderComponent($$result, "Icon", $$Icon, { "class": "h-8 md:h-16", "name": "simple-icons:alpinedotjs" })}
    ${renderComponent($$result, "Icon", $$Icon, { "class": "h-8 md:h-12", "name": "simple-icons:vercel" })}
    ${renderComponent($$result, "Icon", $$Icon, { "class": "h-8 md:h-12", "name": "simple-icons:astro" })}
  </div>
</div>`;
}, "C:/code/dreamoment/website/src/components/logos.astro");

const $$Astro$l = createAstro("C:/code/dreamoment/website/node_modules/astro-seo/src/components/OpenGraphArticleTags.astro", "", "file:///C:/code/dreamoment/website/");
const $$OpenGraphArticleTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$OpenGraphArticleTags;
  const { publishedTime, modifiedTime, expirationTime, authors, section, tags } = Astro2.props.openGraph.article;
  return renderTemplate`${publishedTime ? renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>` : null}
${modifiedTime ? renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime, "content")}>` : null}
${expirationTime ? renderTemplate`<meta property="article:expiration_time"${addAttribute(expirationTime, "content")}>` : null}
${authors ? authors.map((author) => renderTemplate`<meta property="article:author"${addAttribute(author, "content")}>`) : null}
${section ? renderTemplate`<meta property="article:section"${addAttribute(section, "content")}>` : null}
${tags ? tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`) : null}
`;
}, "C:/code/dreamoment/website/node_modules/astro-seo/src/components/OpenGraphArticleTags.astro");

const $$Astro$k = createAstro("C:/code/dreamoment/website/node_modules/astro-seo/src/components/OpenGraphBasicTags.astro", "", "file:///C:/code/dreamoment/website/");
const $$OpenGraphBasicTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$OpenGraphBasicTags;
  const { openGraph } = Astro2.props;
  return renderTemplate`<meta property="og:title"${addAttribute(openGraph.basic.title, "content")}>
<meta property="og:type"${addAttribute(openGraph.basic.type, "content")}>
<meta property="og:image"${addAttribute(openGraph.basic.image, "content")}>
<meta property="og:url"${addAttribute(openGraph.basic.url || Astro2.url.href, "content")}>
`;
}, "C:/code/dreamoment/website/node_modules/astro-seo/src/components/OpenGraphBasicTags.astro");

const $$Astro$j = createAstro("C:/code/dreamoment/website/node_modules/astro-seo/src/components/OpenGraphImageTags.astro", "", "file:///C:/code/dreamoment/website/");
const $$OpenGraphImageTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$OpenGraphImageTags;
  const { image } = Astro2.props.openGraph.basic;
  const { url, secureUrl, type, width, height, alt } = Astro2.props.openGraph.image;
  return renderTemplate`<meta property="og:image:url"${addAttribute(image, "content")}>
${secureUrl ? renderTemplate`<meta property="og:image:secure_url"${addAttribute(secureUrl, "content")}>` : null}
${type ? renderTemplate`<meta property="og:image:type"${addAttribute(type, "content")}>` : null}
${width ? renderTemplate`<meta property="og:image:width"${addAttribute(width, "content")}>` : null}
${!(height === null) ? renderTemplate`<meta property="og:image:height"${addAttribute(height, "content")}>` : null}
${!(alt === null) ? renderTemplate`<meta property="og:image:alt"${addAttribute(alt, "content")}>` : null}
`;
}, "C:/code/dreamoment/website/node_modules/astro-seo/src/components/OpenGraphImageTags.astro");

const $$Astro$i = createAstro("C:/code/dreamoment/website/node_modules/astro-seo/src/components/OpenGraphOptionalTags.astro", "", "file:///C:/code/dreamoment/website/");
const $$OpenGraphOptionalTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$OpenGraphOptionalTags;
  const { optional } = Astro2.props.openGraph;
  return renderTemplate`${optional.audio ? renderTemplate`<meta property="og:audio"${addAttribute(optional.audio, "content")}>` : null}
${optional.description ? renderTemplate`<meta property="og:description"${addAttribute(optional.description, "content")}>` : null}
${optional.determiner ? renderTemplate`<meta property="og:determiner"${addAttribute(optional.determiner, "content")}>` : null}
${optional.locale ? renderTemplate`<meta property="og:locale"${addAttribute(optional.locale, "content")}>` : null}
${optional.localeAlternate?.map((locale) => renderTemplate`<meta property="og:locale:alternate"${addAttribute(locale, "content")}>`)}
${optional.siteName ? renderTemplate`<meta property="og:site_name"${addAttribute(optional.siteName, "content")}>` : null}
${optional.video ? renderTemplate`<meta property="og:video"${addAttribute(optional.video, "content")}>` : null}
`;
}, "C:/code/dreamoment/website/node_modules/astro-seo/src/components/OpenGraphOptionalTags.astro");

const $$Astro$h = createAstro("C:/code/dreamoment/website/node_modules/astro-seo/src/components/ExtendedTags.astro", "", "file:///C:/code/dreamoment/website/");
const $$ExtendedTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$ExtendedTags;
  const { props } = Astro2;
  return renderTemplate`${props.extend.link?.map((attributes) => renderTemplate`<link${spreadAttributes(attributes)}>`)}
${props.extend.meta?.map(({ content, httpEquiv, name, property }) => renderTemplate`<meta${addAttribute(content, "content")}${addAttribute(httpEquiv, "http-eqiv")}${addAttribute(name, "name")}${addAttribute(property, "property")}>`)}
`;
}, "C:/code/dreamoment/website/node_modules/astro-seo/src/components/ExtendedTags.astro");

const $$Astro$g = createAstro("C:/code/dreamoment/website/node_modules/astro-seo/src/components/TwitterTags.astro", "", "file:///C:/code/dreamoment/website/");
const $$TwitterTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$TwitterTags;
  const { card, site, creator } = Astro2.props.twitter;
  return renderTemplate`${card ? renderTemplate`<meta name="twitter:card"${addAttribute(card, "content")}>` : null}
${site ? renderTemplate`<meta name="twitter:site"${addAttribute(site, "content")}>` : null}
${creator ? renderTemplate`<meta name="twitter:creator"${addAttribute(creator, "content")}>` : null}
`;
}, "C:/code/dreamoment/website/node_modules/astro-seo/src/components/TwitterTags.astro");

const $$Astro$f = createAstro("C:/code/dreamoment/website/node_modules/astro-seo/src/SEO.astro", "", "file:///C:/code/dreamoment/website/");
const $$SEO = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$SEO;
  const { props } = Astro2;
  const { title, description, canonical, noindex, nofollow, charset } = props;
  function validateProps(props2) {
    const { openGraph, description: description2 } = props2;
    if (openGraph) {
      if (!openGraph.basic || openGraph.basic.title == null || openGraph.basic.type == null || openGraph.basic.image == null) {
        throw new Error(
          "If you pass the openGraph prop, you have to at least define the title, type, and image basic properties!"
        );
      }
    }
    if (title && openGraph?.basic.title) {
      if (title == openGraph.basic.title) {
        console.warn(
          "WARNING(astro-seo): You passed the same value to `title` and `openGraph.optional.title`. This is most likely not what you want. See docs for more."
        );
      }
    }
    if (openGraph?.basic?.image && !openGraph?.image?.alt) {
      console.warn(
        "WARNING(astro-seo): You defined `openGraph.basic.image`, but didn't define `openGraph.image.alt`. This is stongly discouraged.'"
      );
    }
  }
  validateProps(props);
  return renderTemplate`${title ? renderTemplate`<title>${unescapeHTML(title)}</title>` : null}

${charset ? renderTemplate`<meta${addAttribute(charset, "charset")}>` : null}

<link rel="canonical"${addAttribute(canonical || Astro2.url.href, "href")}>

${description ? renderTemplate`<meta name="description"${addAttribute(description, "content")}>` : null}

<meta name="robots"${addAttribute(`${noindex ? "noindex" : "index"}, ${nofollow ? "nofollow" : "follow"}`, "content")}>

${props.openGraph && renderTemplate`${renderComponent($$result, "OpenGraphBasicTags", $$OpenGraphBasicTags, { ...props })}`}
${props.openGraph?.optional && renderTemplate`${renderComponent($$result, "OpenGraphOptionalTags", $$OpenGraphOptionalTags, { ...props })}`}
${props.openGraph?.image && renderTemplate`${renderComponent($$result, "OpenGraphImageTags", $$OpenGraphImageTags, { ...props })}`}
${props.openGraph?.article && renderTemplate`${renderComponent($$result, "OpenGraphArticleTags", $$OpenGraphArticleTags, { ...props })}`}
${props.twitter && renderTemplate`${renderComponent($$result, "TwitterTags", $$TwitterTags, { ...props })}`}
${props.extend && renderTemplate`${renderComponent($$result, "ExtendedTags", $$ExtendedTags, { ...props })}`}
`;
}, "C:/code/dreamoment/website/node_modules/astro-seo/src/SEO.astro");

const $$Astro$e = createAstro("C:/code/dreamoment/website/src/components/footer.astro", "", "file:///C:/code/dreamoment/website/");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead($$result)}<footer class="my-20">
  <p class="text-center text-sm text-slate-500">
    Copyright © ${new Date().getFullYear()} Astroship. All rights reserved.
  </p>
  <!--
    Can we ask you a favor 🙏
    Please keep this backlink on your website if possible.
    or Purchase a commercial license from https://web3templates.com
  -->
  <p class="text-center text-xs text-slate-500 mt-1">
    Made by <a href="https://web3templates.com" target="_blank" rel="noopener" class="hover:underline">
      Web3Templates
    </a>
  </p>
</footer>`;
}, "C:/code/dreamoment/website/src/components/footer.astro");

const $$Astro$d = createAstro("C:/code/dreamoment/website/src/components/navbar/dropdown.astro", "", "file:///C:/code/dreamoment/website/");
const $$Dropdown = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Dropdown;
  const { title, lastItem, children } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<li @click.away="open = false" class="relative" x-data="{ open: false }">
  <button @click="open = !open" class="flex items-center gap-1 w-full lg:w-auto lg:px-3 py-2 text-gray-600 hover:text-gray-900">
    <span>${title}</span>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-3 h-3 mt-0.5" :class="{'rotate-180': open, 'rotate-0': !open}">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
    </svg>
  </button>
  <div x-cloak x-show="open"${addAttribute([
    "lg:absolute  w-full  lg:w-48",
    lastItem ? "lg:right-0 origin-top-right" : "lg:left-0 origin-top-left"
  ], "class:list")}>
    <div class="px-3 lg:py-2 lg:bg-white lg:rounded-md lg:shadow lg:border flex flex-col">
      ${children.map((item) => renderTemplate`<a${addAttribute(item.path, "href")} class="py-1 text-gray-600 hover:text-gray-900">
            ${item.title}
          </a>`)}
    </div>
  </div>
</li>`;
}, "C:/code/dreamoment/website/src/components/navbar/dropdown.astro");

const $$Astro$c = createAstro("C:/code/dreamoment/website/src/components/navbar/navbar.astro", "", "file:///C:/code/dreamoment/website/");
const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Navbar;
  const menuitems = [
    {
      title: "Features",
      path: "#",
      children: [
        { title: "Action", path: "#" },
        { title: "Another action", path: "#" },
        { title: "Dropdown Submenu", path: "#" }
      ]
    },
    {
      title: "Pricing",
      path: `${"/docs/"}pricing`
    },
    {
      title: "About",
      path: `${"/docs/"}about`
    },
    {
      title: "Blog",
      path: `${"/docs/"}blog`
    },
    {
      title: "Contact",
      path: `${"/docs/"}contact`
    }
  ];
  return renderTemplate`${renderComponent($$result, "Container", $$Container, {}, { "default": () => renderTemplate`${maybeRenderHead($$result)}<header class="flex flex-col lg:flex-row justify-between items-center my-5" x-data="{ open: false }" x-init="$watch('open', value => console.log(value))">
    <div class="flex w-full lg:w-auto items-center justify-between">
      <a href="/" class="text-lg"><span class="font-bold text-slate-800">Astro</span><span class="text-slate-500">ship</span>
      </a>
      <div class="block lg:hidden">
        <button @click="open = !open" class="text-gray-800">
          <svg fill="currentColor" class="w-4 h-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path x-cloak x-show="open" fill-rule="evenodd" clip-rule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"></path>
            <path x-show="!open" fill-rule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"></path>
          </svg>
        </button>
      </div>
    </div>
    <nav class="hidden w-full lg:w-auto mt-2 lg:flex lg:mt-0" :class="{ 'block': open, 'hidden': !open }" x-transition>
      <ul class="flex flex-col lg:flex-row lg:gap-3">
        ${menuitems.map((item, index) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${item.children && renderTemplate`${renderComponent($$result, "Dropdown", $$Dropdown, { "title": item.title, "children": item.children, "lastItem": index === menuitems.length - 1 })}`}${!item.children && renderTemplate`<li>
                  <a${addAttribute(item.path, "href")} class="flex lg:px-3 py-2 text-gray-600 hover:text-gray-900">
                    ${item.title}
                  </a>
                </li>`}` })}`)}
      </ul>
      <div class="lg:hidden flex items-center mt-3 gap-4">
        ${renderComponent($$result, "Link", $$Link, { "href": "#", "style": "muted", "block": true, "size": "md" }, { "default": () => renderTemplate`Log in` })}
        ${renderComponent($$result, "Link", $$Link, { "href": "#", "size": "md", "block": true }, { "default": () => renderTemplate`Sign up` })}
      </div>
    </nav>
    <div>
      <div class="hidden lg:flex items-center gap-4">
        <a href="#">Log in</a>
        ${renderComponent($$result, "Link", $$Link, { "href": "#", "size": "md" }, { "default": () => renderTemplate`Sign up` })}
      </div>
    </div>
  </header>` })}`;
}, "C:/code/dreamoment/website/src/components/navbar/navbar.astro");

const $$Astro$b = createAstro("C:/code/dreamoment/website/src/layouts/Layout.astro", "", "file:///C:/code/dreamoment/website/");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Layout;
  const resolvedImageWithDomain = new URL("/opengraph.jpg", Astro2.url).toString();
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <meta name="generator"${addAttribute(Astro2.generator, "content")}>

    <!-- <link rel="preload" as="image" href={src} alt="Hero" /> -->
    ${renderComponent($$result, "SEO", $$SEO, { "title": `${title}${title && " | "}Astroship`, "description": "Astroship is a starter website template for Astro built with TailwindCSS.", "twitter": {
    creator: "@surjithctly",
    site: "@web3templates",
    card: "summary_large_image"
  }, "openGraph": {
    basic: {
      type: "website",
      title: `Astroship - Starter Template for Astro`,
      image: resolvedImageWithDomain
    },
    image: {
      alt: "Astroship Homepage Screenshot"
    }
  } })}
  ${renderHead($$result)}</head>
  <body>
    ${renderComponent($$result, "Navbar", $$Navbar, {})}
    ${renderSlot($$result, $$slots["default"])}
    ${renderComponent($$result, "Footer", $$Footer, {})}
    
  </body>
</html>`;
}, "C:/code/dreamoment/website/src/layouts/Layout.astro");

const $$Astro$a = createAstro("C:/code/dreamoment/website/src/pages/index.astro", "", "file:///C:/code/dreamoment/website/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "" }, { "default": () => renderTemplate`${renderComponent($$result, "Container", $$Container, {}, { "default": () => renderTemplate`${renderComponent($$result, "Hero", $$Hero, {})}${renderComponent($$result, "Features", $$Features, {})}${renderComponent($$result, "Logos", $$Logos, {})}${renderComponent($$result, "Cta", $$Cta, {})}` })}` })}`;
}, "C:/code/dreamoment/website/src/pages/index.astro");

const $$file$5 = "C:/code/dreamoment/website/src/pages/index.astro";
const $$url$5 = "/docs";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file$5,
  url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$9 = createAstro("C:/code/dreamoment/website/src/components/sectionhead.astro", "", "file:///C:/code/dreamoment/website/");
const $$Sectionhead = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Sectionhead;
  const { align = "center" } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["mt-16", align === "center" && "text-center"], "class:list")}>
  <h1 class="text-4xl lg:text-5xl font-bold lg:tracking-tight">
    ${renderSlot($$result, $$slots["title"], renderTemplate`Title`)}
  </h1>
  <p class="text-lg mt-4 text-slate-600">
    ${renderSlot($$result, $$slots["desc"], renderTemplate`Some description goes here`)}
  </p>
</div>`;
}, "C:/code/dreamoment/website/src/components/sectionhead.astro");

const $$Astro$8 = createAstro("C:/code/dreamoment/website/src/components/ui/button.astro", "", "file:///C:/code/dreamoment/website/");
const $$Button = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Button;
  const {
    size = "md",
    style = "primary",
    block,
    class: className,
    ...rest
  } = Astro2.props;
  const sizes = {
    md: "px-5 py-2.5",
    lg: "px-6 py-3"
  };
  const styles = {
    outline: "border-2 border-black hover:bg-black text-black hover:text-white",
    primary: "bg-black text-white hover:bg-slate-900  border-2 border-transparent"
  };
  return renderTemplate`${maybeRenderHead($$result)}<button${spreadAttributes(rest)}${addAttribute([
    "rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200",
    block && "w-full",
    sizes[size],
    styles[style],
    className
  ], "class:list")}>${renderSlot($$result, $$slots["default"])}
</button>`;
}, "C:/code/dreamoment/website/src/components/ui/button.astro");

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$7 = createAstro("C:/code/dreamoment/website/src/components/contactform.astro", "", "file:///C:/code/dreamoment/website/");
const $$Contactform = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Contactform;
  return renderTemplate(_a || (_a = __template(["<!-- To make this contact form work, create your free access key from https://web3forms.com/\n     Then you will get all form submissions in your email inbox. -->", '<form action="https://api.web3forms.com/submit" method="POST" id="form" class="needs-validation astro-XKYDIU5R" novalidate>\n  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" class="astro-XKYDIU5R">\n  <!-- Create your free access key from https://web3forms.com/ -->\n  <input type="checkbox" class="hidden astro-XKYDIU5R" style="display:none" name="botcheck">\n  <div class="mb-5 astro-XKYDIU5R">\n    <input type="text" placeholder="Full Name" required class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 astro-XKYDIU5R" name="name">\n    <div class="empty-feedback invalid-feedback text-red-400 text-sm mt-1 astro-XKYDIU5R">\n      Please provide your full name.\n    </div>\n  </div>\n  <div class="mb-5 astro-XKYDIU5R">\n    <label for="email_address" class="sr-only astro-XKYDIU5R">Email Address</label><input id="email_address" type="email" placeholder="Email Address" name="email" required class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 astro-XKYDIU5R">\n    <div class="empty-feedback text-red-400 text-sm mt-1 astro-XKYDIU5R">\n      Please provide your email address.\n    </div>\n    <div class="invalid-feedback text-red-400 text-sm mt-1 astro-XKYDIU5R">\n      Please provide a valid email address.\n    </div>\n  </div>\n  <div class="mb-3 astro-XKYDIU5R">\n    <textarea name="message" required placeholder="Your Message" class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none h-36 focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 astro-XKYDIU5R"></textarea>\n    <div class="empty-feedback invalid-feedback text-red-400 text-sm mt-1 astro-XKYDIU5R">\n      Please enter your message.\n    </div>\n  </div>\n  ', '\n  <div id="result" class="mt-3 text-center astro-XKYDIU5R"></div>\n</form>\n\n\n\n<script>\n  const form = document.getElementById("form");\n  const result = document.getElementById("result");\n\n  form.addEventListener("submit", function (e) {\n    e.preventDefault();\n    form.classList.add("was-validated");\n    if (!form.checkValidity()) {\n      form.querySelectorAll(":invalid")[0].focus();\n      return;\n    }\n    const formData = new FormData(form);\n    const object = Object.fromEntries(formData);\n    const json = JSON.stringify(object);\n\n    result.innerHTML = "Sending...";\n\n    fetch("https://api.web3forms.com/submit", {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json",\n        Accept: "application/json",\n      },\n      body: json,\n    })\n      .then(async (response) => {\n        let json = await response.json();\n        if (response.status == 200) {\n          result.classList.add("text-green-500");\n          result.innerHTML = json.message;\n        } else {\n          console.log(response);\n          result.classList.add("text-red-500");\n          result.innerHTML = json.message;\n        }\n      })\n      .catch((error) => {\n        console.log(error);\n        result.innerHTML = "Something went wrong!";\n      })\n      .then(function () {\n        form.reset();\n        form.classList.remove("was-validated");\n        setTimeout(() => {\n          result.style.display = "none";\n        }, 5000);\n      });\n  });\n<\/script>'])), maybeRenderHead($$result), renderComponent($$result, "Button", $$Button, { "type": "submit", "size": "lg", "block": true, "class": "astro-XKYDIU5R" }, { "default": () => renderTemplate`Send Message` }));
}, "C:/code/dreamoment/website/src/components/contactform.astro");

const $$Astro$6 = createAstro("C:/code/dreamoment/website/src/pages/contact.astro", "", "file:///C:/code/dreamoment/website/");
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Contact;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contact" }, { "default": () => renderTemplate`${renderComponent($$result, "Container", $$Container, {}, { "default": () => renderTemplate`${renderComponent($$result, "Sectionhead", $$Sectionhead, {}, { "desc": () => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "slot": "desc" }, { "default": () => renderTemplate`We are a here to help.` })}`, "title": () => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "slot": "title" }, { "default": () => renderTemplate`Contact` })}` })}${maybeRenderHead($$result)}<div class="grid md:grid-cols-2 gap-10 mx-auto max-w-4xl mt-16">
      <div>
        <h2 class="font-medium text-2xl text-gray-800">Contact Astroship</h2>
        <p class="text-lg leading-relaxed text-slate-500 mt-3">
          Have something to say? We are here to help. Fill up the form or send
          email or call phone.
        </p>
        <div class="mt-5">
          <div class="flex items-center mt-2 space-x-2 text-gray-600">
            ${renderComponent($$result, "Icon", $$Icon, { "class": "text-gray-400 w-4 h-4", "name": "uil:map-marker" })}
            <span>1734 Sanfransico, CA 93063</span>
          </div><div class="flex items-center mt-2 space-x-2 text-gray-600">
            ${renderComponent($$result, "Icon", $$Icon, { "class": "text-gray-400 w-4 h-4", "name": "uil:envelope" })}<a href="mailto:hello@astroshipstarter.com">hello@astroshipstarter.com</a>
          </div><div class="flex items-center mt-2 space-x-2 text-gray-600">
            ${renderComponent($$result, "Icon", $$Icon, { "class": "text-gray-400 w-4 h-4", "name": "uil:phone" })}<a href="tel:+1 (987) 4587 899">+1 (987) 4587 899</a>
          </div>
        </div>
      </div>
      <div>
        ${renderComponent($$result, "Contactform", $$Contactform, {})}
      </div>
    </div>` })}` })}`;
}, "C:/code/dreamoment/website/src/pages/contact.astro");

const $$file$4 = "C:/code/dreamoment/website/src/pages/contact.astro";
const $$url$4 = "/docs/contact";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file$4,
  url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$5 = createAstro("C:/code/dreamoment/website/src/components/ui/icons/tick.astro", "", "file:///C:/code/dreamoment/website/");
const $$Tick = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Tick;
  const { class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<svg${addAttribute(className, "class")} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity=".16"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 12a8.25 8.25 0 0 1 11.916-7.393.75.75 0 1 0 .668-1.343A9.713 9.713 0 0 0 12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75c0-.366-.02-.727-.06-1.082a.75.75 0 1 0-1.49.164A8.25 8.25 0 1 1 3.75 12Zm17.78-6.47a.75.75 0 0 0-1.06-1.06L12 12.94l-2.47-2.47a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l9-9Z" fill="currentColor"></path>
</svg>`;
}, "C:/code/dreamoment/website/src/components/ui/icons/tick.astro");

const $$Astro$4 = createAstro("C:/code/dreamoment/website/src/components/pricing.astro", "", "file:///C:/code/dreamoment/website/");
const $$Pricing$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Pricing$1;
  const { plan } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<div>
  <div class="flex flex-col w-full order-first lg:order-none border-2 border-[#D8DEE9] border-opacity-50 py-5 px-6 rounded-md">
    <div class="text-center">
      <h4 class="text-lg font-medium text-gray-400">${plan.name}</h4><p class="mt-3 text-4xl font-bold text-black md:text-4xl">
        ${plan.price && typeof plan.price === "object" ? plan.price.monthly : plan.price}
      </p>
      <!-- {
        plan.price.original && (
          <p class="mt-1 text-xl font-medium text-gray-400 line-through md:text-2xl">
            {plan.price.original}
          </p>
        )
      } -->
    </div><ul class="grid mt-8 text-left gap-y-4">
      ${plan.features.map((item) => renderTemplate`<li class="flex items-start gap-3 text-gray-800">
            ${renderComponent($$result, "Tick", $$Tick, { "class": "w-6 h-6" })}
            <span>${item}</span>
          </li>`)}
    </ul><div class="flex mt-8">
      ${renderComponent($$result, "Link", $$Link, { "href": plan.button.link || "#", "block": true, "style": plan.popular ? "primary" : "outline" }, { "default": () => renderTemplate`${plan.button.text || "Get Started"}` })}
    </div>
  </div>
</div>`;
}, "C:/code/dreamoment/website/src/components/pricing.astro");

const $$Astro$3 = createAstro("C:/code/dreamoment/website/src/pages/pricing.astro", "", "file:///C:/code/dreamoment/website/");
const $$Pricing = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Pricing;
  const pricing = [
    {
      name: "Personal",
      price: "Free",
      popular: false,
      features: [
        "Lifetime free",
        "Up to 3 users",
        "Unlimited Pages",
        "Astro Sub domain",
        "Basic Integrations",
        "Community Support"
      ],
      button: {
        text: "Get Started",
        link: "/"
      }
    },
    {
      name: "Startup",
      price: {
        monthly: "$19",
        annual: "$16",
        discount: "10%",
        original: "$24"
      },
      popular: true,
      features: [
        "All Free Features",
        "Up to 20 users",
        "20 Custom domains",
        "Unlimited Collaborators",
        "Advanced Integrations",
        "Priority Support"
      ],
      button: {
        text: "Get Started",
        link: "#"
      }
    },
    {
      name: "Enterprise",
      price: "Custom",
      popular: false,
      features: [
        "All Pro Features",
        "Unlimited Custom domains",
        "99.99% Uptime SLA",
        "SAML & SSO Integration",
        "Dedicated Account Manager",
        "24/7 Phone Support"
      ],
      button: {
        text: "Contact us",
        link: "/contact"
      }
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pricing" }, { "default": () => renderTemplate`${renderComponent($$result, "Container", $$Container, {}, { "default": () => renderTemplate`${renderComponent($$result, "Sectionhead", $$Sectionhead, {}, { "desc": () => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "slot": "desc" }, { "default": () => renderTemplate`Simple & Predictable pricing. No Surprises.` })}`, "title": () => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "slot": "title" }, { "default": () => renderTemplate`Pricing` })}` })}${maybeRenderHead($$result)}<div class="grid md:grid-cols-3 gap-10 mx-auto max-w-screen-lg mt-12">
      ${pricing.map((item) => renderTemplate`${renderComponent($$result, "Pricing", $$Pricing$1, { "plan": item })}`)}
    </div>` })}` })}`;
}, "C:/code/dreamoment/website/src/pages/pricing.astro");

const $$file$3 = "C:/code/dreamoment/website/src/pages/pricing.astro";
const $$url$3 = "/docs/pricing";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pricing,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro("C:/code/dreamoment/website/src/pages/about.astro", "", "file:///C:/code/dreamoment/website/");
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$About;
  const TeamImg1 = "https://source.unsplash.com/IF9TK5Uy-KI";
  const TeamImg2 = "https://source.unsplash.com/iEEBWgY_6lA";
  const TeamImg3 = "https://source.unsplash.com/ZHvM3XIOHoE";
  const team = [
    {
      name: "Janette Lynch",
      title: "Senior Director",
      avatar: {
        src: TeamImg1,
        width: 480,
        height: 560
      }
    },
    {
      name: "Marcell Ziemann",
      title: "Principal Strategist",
      avatar: {
        src: TeamImg2,
        width: 580,
        height: 580
      }
    },
    {
      name: "Robert Palmer",
      title: "Marketing Engineer",
      avatar: {
        src: TeamImg3,
        width: 580,
        height: 580
      }
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "About" }, { "default": () => renderTemplate`${renderComponent($$result, "Container", $$Container, {}, { "default": () => renderTemplate`${renderComponent($$result, "Sectionhead", $$Sectionhead, {}, { "desc": () => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "slot": "desc" }, { "default": () => renderTemplate`We are a small passionate team.` })}`, "title": () => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "slot": "title" }, { "default": () => renderTemplate`About` })}` })}${maybeRenderHead($$result)}<div class="flex flex-col gap-3 mx-auto max-w-4xl mt-16">
      <h2 class="font-bold text-3xl text-gray-800">
        Empowering the world with Astro.
      </h2>
      <p class="text-lg leading-relaxed text-slate-500">
        We're a multi-cultural team from around the world! We come from diverse
        backgrounds, bringing different personalities, experiences and skills to
        the job. This is what makes our team so special.
      </p>
    </div><div class="grid md:grid-cols-3 gap-10 mx-auto max-w-4xl mt-12">
      ${team.map((item) => renderTemplate`<div class="group">
            <div class="w-full aspect-square">
              ${renderComponent($$result, "Image", $$Image, { ...item.avatar, "format": "avif", "alt": "Team", "class": "w-full h-full object-cover rounded transition  group-hover:-translate-y-1 group-hover:shadow-xl" })}
            </div>

            <div class="mt-4 text-center">
              <h2 class="text-lg text-gray-800"> ${item.name}</h2>
              <h3 class="text-sm text-slate-500"> ${item.title}</h3>
            </div>
          </div>`)}
    </div>` })}` })}`;
}, "C:/code/dreamoment/website/src/pages/about.astro");

const $$file$2 = "C:/code/dreamoment/website/src/pages/about.astro";
const $$url$2 = "/docs/about";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

/** */
const getFormattedDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

const $$Astro$1 = createAstro("C:/code/dreamoment/website/src/layouts/BlogLayout.astro", "", "file:///C:/code/dreamoment/website/");
const $$BlogLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogLayout;
  const { frontmatter } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": frontmatter.title }, { "default": () => renderTemplate`${renderComponent($$result, "Container", $$Container, {}, { "default": () => renderTemplate`${maybeRenderHead($$result)}<div class="mx-auto max-w-[735px] mt-14">
      <span class="text-blue-400 uppercase tracking-wider text-sm font-medium">
        ${frontmatter.category}
      </span>
      <h1 class="text-4xl lg:text-5xl font-bold lg:tracking-tight mt-1 lg:leading-tight">
        ${frontmatter.title}
      </h1>
      <div class="flex gap-2 mt-3 items-center">
        <span class="text-gray-400">
          ${frontmatter.author}
        </span>
        <span class="text-gray-400">•</span>
        <time class="text-gray-400"${addAttribute(frontmatter.publishDate, "datetime")}>
          ${getFormattedDate(frontmatter.publishDate)}
        </time>
        <span class="text-gray-400">•</span>
        <div class="flex gap-3">
          ${frontmatter.tags.map((tag) => renderTemplate`<span class="text-sm text-gray-500">#${tag}</span>`)}
        </div>
      </div>
    </div><div class="mx-auto prose prose-lg mt-6">
      ${renderSlot($$result, $$slots["default"])}
    </div><div class="text-center mt-8">
      <a href="/blog" class="bg-gray-100 px-5 py-3 rounded-md hover:bg-gray-200 transition">← Back to Blog</a>
    </div>` })}` })}`;
}, "C:/code/dreamoment/website/src/layouts/BlogLayout.astro");

const $$file$1 = "C:/code/dreamoment/website/src/layouts/BlogLayout.astro";
const $$url$1 = undefined;

const BlogLayout = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$BlogLayout,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const html$2 = "<p>Lorem ipsum dolor sit amet consectetur adipiscing elit euismod rutrum, consequat fringilla ultricies nullam curae mollis semper conubia viverra, orci aenean dapibus pharetra nec tortor tellus cubilia. Ullamcorper mi lectus eu malesuada tempor massa praesent magna mattis posuere, lobortis vulputate ut duis magnis parturient habitant nibh id tristique, quis suspendisse donec nisl penatibus sem non feugiat taciti. Mollis per ridiculus integer cursus semper vestibulum fermentum penatibus cubilia blandit scelerisque, tempus platea leo posuere ac pharetra volutpat aliquet euismod id ullamcorper lobortis, urna est magna mus rhoncus massa curae libero praesent eget. Mattis malesuada vestibulum quis ac nam phasellus suscipit facilisis libero diam posuere, cursus massa vehicula neque imperdiet tincidunt dui egestas lacinia mollis aliquet orci, nisl curabitur dapibus litora dis cum nostra montes ligula praesent. Facilisi aliquam convallis molestie tempor blandit ultricies bibendum parturient cubilia quam, porttitor morbi torquent tempus taciti nec faucibus elementum phasellus, quis inceptos vestibulum gravida augue potenti eget nunc maecenas. Tempor facilisis ligula volutpat habitant consequat inceptos orci per potenti blandit platea, mus sapien eget vel libero vestibulum augue cubilia ut ultrices fringilla lectus, imperdiet pellentesque cum ridiculus convallis sollicitudin nisl interdum semper felis.</p>\n<p>Ornare cum cursus laoreet sagittis nunc fusce posuere per euismod dis vehicula a, semper fames lacus maecenas dictumst pulvinar neque enim non potenti. Torquent hac sociosqu eleifend potenti augue nulla vivamus senectus odio, quisque curabitur enim consequat class sociis feugiat ullamcorper, felis dis imperdiet cubilia commodo sed massa phasellus. Viverra purus mus nisi condimentum dui vehicula facilisis turpis, habitant nascetur lectus tempor quisque habitasse urna scelerisque, nibh nullam vestibulum luctus aenean mollis metus. Suscipit gravida duis nec aliquet natoque molestie a ridiculus scelerisque cum, justo cursus sapien sodales purus dignissim vel facilisi magnis, inceptos rutrum ut integer auctor commodo sollicitudin fames et. Faucibus ligula nibh sagittis mauris auctor posuere habitant, scelerisque phasellus accumsan egestas gravida viverra nam, sed etiam eleifend proin massa dictumst. Porttitor risus luctus per aenean tellus primis fringilla vitae fames lacinia mauris metus, nec pulvinar quisque commodo sodales ac nibh natoque phasellus semper placerat. Lectus aenean potenti leo sollicitudin tristique eros quam ligula, vestibulum diam consequat enim torquent nec tempus, blandit viverra dapibus eleifend dis nunc nascetur.</p>\n<h2 id=\"sodales-hendrerit-malesuada-et-vestibulum\">Sodales hendrerit malesuada et vestibulum</h2>\n<ul>\n<li>\n<p>Luctus euismod pretium nisi et, est dui enim.</p>\n</li>\n<li>\n<p>Curae eget inceptos malesuada, fermentum class.</p>\n</li>\n<li>\n<p>Porttitor vestibulum aliquam porta feugiat velit, potenti eu placerat.</p>\n</li>\n<li>\n<p>Ligula lacus tempus ac porta, vel litora.</p>\n</li>\n</ul>\n<p>Torquent non nisi lacinia faucibus nibh tortor taciti commodo porttitor, mus hendrerit id leo scelerisque mollis habitasse orci tristique aptent, lacus at molestie cubilia facilisis porta accumsan condimentum. Metus lacus suscipit porttitor integer facilisi torquent, nostra nulla platea at natoque varius venenatis, id quam pharetra aliquam leo. Dictum orci himenaeos quam mi fusce lacinia maecenas ac magna eleifend laoreet, vivamus enim curabitur ullamcorper est ultrices convallis suscipit nascetur. Ornare fames pretium ante ac eget nisi tellus vivamus, convallis mauris sapien imperdiet sollicitudin aliquet taciti quam, lacinia tempor primis magna iaculis at eu. Est facilisi proin risus eleifend orci torquent ultricies platea, quisque nullam vel porttitor euismod sociis non, maecenas sociosqu interdum arcu sed pharetra potenti. Aliquet risus tempus hendrerit sapien tellus eget cursus enim etiam dui, lobortis nostra pellentesque odio posuere morbi ad neque senectus arcu eu, turpis proin ac felis purus fames magnis dis dignissim.</p>\n<p>Orci volutpat augue viverra scelerisque dictumst ut condimentum vivamus, accumsan cum sem sollicitudin aliquet vehicula porta pretium placerat, malesuada euismod primis cubilia rutrum tempus parturient. Urna mauris in nibh morbi hendrerit vulputate condimentum, iaculis consequat porttitor dui dis euismod eros, arcu elementum venenatis varius lectus nisi. Nibh arcu ultrices semper morbi quam aptent quisque porta posuere iaculis, vestibulum cum vitae primis varius natoque conubia eu. Placerat sociis sagittis sociosqu morbi purus lobortis convallis, bibendum tortor ridiculus orci habitasse viverra dictum, quis rutrum fusce potenti volutpat vehicula. Curae porta inceptos lectus mus urna litora semper aliquam libero rutrum sem dui maecenas ligula quis, eget risus non imperdiet cum morbi magnis suspendisse etiam augue porttitor placerat facilisi hendrerit. Et eleifend eget augue duis fringilla sagittis erat est habitasse commodo tristique quisque pretium, suspendisse imperdiet inceptos mollis blandit magna mus elementum molestie sed vestibulum. Euismod morbi hendrerit suscipit felis ornare libero ligula, mus tortor urna interdum blandit nisi netus posuere, purus fermentum magnis nam primis nulla.</p>\n<h2 id=\"elementum-nisi-urna-cursus-nisl-quam-ante-tristique-blandit-ultricies-eget\">Elementum nisi urna cursus nisl quam ante tristique blandit ultricies eget</h2>\n<p>Netus at rutrum taciti vestibulum molestie conubia semper class potenti lobortis, hendrerit donec vitae ad libero natoque parturient litora congue. Torquent rhoncus odio cursus iaculis molestie arcu leo condimentum accumsan, laoreet congue duis libero justo tortor commodo fusce, massa eros hac euismod netus sodales mi magnis. Aenean nullam sollicitudin ad velit nulla venenatis suspendisse iaculis, aliquet senectus mollis aptent fringilla volutpat nascetur, nec urna vehicula lacinia neque augue orci. Suspendisse et eleifend convallis sollicitudin posuere diam turpis gravida congue ultrices, laoreet ultricies dapibus proin facilisis magna class praesent fusce. Mus morbi magnis ultricies sed turpis ultrices tempus tortor bibendum, netus nulla viverra torquent malesuada ridiculus tempor. Parturient sociosqu erat ullamcorper gravida natoque varius, etiam habitant augue praesent per curabitur iaculis, donec pellentesque cursus suscipit aliquet. Congue curae cursus scelerisque pellentesque quis fusce arcu eros dictumst luctus ridiculus nisl viverra, turpis class faucibus phasellus feugiat eleifend fringilla orci tristique habitasse conubia quam. Habitasse montes congue sodales rutrum cras torquent cursus auctor condimentum imperdiet egestas nascetur, platea tincidunt ut sollicitudin purus libero lobortis ad nisi diam quam.</p>\n<p>Suspendisse et eleifend convallis sollicitudin posuere diam turpis gravida congue ultrices, laoreet ultricies dapibus proin facilisis magna class praesent fusce. Mus morbi magnis ultricies sed turpis ultrices tempus tortor bibendum, netus nulla viverra torquent malesuada ridiculus tempor. Parturient sociosqu erat ullamcorper gravida natoque varius, etiam habitant augue praesent per curabitur iaculis, donec pellentesque cursus suscipit aliquet. Congue curae cursus scelerisque pellentesque quis fusce arcu eros dictumst luctus ridiculus nisl viverra, turpis class faucibus phasellus feugiat eleifend fringilla orci tristique habitasse conubia quam. Habitasse montes congue sodales rutrum cras torquent cursus auctor condimentum imperdiet egestas nascetur.</p>";

				const _internal$2 = {
					injectedFrontmatter: {},
				};
				const frontmatter$3 = {"title":"The Complete Guide to Full Stack Web Development","excerpt":"Ornare cum cursus laoreet sagittis nunc fusce posuere per euismod dis vehicula a, semper fames lacus maecenas dictumst pulvinar neque enim non potenti. Torquent hac sociosqu eleifend potenti.","publishDate":"2022-11-08T11:39:36.050Z","image":"https://source.unsplash.com/eYpcLDXHVb0","category":"Tutorials","author":"Janette Lynch","layout":"@layouts/BlogLayout.astro","tags":["webdev","tailwindcss","frontend"]};
				const file$3 = "C:/code/dreamoment/website/src/pages/blog/complete-guide-fullstack-development.md";
				const url$3 = "/docs/blog/complete-guide-fullstack-development";
				function rawContent$3() {
					return "\nLorem ipsum dolor sit amet consectetur adipiscing elit euismod rutrum, consequat fringilla ultricies nullam curae mollis semper conubia viverra, orci aenean dapibus pharetra nec tortor tellus cubilia. Ullamcorper mi lectus eu malesuada tempor massa praesent magna mattis posuere, lobortis vulputate ut duis magnis parturient habitant nibh id tristique, quis suspendisse donec nisl penatibus sem non feugiat taciti. Mollis per ridiculus integer cursus semper vestibulum fermentum penatibus cubilia blandit scelerisque, tempus platea leo posuere ac pharetra volutpat aliquet euismod id ullamcorper lobortis, urna est magna mus rhoncus massa curae libero praesent eget. Mattis malesuada vestibulum quis ac nam phasellus suscipit facilisis libero diam posuere, cursus massa vehicula neque imperdiet tincidunt dui egestas lacinia mollis aliquet orci, nisl curabitur dapibus litora dis cum nostra montes ligula praesent. Facilisi aliquam convallis molestie tempor blandit ultricies bibendum parturient cubilia quam, porttitor morbi torquent tempus taciti nec faucibus elementum phasellus, quis inceptos vestibulum gravida augue potenti eget nunc maecenas. Tempor facilisis ligula volutpat habitant consequat inceptos orci per potenti blandit platea, mus sapien eget vel libero vestibulum augue cubilia ut ultrices fringilla lectus, imperdiet pellentesque cum ridiculus convallis sollicitudin nisl interdum semper felis.\n\nOrnare cum cursus laoreet sagittis nunc fusce posuere per euismod dis vehicula a, semper fames lacus maecenas dictumst pulvinar neque enim non potenti. Torquent hac sociosqu eleifend potenti augue nulla vivamus senectus odio, quisque curabitur enim consequat class sociis feugiat ullamcorper, felis dis imperdiet cubilia commodo sed massa phasellus. Viverra purus mus nisi condimentum dui vehicula facilisis turpis, habitant nascetur lectus tempor quisque habitasse urna scelerisque, nibh nullam vestibulum luctus aenean mollis metus. Suscipit gravida duis nec aliquet natoque molestie a ridiculus scelerisque cum, justo cursus sapien sodales purus dignissim vel facilisi magnis, inceptos rutrum ut integer auctor commodo sollicitudin fames et. Faucibus ligula nibh sagittis mauris auctor posuere habitant, scelerisque phasellus accumsan egestas gravida viverra nam, sed etiam eleifend proin massa dictumst. Porttitor risus luctus per aenean tellus primis fringilla vitae fames lacinia mauris metus, nec pulvinar quisque commodo sodales ac nibh natoque phasellus semper placerat. Lectus aenean potenti leo sollicitudin tristique eros quam ligula, vestibulum diam consequat enim torquent nec tempus, blandit viverra dapibus eleifend dis nunc nascetur.\n\n## Sodales hendrerit malesuada et vestibulum\n\n- Luctus euismod pretium nisi et, est dui enim.\n\n- Curae eget inceptos malesuada, fermentum class.\n\n- Porttitor vestibulum aliquam porta feugiat velit, potenti eu placerat.\n\n- Ligula lacus tempus ac porta, vel litora.\n\nTorquent non nisi lacinia faucibus nibh tortor taciti commodo porttitor, mus hendrerit id leo scelerisque mollis habitasse orci tristique aptent, lacus at molestie cubilia facilisis porta accumsan condimentum. Metus lacus suscipit porttitor integer facilisi torquent, nostra nulla platea at natoque varius venenatis, id quam pharetra aliquam leo. Dictum orci himenaeos quam mi fusce lacinia maecenas ac magna eleifend laoreet, vivamus enim curabitur ullamcorper est ultrices convallis suscipit nascetur. Ornare fames pretium ante ac eget nisi tellus vivamus, convallis mauris sapien imperdiet sollicitudin aliquet taciti quam, lacinia tempor primis magna iaculis at eu. Est facilisi proin risus eleifend orci torquent ultricies platea, quisque nullam vel porttitor euismod sociis non, maecenas sociosqu interdum arcu sed pharetra potenti. Aliquet risus tempus hendrerit sapien tellus eget cursus enim etiam dui, lobortis nostra pellentesque odio posuere morbi ad neque senectus arcu eu, turpis proin ac felis purus fames magnis dis dignissim.\n\nOrci volutpat augue viverra scelerisque dictumst ut condimentum vivamus, accumsan cum sem sollicitudin aliquet vehicula porta pretium placerat, malesuada euismod primis cubilia rutrum tempus parturient. Urna mauris in nibh morbi hendrerit vulputate condimentum, iaculis consequat porttitor dui dis euismod eros, arcu elementum venenatis varius lectus nisi. Nibh arcu ultrices semper morbi quam aptent quisque porta posuere iaculis, vestibulum cum vitae primis varius natoque conubia eu. Placerat sociis sagittis sociosqu morbi purus lobortis convallis, bibendum tortor ridiculus orci habitasse viverra dictum, quis rutrum fusce potenti volutpat vehicula. Curae porta inceptos lectus mus urna litora semper aliquam libero rutrum sem dui maecenas ligula quis, eget risus non imperdiet cum morbi magnis suspendisse etiam augue porttitor placerat facilisi hendrerit. Et eleifend eget augue duis fringilla sagittis erat est habitasse commodo tristique quisque pretium, suspendisse imperdiet inceptos mollis blandit magna mus elementum molestie sed vestibulum. Euismod morbi hendrerit suscipit felis ornare libero ligula, mus tortor urna interdum blandit nisi netus posuere, purus fermentum magnis nam primis nulla.\n\n## Elementum nisi urna cursus nisl quam ante tristique blandit ultricies eget\n\nNetus at rutrum taciti vestibulum molestie conubia semper class potenti lobortis, hendrerit donec vitae ad libero natoque parturient litora congue. Torquent rhoncus odio cursus iaculis molestie arcu leo condimentum accumsan, laoreet congue duis libero justo tortor commodo fusce, massa eros hac euismod netus sodales mi magnis. Aenean nullam sollicitudin ad velit nulla venenatis suspendisse iaculis, aliquet senectus mollis aptent fringilla volutpat nascetur, nec urna vehicula lacinia neque augue orci. Suspendisse et eleifend convallis sollicitudin posuere diam turpis gravida congue ultrices, laoreet ultricies dapibus proin facilisis magna class praesent fusce. Mus morbi magnis ultricies sed turpis ultrices tempus tortor bibendum, netus nulla viverra torquent malesuada ridiculus tempor. Parturient sociosqu erat ullamcorper gravida natoque varius, etiam habitant augue praesent per curabitur iaculis, donec pellentesque cursus suscipit aliquet. Congue curae cursus scelerisque pellentesque quis fusce arcu eros dictumst luctus ridiculus nisl viverra, turpis class faucibus phasellus feugiat eleifend fringilla orci tristique habitasse conubia quam. Habitasse montes congue sodales rutrum cras torquent cursus auctor condimentum imperdiet egestas nascetur, platea tincidunt ut sollicitudin purus libero lobortis ad nisi diam quam.\n\nSuspendisse et eleifend convallis sollicitudin posuere diam turpis gravida congue ultrices, laoreet ultricies dapibus proin facilisis magna class praesent fusce. Mus morbi magnis ultricies sed turpis ultrices tempus tortor bibendum, netus nulla viverra torquent malesuada ridiculus tempor. Parturient sociosqu erat ullamcorper gravida natoque varius, etiam habitant augue praesent per curabitur iaculis, donec pellentesque cursus suscipit aliquet. Congue curae cursus scelerisque pellentesque quis fusce arcu eros dictumst luctus ridiculus nisl viverra, turpis class faucibus phasellus feugiat eleifend fringilla orci tristique habitasse conubia quam. Habitasse montes congue sodales rutrum cras torquent cursus auctor condimentum imperdiet egestas nascetur.\n";
				}
				function compiledContent$3() {
					return html$2;
				}
				function getHeadings$3() {
					return [{"depth":2,"slug":"sodales-hendrerit-malesuada-et-vestibulum","text":"Sodales hendrerit malesuada et vestibulum"},{"depth":2,"slug":"elementum-nisi-urna-cursus-nisl-quam-ante-tristique-blandit-ultricies-eget","text":"Elementum nisi urna cursus nisl quam ante tristique blandit ultricies eget"}];
				}
				function getHeaders$2() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$3();
				}				async function Content$3() {
					const { layout, ...content } = frontmatter$3;
					content.file = file$3;
					content.url = url$3;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$2 });
					return createVNode($$BlogLayout, {
									file: file$3,
									url: url$3,
									content,
									frontmatter: content,
									headings: getHeadings$3(),
									rawContent: rawContent$3,
									compiledContent: compiledContent$3,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$3[Symbol.for('astro.needsHeadRendering')] = false;

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  _internal: _internal$2,
  frontmatter: frontmatter$3,
  file: file$3,
  url: url$3,
  rawContent: rawContent$3,
  compiledContent: compiledContent$3,
  getHeadings: getHeadings$3,
  getHeaders: getHeaders$2,
  Content: Content$3,
  default: Content$3
}, Symbol.toStringTag, { value: 'Module' }));

const html$1 = "<p>Lorem ipsum dolor sit amet consectetur adipiscing elit euismod rutrum, consequat fringilla ultricies nullam curae mollis semper conubia viverra, orci aenean dapibus pharetra nec tortor tellus cubilia. Ullamcorper mi lectus eu malesuada tempor massa praesent magna mattis posuere, lobortis vulputate ut duis magnis parturient habitant nibh id tristique, quis suspendisse donec nisl penatibus sem non feugiat taciti. Mollis per ridiculus integer cursus semper vestibulum fermentum penatibus cubilia blandit scelerisque, tempus platea leo posuere ac pharetra volutpat aliquet euismod id ullamcorper lobortis, urna est magna mus rhoncus massa curae libero praesent eget. Mattis malesuada vestibulum quis ac nam phasellus suscipit facilisis libero diam posuere, cursus massa vehicula neque imperdiet tincidunt dui egestas lacinia mollis aliquet orci, nisl curabitur dapibus litora dis cum nostra montes ligula praesent. Facilisi aliquam convallis molestie tempor blandit ultricies bibendum parturient cubilia quam, porttitor morbi torquent tempus taciti nec faucibus elementum phasellus, quis inceptos vestibulum gravida augue potenti eget nunc maecenas. Tempor facilisis ligula volutpat habitant consequat inceptos orci per potenti blandit platea, mus sapien eget vel libero vestibulum augue cubilia ut ultrices fringilla lectus, imperdiet pellentesque cum ridiculus convallis sollicitudin nisl interdum semper felis.</p>\n<p>Ornare cum cursus laoreet sagittis nunc fusce posuere per euismod dis vehicula a, semper fames lacus maecenas dictumst pulvinar neque enim non potenti. Torquent hac sociosqu eleifend potenti augue nulla vivamus senectus odio, quisque curabitur enim consequat class sociis feugiat ullamcorper, felis dis imperdiet cubilia commodo sed massa phasellus. Viverra purus mus nisi condimentum dui vehicula facilisis turpis, habitant nascetur lectus tempor quisque habitasse urna scelerisque, nibh nullam vestibulum luctus aenean mollis metus. Suscipit gravida duis nec aliquet natoque molestie a ridiculus scelerisque cum, justo cursus sapien sodales purus dignissim vel facilisi magnis, inceptos rutrum ut integer auctor commodo sollicitudin fames et. Faucibus ligula nibh sagittis mauris auctor posuere habitant, scelerisque phasellus accumsan egestas gravida viverra nam, sed etiam eleifend proin massa dictumst. Porttitor risus luctus per aenean tellus primis fringilla vitae fames lacinia mauris metus, nec pulvinar quisque commodo sodales ac nibh natoque phasellus semper placerat. Lectus aenean potenti leo sollicitudin tristique eros quam ligula, vestibulum diam consequat enim torquent nec tempus, blandit viverra dapibus eleifend dis nunc nascetur.</p>\n<h2 id=\"sodales-hendrerit-malesuada-et-vestibulum\">Sodales hendrerit malesuada et vestibulum</h2>\n<ul>\n<li>\n<p>Luctus euismod pretium nisi et, est dui enim.</p>\n</li>\n<li>\n<p>Curae eget inceptos malesuada, fermentum class.</p>\n</li>\n<li>\n<p>Porttitor vestibulum aliquam porta feugiat velit, potenti eu placerat.</p>\n</li>\n<li>\n<p>Ligula lacus tempus ac porta, vel litora.</p>\n</li>\n</ul>\n<p>Torquent non nisi lacinia faucibus nibh tortor taciti commodo porttitor, mus hendrerit id leo scelerisque mollis habitasse orci tristique aptent, lacus at molestie cubilia facilisis porta accumsan condimentum. Metus lacus suscipit porttitor integer facilisi torquent, nostra nulla platea at natoque varius venenatis, id quam pharetra aliquam leo. Dictum orci himenaeos quam mi fusce lacinia maecenas ac magna eleifend laoreet, vivamus enim curabitur ullamcorper est ultrices convallis suscipit nascetur. Ornare fames pretium ante ac eget nisi tellus vivamus, convallis mauris sapien imperdiet sollicitudin aliquet taciti quam, lacinia tempor primis magna iaculis at eu. Est facilisi proin risus eleifend orci torquent ultricies platea, quisque nullam vel porttitor euismod sociis non, maecenas sociosqu interdum arcu sed pharetra potenti. Aliquet risus tempus hendrerit sapien tellus eget cursus enim etiam dui, lobortis nostra pellentesque odio posuere morbi ad neque senectus arcu eu, turpis proin ac felis purus fames magnis dis dignissim.</p>\n<p>Orci volutpat augue viverra scelerisque dictumst ut condimentum vivamus, accumsan cum sem sollicitudin aliquet vehicula porta pretium placerat, malesuada euismod primis cubilia rutrum tempus parturient. Urna mauris in nibh morbi hendrerit vulputate condimentum, iaculis consequat porttitor dui dis euismod eros, arcu elementum venenatis varius lectus nisi. Nibh arcu ultrices semper morbi quam aptent quisque porta posuere iaculis, vestibulum cum vitae primis varius natoque conubia eu. Placerat sociis sagittis sociosqu morbi purus lobortis convallis, bibendum tortor ridiculus orci habitasse viverra dictum, quis rutrum fusce potenti volutpat vehicula. Curae porta inceptos lectus mus urna litora semper aliquam libero rutrum sem dui maecenas ligula quis, eget risus non imperdiet cum morbi magnis suspendisse etiam augue porttitor placerat facilisi hendrerit. Et eleifend eget augue duis fringilla sagittis erat est habitasse commodo tristique quisque pretium, suspendisse imperdiet inceptos mollis blandit magna mus elementum molestie sed vestibulum. Euismod morbi hendrerit suscipit felis ornare libero ligula, mus tortor urna interdum blandit nisi netus posuere, purus fermentum magnis nam primis nulla.</p>\n<h2 id=\"elementum-nisi-urna-cursus-nisl-quam-ante-tristique-blandit-ultricies-eget\">Elementum nisi urna cursus nisl quam ante tristique blandit ultricies eget</h2>\n<p>Netus at rutrum taciti vestibulum molestie conubia semper class potenti lobortis, hendrerit donec vitae ad libero natoque parturient litora congue. Torquent rhoncus odio cursus iaculis molestie arcu leo condimentum accumsan, laoreet congue duis libero justo tortor commodo fusce, massa eros hac euismod netus sodales mi magnis. Aenean nullam sollicitudin ad velit nulla venenatis suspendisse iaculis, aliquet senectus mollis aptent fringilla volutpat nascetur, nec urna vehicula lacinia neque augue orci. Suspendisse et eleifend convallis sollicitudin posuere diam turpis gravida congue ultrices, laoreet ultricies dapibus proin facilisis magna class praesent fusce. Mus morbi magnis ultricies sed turpis ultrices tempus tortor bibendum, netus nulla viverra torquent malesuada ridiculus tempor. Parturient sociosqu erat ullamcorper gravida natoque varius, etiam habitant augue praesent per curabitur iaculis, donec pellentesque cursus suscipit aliquet. Congue curae cursus scelerisque pellentesque quis fusce arcu eros dictumst luctus ridiculus nisl viverra, turpis class faucibus phasellus feugiat eleifend fringilla orci tristique habitasse conubia quam. Habitasse montes congue sodales rutrum cras torquent cursus auctor condimentum imperdiet egestas nascetur, platea tincidunt ut sollicitudin purus libero lobortis ad nisi diam quam.</p>\n<p>Suspendisse et eleifend convallis sollicitudin posuere diam turpis gravida congue ultrices, laoreet ultricies dapibus proin facilisis magna class praesent fusce. Mus morbi magnis ultricies sed turpis ultrices tempus tortor bibendum, netus nulla viverra torquent malesuada ridiculus tempor. Parturient sociosqu erat ullamcorper gravida natoque varius, etiam habitant augue praesent per curabitur iaculis, donec pellentesque cursus suscipit aliquet. Congue curae cursus scelerisque pellentesque quis fusce arcu eros dictumst luctus ridiculus nisl viverra, turpis class faucibus phasellus feugiat eleifend fringilla orci tristique habitasse conubia quam. Habitasse montes congue sodales rutrum cras torquent cursus auctor condimentum imperdiet egestas nascetur.</p>";

				const _internal$1 = {
					injectedFrontmatter: {},
				};
				const frontmatter$2 = {"title":" Introduction to the Essential Data Structures & Algorithms","excerpt":"Ornare cum cursus laoreet sagittis nunc fusce posuere per euismod dis vehicula a, semper fames lacus maecenas dictumst pulvinar neque enim non potenti. Torquent hac sociosqu eleifend potenti.","publishDate":"2022-11-09T16:39:36.050Z","image":"https://source.unsplash.com/R5A_YlcSJwA","category":"Courses","author":"Marcell Ziemann","layout":"@layouts/BlogLayout.astro","tags":["webdev","tailwindcss","frontend"]};
				const file$2 = "C:/code/dreamoment/website/src/pages/blog/essential-data-structures-algorithms.md";
				const url$2 = "/docs/blog/essential-data-structures-algorithms";
				function rawContent$2() {
					return "\nLorem ipsum dolor sit amet consectetur adipiscing elit euismod rutrum, consequat fringilla ultricies nullam curae mollis semper conubia viverra, orci aenean dapibus pharetra nec tortor tellus cubilia. Ullamcorper mi lectus eu malesuada tempor massa praesent magna mattis posuere, lobortis vulputate ut duis magnis parturient habitant nibh id tristique, quis suspendisse donec nisl penatibus sem non feugiat taciti. Mollis per ridiculus integer cursus semper vestibulum fermentum penatibus cubilia blandit scelerisque, tempus platea leo posuere ac pharetra volutpat aliquet euismod id ullamcorper lobortis, urna est magna mus rhoncus massa curae libero praesent eget. Mattis malesuada vestibulum quis ac nam phasellus suscipit facilisis libero diam posuere, cursus massa vehicula neque imperdiet tincidunt dui egestas lacinia mollis aliquet orci, nisl curabitur dapibus litora dis cum nostra montes ligula praesent. Facilisi aliquam convallis molestie tempor blandit ultricies bibendum parturient cubilia quam, porttitor morbi torquent tempus taciti nec faucibus elementum phasellus, quis inceptos vestibulum gravida augue potenti eget nunc maecenas. Tempor facilisis ligula volutpat habitant consequat inceptos orci per potenti blandit platea, mus sapien eget vel libero vestibulum augue cubilia ut ultrices fringilla lectus, imperdiet pellentesque cum ridiculus convallis sollicitudin nisl interdum semper felis.\n\nOrnare cum cursus laoreet sagittis nunc fusce posuere per euismod dis vehicula a, semper fames lacus maecenas dictumst pulvinar neque enim non potenti. Torquent hac sociosqu eleifend potenti augue nulla vivamus senectus odio, quisque curabitur enim consequat class sociis feugiat ullamcorper, felis dis imperdiet cubilia commodo sed massa phasellus. Viverra purus mus nisi condimentum dui vehicula facilisis turpis, habitant nascetur lectus tempor quisque habitasse urna scelerisque, nibh nullam vestibulum luctus aenean mollis metus. Suscipit gravida duis nec aliquet natoque molestie a ridiculus scelerisque cum, justo cursus sapien sodales purus dignissim vel facilisi magnis, inceptos rutrum ut integer auctor commodo sollicitudin fames et. Faucibus ligula nibh sagittis mauris auctor posuere habitant, scelerisque phasellus accumsan egestas gravida viverra nam, sed etiam eleifend proin massa dictumst. Porttitor risus luctus per aenean tellus primis fringilla vitae fames lacinia mauris metus, nec pulvinar quisque commodo sodales ac nibh natoque phasellus semper placerat. Lectus aenean potenti leo sollicitudin tristique eros quam ligula, vestibulum diam consequat enim torquent nec tempus, blandit viverra dapibus eleifend dis nunc nascetur.\n\n## Sodales hendrerit malesuada et vestibulum\n\n- Luctus euismod pretium nisi et, est dui enim.\n\n- Curae eget inceptos malesuada, fermentum class.\n\n- Porttitor vestibulum aliquam porta feugiat velit, potenti eu placerat.\n\n- Ligula lacus tempus ac porta, vel litora.\n\nTorquent non nisi lacinia faucibus nibh tortor taciti commodo porttitor, mus hendrerit id leo scelerisque mollis habitasse orci tristique aptent, lacus at molestie cubilia facilisis porta accumsan condimentum. Metus lacus suscipit porttitor integer facilisi torquent, nostra nulla platea at natoque varius venenatis, id quam pharetra aliquam leo. Dictum orci himenaeos quam mi fusce lacinia maecenas ac magna eleifend laoreet, vivamus enim curabitur ullamcorper est ultrices convallis suscipit nascetur. Ornare fames pretium ante ac eget nisi tellus vivamus, convallis mauris sapien imperdiet sollicitudin aliquet taciti quam, lacinia tempor primis magna iaculis at eu. Est facilisi proin risus eleifend orci torquent ultricies platea, quisque nullam vel porttitor euismod sociis non, maecenas sociosqu interdum arcu sed pharetra potenti. Aliquet risus tempus hendrerit sapien tellus eget cursus enim etiam dui, lobortis nostra pellentesque odio posuere morbi ad neque senectus arcu eu, turpis proin ac felis purus fames magnis dis dignissim.\n\nOrci volutpat augue viverra scelerisque dictumst ut condimentum vivamus, accumsan cum sem sollicitudin aliquet vehicula porta pretium placerat, malesuada euismod primis cubilia rutrum tempus parturient. Urna mauris in nibh morbi hendrerit vulputate condimentum, iaculis consequat porttitor dui dis euismod eros, arcu elementum venenatis varius lectus nisi. Nibh arcu ultrices semper morbi quam aptent quisque porta posuere iaculis, vestibulum cum vitae primis varius natoque conubia eu. Placerat sociis sagittis sociosqu morbi purus lobortis convallis, bibendum tortor ridiculus orci habitasse viverra dictum, quis rutrum fusce potenti volutpat vehicula. Curae porta inceptos lectus mus urna litora semper aliquam libero rutrum sem dui maecenas ligula quis, eget risus non imperdiet cum morbi magnis suspendisse etiam augue porttitor placerat facilisi hendrerit. Et eleifend eget augue duis fringilla sagittis erat est habitasse commodo tristique quisque pretium, suspendisse imperdiet inceptos mollis blandit magna mus elementum molestie sed vestibulum. Euismod morbi hendrerit suscipit felis ornare libero ligula, mus tortor urna interdum blandit nisi netus posuere, purus fermentum magnis nam primis nulla.\n\n## Elementum nisi urna cursus nisl quam ante tristique blandit ultricies eget\n\nNetus at rutrum taciti vestibulum molestie conubia semper class potenti lobortis, hendrerit donec vitae ad libero natoque parturient litora congue. Torquent rhoncus odio cursus iaculis molestie arcu leo condimentum accumsan, laoreet congue duis libero justo tortor commodo fusce, massa eros hac euismod netus sodales mi magnis. Aenean nullam sollicitudin ad velit nulla venenatis suspendisse iaculis, aliquet senectus mollis aptent fringilla volutpat nascetur, nec urna vehicula lacinia neque augue orci. Suspendisse et eleifend convallis sollicitudin posuere diam turpis gravida congue ultrices, laoreet ultricies dapibus proin facilisis magna class praesent fusce. Mus morbi magnis ultricies sed turpis ultrices tempus tortor bibendum, netus nulla viverra torquent malesuada ridiculus tempor. Parturient sociosqu erat ullamcorper gravida natoque varius, etiam habitant augue praesent per curabitur iaculis, donec pellentesque cursus suscipit aliquet. Congue curae cursus scelerisque pellentesque quis fusce arcu eros dictumst luctus ridiculus nisl viverra, turpis class faucibus phasellus feugiat eleifend fringilla orci tristique habitasse conubia quam. Habitasse montes congue sodales rutrum cras torquent cursus auctor condimentum imperdiet egestas nascetur, platea tincidunt ut sollicitudin purus libero lobortis ad nisi diam quam.\n\nSuspendisse et eleifend convallis sollicitudin posuere diam turpis gravida congue ultrices, laoreet ultricies dapibus proin facilisis magna class praesent fusce. Mus morbi magnis ultricies sed turpis ultrices tempus tortor bibendum, netus nulla viverra torquent malesuada ridiculus tempor. Parturient sociosqu erat ullamcorper gravida natoque varius, etiam habitant augue praesent per curabitur iaculis, donec pellentesque cursus suscipit aliquet. Congue curae cursus scelerisque pellentesque quis fusce arcu eros dictumst luctus ridiculus nisl viverra, turpis class faucibus phasellus feugiat eleifend fringilla orci tristique habitasse conubia quam. Habitasse montes congue sodales rutrum cras torquent cursus auctor condimentum imperdiet egestas nascetur.\n";
				}
				function compiledContent$2() {
					return html$1;
				}
				function getHeadings$2() {
					return [{"depth":2,"slug":"sodales-hendrerit-malesuada-et-vestibulum","text":"Sodales hendrerit malesuada et vestibulum"},{"depth":2,"slug":"elementum-nisi-urna-cursus-nisl-quam-ante-tristique-blandit-ultricies-eget","text":"Elementum nisi urna cursus nisl quam ante tristique blandit ultricies eget"}];
				}
				function getHeaders$1() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$2();
				}				async function Content$2() {
					const { layout, ...content } = frontmatter$2;
					content.file = file$2;
					content.url = url$2;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$1 });
					return createVNode($$BlogLayout, {
									file: file$2,
									url: url$2,
									content,
									frontmatter: content,
									headings: getHeadings$2(),
									rawContent: rawContent$2,
									compiledContent: compiledContent$2,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$2[Symbol.for('astro.needsHeadRendering')] = false;

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  _internal: _internal$1,
  frontmatter: frontmatter$2,
  file: file$2,
  url: url$2,
  rawContent: rawContent$2,
  compiledContent: compiledContent$2,
  getHeadings: getHeadings$2,
  getHeaders: getHeaders$1,
  Content: Content$2,
  default: Content$2
}, Symbol.toStringTag, { value: 'Module' }));

const html = "<p>Whatever you do, it’s always beneficial to have the right tools at your disposal. I love working remotely and am a big advocate of doing remote software development. Therefore, I always strive to have the best equipment available to be as productive as possible. Writing posts like this constantly takes a lot of time. Luckily iVanky helped me out and sponsored this post so that I can concentrate on writing. I recently had the chance to test out one of their hottest products, a dual USB-C Docking Station that allows me to connect both my wide-screen monitors to my MacBook with Dual 4K@60Hz display connectivity. It also supports up to 96W laptop charging, which is awesome. If you are in a situation like me and want to upgrade your equipment, check out this and their other products! And now comes the article:</p>\n<p>Whether you are new to programming or already an experienced developer. In this industry, learning new concepts and languages/frameworks is\nmandatory to keep up with the rapid changes. Take for example React - open-sourced by Facebook just a shy 4 years ago it already became the number one choice for JavaScript devs around the globe. But also Vue and Angular, of course, have their legitimate follower-base. And then there is Svelte, and universal frameworks like Next.js or Nuxt.js, and Gatsby, and Gridsome, and Quasar, and and and. If you want to shine as an expert JavaScript developer you should at least have some experience in different frameworks and libraries - besides doing your homework with good, old JS.</p>\n<p>To help you become Frontend Masters, I have collected 9 different projects, each with a distinct topic and a different JavaScript framework or library as a tech stack that you can build and add to your portfolio. Remember, nothing helps you more than actually building stuff so go ahead, sharpen your mind and make this happen!</p>\n<h2 id=\"dictum-integer-fusce-ac-ridiculus\">Dictum integer fusce ac ridiculus</h2>\n<p>Lorem ipsum dolor sit amet consectetur adipiscing elit euismod rutrum, consequat fringilla ultricies nullam curae mollis semper conubia viverra, orci aenean dapibus pharetra nec tortor tellus cubilia. Ullamcorper mi lectus eu malesuada tempor massa praesent magna mattis posuere, lobortis vulputate ut duis magnis parturient habitant nibh id tristique, quis suspendisse donec nisl penatibus sem non feugiat taciti. Mollis per ridiculus integer cursus semper vestibulum fermentum penatibus cubilia blandit scelerisque, tempus platea leo posuere ac pharetra volutpat aliquet euismod id ullamcorper lobortis, urna est magna mus rhoncus massa curae libero praesent eget. Mattis malesuada vestibulum quis ac nam phasellus suscipit facilisis libero diam posuere, cursus massa vehicula neque imperdiet tincidunt dui egestas lacinia mollis aliquet orci, nisl curabitur dapibus litora dis cum nostra montes ligula praesent. Facilisi aliquam convallis molestie tempor blandit ultricies bibendum parturient cubilia quam, porttitor morbi torquent tempus taciti nec faucibus elementum phasellus, quis inceptos vestibulum gravida augue potenti eget nunc maecenas. Tempor facilisis ligula volutpat habitant consequat inceptos orci per potenti blandit platea, mus sapien eget vel libero vestibulum augue cubilia ut ultrices fringilla lectus, imperdiet pellentesque cum ridiculus convallis sollicitudin nisl interdum semper felis.</p>\n<p>Ornare cum cursus laoreet sagittis nunc fusce posuere per euismod dis vehicula a, semper fames lacus maecenas dictumst pulvinar neque enim non potenti. Torquent hac sociosqu eleifend potenti augue nulla vivamus senectus odio, quisque curabitur enim consequat class sociis feugiat ullamcorper, felis dis imperdiet cubilia commodo sed massa phasellus. Viverra purus mus nisi condimentum dui vehicula facilisis turpis, habitant nascetur lectus tempor quisque habitasse urna scelerisque, nibh nullam vestibulum luctus aenean mollis metus. Suscipit gravida duis nec aliquet natoque molestie a ridiculus scelerisque cum, justo cursus sapien sodales purus dignissim vel facilisi magnis, inceptos rutrum ut integer auctor commodo sollicitudin fames et. Faucibus ligula nibh sagittis mauris auctor posuere habitant, scelerisque phasellus accumsan egestas gravida viverra nam, sed etiam eleifend proin massa dictumst. Porttitor risus luctus per aenean tellus primis fringilla vitae fames lacinia mauris metus, nec pulvinar quisque commodo sodales ac nibh natoque phasellus semper placerat. Lectus aenean potenti leo sollicitudin tristique eros quam ligula, vestibulum diam consequat enim torquent nec tempus, blandit viverra dapibus eleifend dis nunc nascetur.</p>\n<h2 id=\"sodales-hendrerit-malesuada-et-vestibulum\">Sodales hendrerit malesuada et vestibulum</h2>\n<ul>\n<li>\n<p>Luctus euismod pretium nisi et, est dui enim.</p>\n</li>\n<li>\n<p>Curae eget inceptos malesuada, fermentum class.</p>\n</li>\n<li>\n<p>Porttitor vestibulum aliquam porta feugiat velit, potenti eu placerat.</p>\n</li>\n<li>\n<p>Ligula lacus tempus ac porta, vel litora.</p>\n</li>\n</ul>\n<p>Torquent non nisi lacinia faucibus nibh tortor taciti commodo porttitor, mus hendrerit id leo scelerisque mollis habitasse orci tristique aptent, lacus at molestie cubilia facilisis porta accumsan condimentum. Metus lacus suscipit porttitor integer facilisi torquent, nostra nulla platea at natoque varius venenatis, id quam pharetra aliquam leo. Dictum orci himenaeos quam mi fusce lacinia maecenas ac magna eleifend laoreet, vivamus enim curabitur ullamcorper est ultrices convallis suscipit nascetur. Ornare fames pretium ante ac eget nisi tellus vivamus, convallis mauris sapien imperdiet sollicitudin aliquet taciti quam, lacinia tempor primis magna iaculis at eu. Est facilisi proin risus eleifend orci torquent ultricies platea, quisque nullam vel porttitor euismod sociis non, maecenas sociosqu interdum arcu sed pharetra potenti. Aliquet risus tempus hendrerit sapien tellus eget cursus enim etiam dui, lobortis nostra pellentesque odio posuere morbi ad neque senectus arcu eu, turpis proin ac felis purus fames magnis dis dignissim.</p>\n<p>Orci volutpat augue viverra scelerisque dictumst ut condimentum vivamus, accumsan cum sem sollicitudin aliquet vehicula porta pretium placerat, malesuada euismod primis cubilia rutrum tempus parturient. Urna mauris in nibh morbi hendrerit vulputate condimentum, iaculis consequat porttitor dui dis euismod eros, arcu elementum venenatis varius lectus nisi. Nibh arcu ultrices semper morbi quam aptent quisque porta posuere iaculis, vestibulum cum vitae primis varius natoque conubia eu. Placerat sociis sagittis sociosqu morbi purus lobortis convallis, bibendum tortor ridiculus orci habitasse viverra dictum, quis rutrum fusce potenti volutpat vehicula. Curae porta inceptos lectus mus urna litora semper aliquam libero rutrum sem dui maecenas ligula quis, eget risus non imperdiet cum morbi magnis suspendisse etiam augue porttitor placerat facilisi hendrerit. Et eleifend eget augue duis fringilla sagittis erat est habitasse commodo tristique quisque pretium, suspendisse imperdiet inceptos mollis blandit magna mus elementum molestie sed vestibulum. Euismod morbi hendrerit suscipit felis ornare libero ligula, mus tortor urna interdum blandit nisi netus posuere, purus fermentum magnis nam primis nulla.</p>\n<h2 id=\"elementum-nisi-urna-cursus-nisl-quam-ante-tristique-blandit-ultricies-eget\">Elementum nisi urna cursus nisl quam ante tristique blandit ultricies eget</h2>\n<p>Netus at rutrum taciti vestibulum molestie conubia semper class potenti lobortis, hendrerit donec vitae ad libero natoque parturient litora congue. Torquent rhoncus odio cursus iaculis molestie arcu leo condimentum accumsan, laoreet congue duis libero justo tortor commodo fusce, massa eros hac euismod netus sodales mi magnis. Aenean nullam sollicitudin ad velit nulla venenatis suspendisse iaculis, aliquet senectus mollis aptent fringilla volutpat nascetur, nec urna vehicula lacinia neque augue orci. Suspendisse et eleifend convallis sollicitudin posuere diam turpis gravida congue ultrices, laoreet ultricies dapibus proin facilisis magna class praesent fusce. Mus morbi magnis ultricies sed turpis ultrices tempus tortor bibendum, netus nulla viverra torquent malesuada ridiculus tempor. Parturient sociosqu erat ullamcorper gravida natoque varius, etiam habitant augue praesent per curabitur iaculis, donec pellentesque cursus suscipit aliquet. Congue curae cursus scelerisque pellentesque quis fusce arcu eros dictumst luctus ridiculus nisl viverra, turpis class faucibus phasellus feugiat eleifend fringilla orci tristique habitasse conubia quam. Habitasse montes congue sodales rutrum cras torquent cursus auctor condimentum imperdiet egestas nascetur, platea tincidunt ut sollicitudin purus libero lobortis ad nisi diam quam.</p>";

				const _internal = {
					injectedFrontmatter: {},
				};
				const frontmatter$1 = {"title":"How to become a Frontend Master","excerpt":"Ornare cum cursus laoreet sagittis nunc fusce posuere per euismod dis vehicula a, semper fames lacus maecenas dictumst pulvinar neque enim non potenti. Torquent hac sociosqu eleifend potenti.","publishDate":"2022-11-07T15:39:36.050Z","image":"https://source.unsplash.com/Iqi0Rm6gBkQ","category":"Tutorials","author":"Connor Lopez","layout":"@layouts/BlogLayout.astro","tags":["astro","tailwindcss","frontend"]};
				const file$1 = "C:/code/dreamoment/website/src/pages/blog/how-to-become-frontend-master.md";
				const url$1 = "/docs/blog/how-to-become-frontend-master";
				function rawContent$1() {
					return "\nWhatever you do, it's always beneficial to have the right tools at your disposal. I love working remotely and am a big advocate of doing remote software development. Therefore, I always strive to have the best equipment available to be as productive as possible. Writing posts like this constantly takes a lot of time. Luckily iVanky helped me out and sponsored this post so that I can concentrate on writing. I recently had the chance to test out one of their hottest products, a dual USB-C Docking Station that allows me to connect both my wide-screen monitors to my MacBook with Dual 4K@60Hz display connectivity. It also supports up to 96W laptop charging, which is awesome. If you are in a situation like me and want to upgrade your equipment, check out this and their other products! And now comes the article:\n\nWhether you are new to programming or already an experienced developer. In this industry, learning new concepts and languages/frameworks is\nmandatory to keep up with the rapid changes. Take for example React - open-sourced by Facebook just a shy 4 years ago it already became the number one choice for JavaScript devs around the globe. But also Vue and Angular, of course, have their legitimate follower-base. And then there is Svelte, and universal frameworks like Next.js or Nuxt.js, and Gatsby, and Gridsome, and Quasar, and and and. If you want to shine as an expert JavaScript developer you should at least have some experience in different frameworks and libraries - besides doing your homework with good, old JS.\n\nTo help you become Frontend Masters, I have collected 9 different projects, each with a distinct topic and a different JavaScript framework or library as a tech stack that you can build and add to your portfolio. Remember, nothing helps you more than actually building stuff so go ahead, sharpen your mind and make this happen!\n\n## Dictum integer fusce ac ridiculus\n\nLorem ipsum dolor sit amet consectetur adipiscing elit euismod rutrum, consequat fringilla ultricies nullam curae mollis semper conubia viverra, orci aenean dapibus pharetra nec tortor tellus cubilia. Ullamcorper mi lectus eu malesuada tempor massa praesent magna mattis posuere, lobortis vulputate ut duis magnis parturient habitant nibh id tristique, quis suspendisse donec nisl penatibus sem non feugiat taciti. Mollis per ridiculus integer cursus semper vestibulum fermentum penatibus cubilia blandit scelerisque, tempus platea leo posuere ac pharetra volutpat aliquet euismod id ullamcorper lobortis, urna est magna mus rhoncus massa curae libero praesent eget. Mattis malesuada vestibulum quis ac nam phasellus suscipit facilisis libero diam posuere, cursus massa vehicula neque imperdiet tincidunt dui egestas lacinia mollis aliquet orci, nisl curabitur dapibus litora dis cum nostra montes ligula praesent. Facilisi aliquam convallis molestie tempor blandit ultricies bibendum parturient cubilia quam, porttitor morbi torquent tempus taciti nec faucibus elementum phasellus, quis inceptos vestibulum gravida augue potenti eget nunc maecenas. Tempor facilisis ligula volutpat habitant consequat inceptos orci per potenti blandit platea, mus sapien eget vel libero vestibulum augue cubilia ut ultrices fringilla lectus, imperdiet pellentesque cum ridiculus convallis sollicitudin nisl interdum semper felis.\n\nOrnare cum cursus laoreet sagittis nunc fusce posuere per euismod dis vehicula a, semper fames lacus maecenas dictumst pulvinar neque enim non potenti. Torquent hac sociosqu eleifend potenti augue nulla vivamus senectus odio, quisque curabitur enim consequat class sociis feugiat ullamcorper, felis dis imperdiet cubilia commodo sed massa phasellus. Viverra purus mus nisi condimentum dui vehicula facilisis turpis, habitant nascetur lectus tempor quisque habitasse urna scelerisque, nibh nullam vestibulum luctus aenean mollis metus. Suscipit gravida duis nec aliquet natoque molestie a ridiculus scelerisque cum, justo cursus sapien sodales purus dignissim vel facilisi magnis, inceptos rutrum ut integer auctor commodo sollicitudin fames et. Faucibus ligula nibh sagittis mauris auctor posuere habitant, scelerisque phasellus accumsan egestas gravida viverra nam, sed etiam eleifend proin massa dictumst. Porttitor risus luctus per aenean tellus primis fringilla vitae fames lacinia mauris metus, nec pulvinar quisque commodo sodales ac nibh natoque phasellus semper placerat. Lectus aenean potenti leo sollicitudin tristique eros quam ligula, vestibulum diam consequat enim torquent nec tempus, blandit viverra dapibus eleifend dis nunc nascetur.\n\n## Sodales hendrerit malesuada et vestibulum\n\n- Luctus euismod pretium nisi et, est dui enim.\n\n- Curae eget inceptos malesuada, fermentum class.\n\n- Porttitor vestibulum aliquam porta feugiat velit, potenti eu placerat.\n\n- Ligula lacus tempus ac porta, vel litora.\n\nTorquent non nisi lacinia faucibus nibh tortor taciti commodo porttitor, mus hendrerit id leo scelerisque mollis habitasse orci tristique aptent, lacus at molestie cubilia facilisis porta accumsan condimentum. Metus lacus suscipit porttitor integer facilisi torquent, nostra nulla platea at natoque varius venenatis, id quam pharetra aliquam leo. Dictum orci himenaeos quam mi fusce lacinia maecenas ac magna eleifend laoreet, vivamus enim curabitur ullamcorper est ultrices convallis suscipit nascetur. Ornare fames pretium ante ac eget nisi tellus vivamus, convallis mauris sapien imperdiet sollicitudin aliquet taciti quam, lacinia tempor primis magna iaculis at eu. Est facilisi proin risus eleifend orci torquent ultricies platea, quisque nullam vel porttitor euismod sociis non, maecenas sociosqu interdum arcu sed pharetra potenti. Aliquet risus tempus hendrerit sapien tellus eget cursus enim etiam dui, lobortis nostra pellentesque odio posuere morbi ad neque senectus arcu eu, turpis proin ac felis purus fames magnis dis dignissim.\n\nOrci volutpat augue viverra scelerisque dictumst ut condimentum vivamus, accumsan cum sem sollicitudin aliquet vehicula porta pretium placerat, malesuada euismod primis cubilia rutrum tempus parturient. Urna mauris in nibh morbi hendrerit vulputate condimentum, iaculis consequat porttitor dui dis euismod eros, arcu elementum venenatis varius lectus nisi. Nibh arcu ultrices semper morbi quam aptent quisque porta posuere iaculis, vestibulum cum vitae primis varius natoque conubia eu. Placerat sociis sagittis sociosqu morbi purus lobortis convallis, bibendum tortor ridiculus orci habitasse viverra dictum, quis rutrum fusce potenti volutpat vehicula. Curae porta inceptos lectus mus urna litora semper aliquam libero rutrum sem dui maecenas ligula quis, eget risus non imperdiet cum morbi magnis suspendisse etiam augue porttitor placerat facilisi hendrerit. Et eleifend eget augue duis fringilla sagittis erat est habitasse commodo tristique quisque pretium, suspendisse imperdiet inceptos mollis blandit magna mus elementum molestie sed vestibulum. Euismod morbi hendrerit suscipit felis ornare libero ligula, mus tortor urna interdum blandit nisi netus posuere, purus fermentum magnis nam primis nulla.\n\n## Elementum nisi urna cursus nisl quam ante tristique blandit ultricies eget\n\nNetus at rutrum taciti vestibulum molestie conubia semper class potenti lobortis, hendrerit donec vitae ad libero natoque parturient litora congue. Torquent rhoncus odio cursus iaculis molestie arcu leo condimentum accumsan, laoreet congue duis libero justo tortor commodo fusce, massa eros hac euismod netus sodales mi magnis. Aenean nullam sollicitudin ad velit nulla venenatis suspendisse iaculis, aliquet senectus mollis aptent fringilla volutpat nascetur, nec urna vehicula lacinia neque augue orci. Suspendisse et eleifend convallis sollicitudin posuere diam turpis gravida congue ultrices, laoreet ultricies dapibus proin facilisis magna class praesent fusce. Mus morbi magnis ultricies sed turpis ultrices tempus tortor bibendum, netus nulla viverra torquent malesuada ridiculus tempor. Parturient sociosqu erat ullamcorper gravida natoque varius, etiam habitant augue praesent per curabitur iaculis, donec pellentesque cursus suscipit aliquet. Congue curae cursus scelerisque pellentesque quis fusce arcu eros dictumst luctus ridiculus nisl viverra, turpis class faucibus phasellus feugiat eleifend fringilla orci tristique habitasse conubia quam. Habitasse montes congue sodales rutrum cras torquent cursus auctor condimentum imperdiet egestas nascetur, platea tincidunt ut sollicitudin purus libero lobortis ad nisi diam quam.\n";
				}
				function compiledContent$1() {
					return html;
				}
				function getHeadings$1() {
					return [{"depth":2,"slug":"dictum-integer-fusce-ac-ridiculus","text":"Dictum integer fusce ac ridiculus"},{"depth":2,"slug":"sodales-hendrerit-malesuada-et-vestibulum","text":"Sodales hendrerit malesuada et vestibulum"},{"depth":2,"slug":"elementum-nisi-urna-cursus-nisl-quam-ante-tristique-blandit-ultricies-eget","text":"Elementum nisi urna cursus nisl quam ante tristique blandit ultricies eget"}];
				}
				function getHeaders() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$1();
				}				async function Content$1() {
					const { layout, ...content } = frontmatter$1;
					content.file = file$1;
					content.url = url$1;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html });
					return createVNode($$BlogLayout, {
									file: file$1,
									url: url$1,
									content,
									frontmatter: content,
									headings: getHeadings$1(),
									rawContent: rawContent$1,
									compiledContent: compiledContent$1,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$1[Symbol.for('astro.needsHeadRendering')] = false;

const _page6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  _internal,
  frontmatter: frontmatter$1,
  file: file$1,
  url: url$1,
  rawContent: rawContent$1,
  compiledContent: compiledContent$1,
  getHeadings: getHeadings$1,
  getHeaders,
  Content: Content$1,
  default: Content$1
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout = async function ({
  children
}) {
  const Layout = (await Promise.resolve().then(() => BlogLayout)).default;
  const {
    layout,
    ...content
  } = frontmatter;
  content.file = file;
  content.url = url;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file,
    url,
    content,
    frontmatter: content,
    headings: getHeadings(),
    "server:root": true,
    children
  });
};
const frontmatter = {
  "title": "Typography Example Post",
  "excerpt": "Sint sit cillum pariatur eiusmod nulla pariatur ipsum. Sit laborum anim qui mollit tempor pariatur nisi minim dolor. Aliquip et adipisicing sit sit fugiat",
  "publishDate": "2022-11-05T15:36:19.399Z",
  "category": "Technology",
  "layout": "@layouts/BlogLayout.astro",
  "image": "https://images.unsplash.com/photo-1542393545-10f5cde2c810?&fit=crop&w=430&h=240",
  "author": "Charles North",
  "tags": ["mdx", "astro", "blog"]
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "headings",
    "text": "Headings"
  }, {
    "depth": 2,
    "slug": "heading-two",
    "text": "Heading two"
  }, {
    "depth": 3,
    "slug": "heading-three",
    "text": "Heading three"
  }, {
    "depth": 4,
    "slug": "heading-four",
    "text": "Heading four"
  }, {
    "depth": 5,
    "slug": "heading-five",
    "text": "Heading five"
  }, {
    "depth": 6,
    "slug": "heading-six",
    "text": "Heading six"
  }, {
    "depth": 2,
    "slug": "paragraphs",
    "text": "Paragraphs"
  }, {
    "depth": 2,
    "slug": "blockquotes",
    "text": "Blockquotes"
  }, {
    "depth": 2,
    "slug": "lists",
    "text": "Lists"
  }, {
    "depth": 3,
    "slug": "ordered-list",
    "text": "Ordered List"
  }, {
    "depth": 3,
    "slug": "unordered-list",
    "text": "Unordered List"
  }, {
    "depth": 2,
    "slug": "horizontal-rule",
    "text": "Horizontal rule"
  }, {
    "depth": 2,
    "slug": "table",
    "text": "Table"
  }, {
    "depth": 2,
    "slug": "code",
    "text": "Code"
  }, {
    "depth": 3,
    "slug": "inline-code",
    "text": "Inline code"
  }, {
    "depth": 3,
    "slug": "highlighted",
    "text": "Highlighted"
  }, {
    "depth": 2,
    "slug": "inline-elements",
    "text": "Inline elements"
  }, {
    "depth": 2,
    "slug": "mdx",
    "text": "MDX"
  }];
}
function _createMdxContent(props) {
  const _components = Object.assign({
    p: "p",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    a: "a",
    blockquote: "blockquote",
    ol: "ol",
    li: "li",
    ul: "ul",
    hr: "hr",
    table: "table",
    thead: "thead",
    tr: "tr",
    th: "th",
    tbody: "tbody",
    td: "td",
    code: "code",
    pre: "pre",
    span: "span",
    strong: "strong",
    img: "img",
    em: "em"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }), "\n", createVNode(_components.h2, {
      id: "headings",
      children: [createVNode("a", {
        name: "Headings"
      }), "Headings"]
    }), "\n", createVNode(_components.p, {
      children: "Sint sit cillum pariatur eiusmod nulla pariatur ipsum. Sit laborum anim qui mollit tempor pariatur nisi minim dolor. Aliquip et adipisicing sit sit fugiat commodo id sunt. Nostrud enim ad commodo incididunt cupidatat in ullamco ullamco Lorem cupidatat velit enim et Lorem. Ut laborum cillum laboris fugiat culpa sint irure do reprehenderit culpa occaecat. Exercitation esse mollit tempor magna aliqua in occaecat aliquip veniam reprehenderit nisi dolor in laboris dolore velit."
    }), "\n", createVNode(_components.h2, {
      id: "heading-two",
      children: "Heading two"
    }), "\n", createVNode(_components.p, {
      children: "Aute officia nulla deserunt do deserunt cillum velit magna. Officia veniam culpa anim minim dolore labore pariatur voluptate id ad est duis quis velit dolor pariatur enim. Incididunt enim excepteur do veniam consequat culpa do voluptate dolor fugiat ad adipisicing sit. Labore officia est adipisicing dolore proident eiusmod exercitation deserunt ullamco anim do occaecat velit. Elit dolor consectetur proident sunt aliquip est do tempor quis aliqua culpa aute. Duis in tempor exercitation pariatur et adipisicing mollit irure tempor ut enim esse commodo laboris proident. Do excepteur laborum anim esse aliquip eu sit id Lorem incididunt elit irure ea nulla dolor et. Nulla amet fugiat qui minim deserunt enim eu cupidatat aute officia do velit ea reprehenderit."
    }), "\n", createVNode(_components.h3, {
      id: "heading-three",
      children: "Heading three"
    }), "\n", createVNode(_components.p, {
      children: "Voluptate cupidatat cillum elit quis ipsum eu voluptate fugiat consectetur enim. Quis ut voluptate culpa ex anim aute consectetur dolore proident voluptate exercitation eiusmod. Esse in do anim magna minim culpa sint. Adipisicing ipsum consectetur proident ullamco magna sit amet aliqua aute fugiat laborum exercitation duis et."
    }), "\n", createVNode(_components.h4, {
      id: "heading-four",
      children: "Heading four"
    }), "\n", createVNode(_components.p, {
      children: "Commodo fugiat aliqua minim quis pariatur mollit id tempor. Non occaecat minim esse enim aliqua adipisicing nostrud duis consequat eu adipisicing qui. Minim aliquip sit excepteur ipsum consequat laborum pariatur excepteur. Veniam fugiat et amet ad elit anim laborum duis mollit occaecat et et ipsum et reprehenderit. Occaecat aliquip dolore adipisicing sint labore occaecat officia fugiat. Quis adipisicing exercitation exercitation eu amet est laboris sunt nostrud ipsum reprehenderit ullamco. Enim sint ut consectetur id anim aute voluptate exercitation mollit dolore magna magna est Lorem. Ut adipisicing adipisicing aliqua ullamco voluptate labore nisi tempor esse magna incididunt."
    }), "\n", createVNode(_components.h5, {
      id: "heading-five",
      children: "Heading five"
    }), "\n", createVNode(_components.p, {
      children: "Veniam enim esse amet veniam deserunt laboris amet enim consequat. Minim nostrud deserunt cillum consectetur commodo eu enim nostrud ullamco occaecat excepteur. Aliquip et ut est commodo enim dolor amet sint excepteur. Amet ad laboris laborum deserunt sint sunt aliqua commodo ex duis deserunt enim est ex labore ut. Duis incididunt velit adipisicing non incididunt adipisicing adipisicing. Ad irure duis nisi tempor eu dolor fugiat magna et consequat tempor eu ex dolore. Mollit esse nisi qui culpa ut nisi ex proident culpa cupidatat cillum culpa occaecat anim. Ut officia sit ea nisi ea excepteur nostrud ipsum et nulla."
    }), "\n", createVNode(_components.h6, {
      id: "heading-six",
      children: "Heading six"
    }), "\n", createVNode(_components.p, {
      children: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.a, {
        href: "#top",
        children: "[Top]"
      })
    }), "\n", createVNode(_components.h2, {
      id: "paragraphs",
      children: [createVNode("a", {
        name: "Paragraphs"
      }), "Paragraphs"]
    }), "\n", createVNode(_components.p, {
      children: "Incididunt ex adipisicing ea ullamco consectetur in voluptate proident fugiat tempor deserunt reprehenderit ullamco id dolore laborum. Do laboris laboris minim incididunt qui consectetur exercitation adipisicing dolore et magna consequat magna anim sunt. Officia fugiat Lorem sunt pariatur incididunt Lorem reprehenderit proident irure. Dolore ipsum aliqua mollit ad officia fugiat sit eu aliquip cupidatat ipsum duis laborum laborum fugiat esse. Voluptate anim ex dolore deserunt ea ex eiusmod irure. Occaecat excepteur aliqua exercitation aliquip dolor esse eu eu."
    }), "\n", createVNode(_components.p, {
      children: "Officia dolore laborum aute incididunt commodo nisi velit est est elit et dolore elit exercitation. Enim aliquip magna id ipsum aliquip consectetur ad nulla quis. Incididunt pariatur dolor consectetur cillum enim velit cupidatat laborum quis ex."
    }), "\n", createVNode(_components.p, {
      children: "Officia irure in non voluptate adipisicing sit amet tempor duis dolore deserunt enim ut. Reprehenderit incididunt in ad anim et deserunt deserunt Lorem laborum quis. Enim aute anim labore proident laboris voluptate elit excepteur in. Ex labore nulla velit officia ullamco Lorem Lorem id do. Dolore ullamco ipsum magna dolor pariatur voluptate ipsum id occaecat ipsum. Dolore tempor quis duis commodo quis quis enim."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.a, {
        href: "#top",
        children: "[Top]"
      })
    }), "\n", createVNode(_components.h2, {
      id: "blockquotes",
      children: [createVNode("a", {
        name: "Blockquotes"
      }), "Blockquotes"]
    }), "\n", createVNode(_components.p, {
      children: "Ad nisi laborum aute cupidatat magna deserunt eu id laboris id. Aliquip nulla cupidatat sint ex Lorem mollit laborum dolor amet est ut esse aute. Nostrud ex consequat id incididunt proident ipsum minim duis aliqua ut ex et ad quis. Laborum sint esse cillum anim nulla cillum consectetur aliqua sit. Nisi excepteur cillum labore amet excepteur commodo enim occaecat consequat ipsum proident exercitation duis id in."
    }), "\n", createVNode(_components.blockquote, {
      children: ["\n", createVNode(_components.p, {
        children: "Ipsum et cupidatat mollit exercitation enim duis sunt irure aliqua reprehenderit mollit. Pariatur Lorem pariatur laboris do culpa do elit irure. Eiusmod amet nulla voluptate velit culpa et aliqua ad reprehenderit sit ut."
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Labore ea magna Lorem consequat aliquip consectetur cillum duis dolore. Et veniam dolor qui incididunt minim amet laboris sit. Dolore ad esse commodo et dolore amet est velit ut nisi ea. Excepteur ea nulla commodo dolore anim dolore adipisicing eiusmod labore id enim esse quis mollit deserunt est. Minim ea culpa voluptate nostrud commodo proident in duis aliquip minim."
    }), "\n", createVNode(_components.blockquote, {
      children: ["\n", createVNode(_components.p, {
        children: "Qui est sit et reprehenderit aute est esse enim aliqua id aliquip ea anim. Pariatur sint reprehenderit mollit velit voluptate enim consectetur sint enim. Quis exercitation proident elit non id qui culpa dolore esse aliquip consequat."
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Ipsum excepteur cupidatat sunt minim ad eiusmod tempor sit."
    }), "\n", createVNode(_components.blockquote, {
      children: ["\n", createVNode(_components.p, {
        children: "Deserunt excepteur adipisicing culpa pariatur cillum laboris ullamco nisi fugiat cillum officia. In cupidatat nulla aliquip tempor ad Lorem Lorem quis voluptate officia consectetur pariatur ex in est duis. Mollit id esse est elit exercitation voluptate nostrud nisi laborum magna dolore dolore tempor in est consectetur."
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Adipisicing voluptate ipsum culpa voluptate id aute laboris labore esse fugiat veniam ullamco occaecat do ut. Tempor et esse reprehenderit veniam proident ipsum irure sit ullamco et labore ea excepteur nulla labore ut. Ex aute minim quis tempor in eu id id irure ea nostrud dolor esse."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.a, {
        href: "#top",
        children: "[Top]"
      })
    }), "\n", createVNode(_components.h2, {
      id: "lists",
      children: [createVNode("a", {
        name: "Lists"
      }), "Lists"]
    }), "\n", createVNode(_components.h3, {
      id: "ordered-list",
      children: "Ordered List"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "Longan"
      }), "\n", createVNode(_components.li, {
        children: "Lychee"
      }), "\n", createVNode(_components.li, {
        children: "Excepteur ad cupidatat do elit laborum amet cillum reprehenderit consequat quis.\nDeserunt officia esse aliquip consectetur duis ut labore laborum commodo aliquip aliquip velit pariatur dolore."
      }), "\n", createVNode(_components.li, {
        children: "Marionberry"
      }), "\n", createVNode(_components.li, {
        children: ["Melon\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: "Cantaloupe"
          }), "\n", createVNode(_components.li, {
            children: "Honeydew"
          }), "\n", createVNode(_components.li, {
            children: "Watermelon"
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: "Miracle fruit"
      }), "\n", createVNode(_components.li, {
        children: "Mulberry"
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "unordered-list",
      children: "Unordered List"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Olive"
      }), "\n", createVNode(_components.li, {
        children: ["Orange\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: "Blood orange"
          }), "\n", createVNode(_components.li, {
            children: "Clementine"
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: "Papaya"
      }), "\n", createVNode(_components.li, {
        children: "Ut aute ipsum occaecat nisi culpa Lorem id occaecat cupidatat id id magna laboris ad duis. Fugiat cillum dolore veniam nostrud proident sint consectetur eiusmod irure adipisicing."
      }), "\n", createVNode(_components.li, {
        children: "Passionfruit"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.a, {
        href: "#top",
        children: "[Top]"
      })
    }), "\n", createVNode(_components.h2, {
      id: "horizontal-rule",
      children: [createVNode("a", {
        name: "Horizontal"
      }), "Horizontal rule"]
    }), "\n", createVNode(_components.p, {
      children: "In dolore velit aliquip labore mollit minim tempor veniam eu veniam ad in sint aliquip mollit mollit. Ex occaecat non deserunt elit laborum sunt tempor sint consequat culpa culpa qui sit. Irure ad commodo eu voluptate mollit cillum cupidatat veniam proident amet minim reprehenderit."
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.p, {
      children: "In laboris eiusmod reprehenderit aliquip sit proident occaecat. Non sit labore anim elit veniam Lorem minim commodo eiusmod irure do minim nisi. Dolor amet cillum excepteur consequat sint non sint."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.a, {
        href: "#top",
        children: "[Top]"
      })
    }), "\n", createVNode(_components.h2, {
      id: "table",
      children: [createVNode("a", {
        name: "Table"
      }), "Table"]
    }), "\n", createVNode(_components.p, {
      children: "Duis sunt ut pariatur reprehenderit mollit mollit magna dolore in pariatur nulla commodo sit dolor ad fugiat. Laboris amet ea occaecat duis eu enim exercitation deserunt ea laborum occaecat reprehenderit. Et incididunt dolor commodo consequat mollit nisi proident non pariatur in et incididunt id. Eu ut et Lorem ea ex magna minim ipsum ipsum do."
    }), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            align: "left",
            children: "Table Heading 1"
          }), createVNode(_components.th, {
            align: "left",
            children: "Table Heading 2"
          }), createVNode(_components.th, {
            align: "center",
            children: "Center align"
          }), createVNode(_components.th, {
            align: "right",
            children: "Right align"
          }), createVNode(_components.th, {
            align: "left",
            children: "Table Heading 5"
          })]
        })
      }), createVNode(_components.tbody, {
        children: [createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            align: "left",
            children: "Item 1"
          }), createVNode(_components.td, {
            align: "left",
            children: "Item 2"
          }), createVNode(_components.td, {
            align: "center",
            children: "Item 3"
          }), createVNode(_components.td, {
            align: "right",
            children: "Item 4"
          }), createVNode(_components.td, {
            align: "left",
            children: "Item 5"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            align: "left",
            children: "Item 1"
          }), createVNode(_components.td, {
            align: "left",
            children: "Item 2"
          }), createVNode(_components.td, {
            align: "center",
            children: "Item 3"
          }), createVNode(_components.td, {
            align: "right",
            children: "Item 4"
          }), createVNode(_components.td, {
            align: "left",
            children: "Item 5"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            align: "left",
            children: "Item 1"
          }), createVNode(_components.td, {
            align: "left",
            children: "Item 2"
          }), createVNode(_components.td, {
            align: "center",
            children: "Item 3"
          }), createVNode(_components.td, {
            align: "right",
            children: "Item 4"
          }), createVNode(_components.td, {
            align: "left",
            children: "Item 5"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            align: "left",
            children: "Item 1"
          }), createVNode(_components.td, {
            align: "left",
            children: "Item 2"
          }), createVNode(_components.td, {
            align: "center",
            children: "Item 3"
          }), createVNode(_components.td, {
            align: "right",
            children: "Item 4"
          }), createVNode(_components.td, {
            align: "left",
            children: "Item 5"
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            align: "left",
            children: "Item 1"
          }), createVNode(_components.td, {
            align: "left",
            children: "Item 2"
          }), createVNode(_components.td, {
            align: "center",
            children: "Item 3"
          }), createVNode(_components.td, {
            align: "right",
            children: "Item 4"
          }), createVNode(_components.td, {
            align: "left",
            children: "Item 5"
          })]
        })]
      })]
    }), "\n", createVNode(_components.p, {
      children: "Minim id consequat adipisicing cupidatat laborum culpa veniam non consectetur et duis pariatur reprehenderit eu ex consectetur. Sunt nisi qui eiusmod ut cillum laborum Lorem officia aliquip laboris ullamco nostrud laboris non irure laboris. Cillum dolore labore Lorem deserunt mollit voluptate esse incididunt ex dolor."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.a, {
        href: "#top",
        children: "[Top]"
      })
    }), "\n", createVNode(_components.h2, {
      id: "code",
      children: [createVNode("a", {
        name: "Code"
      }), "Code"]
    }), "\n", createVNode(_components.h3, {
      id: "inline-code",
      children: "Inline code"
    }), "\n", createVNode(_components.p, {
      children: ["Ad amet irure est magna id mollit Lorem in do duis enim. Excepteur velit nisi magna ea pariatur pariatur ullamco fugiat deserunt sint non sint. Duis duis est ", createVNode(_components.code, {
        children: "code in text"
      }), " velit velit aute culpa ex quis pariatur pariatur laborum aute pariatur duis tempor sunt ad. Irure magna voluptate dolore consectetur consectetur irure esse. Anim magna ", createVNode(_components.code, {
        children: "<strong>in culpa qui officia</strong>"
      }), " dolor eiusmod esse amet aute cupidatat aliqua do id voluptate cupidatat reprehenderit amet labore deserunt."]
    }), "\n", createVNode(_components.h3, {
      id: "highlighted",
      children: "Highlighted"
    }), "\n", createVNode(_components.p, {
      children: "Et fugiat ad nisi amet magna labore do cillum fugiat occaecat cillum Lorem proident. In sint dolor ullamco ad do adipisicing amet id excepteur Lorem aliquip sit irure veniam laborum duis cillum. Aliqua occaecat minim cillum deserunt magna sunt laboris do do irure ea nostrud consequat ut voluptate ex."
    }), "\n", createVNode(_components.pre, {
      className: "astro-code",
      style: {
        backgroundColor: "#0d1117",
        overflowX: "auto"
      },
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          className: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#FF7B72"
            },
            children: "package"
          }), createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: " "
          }), createVNode(_components.span, {
            style: {
              color: "#FFA657"
            },
            children: "main"
          })]
        }), "\n", createVNode(_components.span, {
          className: "line"
        }), "\n", createVNode(_components.span, {
          className: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#FF7B72"
            },
            children: "import"
          }), createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: " ("
          })]
        }), "\n", createVNode(_components.span, {
          className: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: "    "
          }), createVNode(_components.span, {
            style: {
              color: "#A5D6FF"
            },
            children: "\""
          }), createVNode(_components.span, {
            style: {
              color: "#FFA657"
            },
            children: "fmt"
          }), createVNode(_components.span, {
            style: {
              color: "#A5D6FF"
            },
            children: "\""
          })]
        }), "\n", createVNode(_components.span, {
          className: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: "    "
          }), createVNode(_components.span, {
            style: {
              color: "#A5D6FF"
            },
            children: "\""
          }), createVNode(_components.span, {
            style: {
              color: "#FFA657"
            },
            children: "net/http"
          }), createVNode(_components.span, {
            style: {
              color: "#A5D6FF"
            },
            children: "\""
          })]
        }), "\n", createVNode(_components.span, {
          className: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: ")"
          })
        }), "\n", createVNode(_components.span, {
          className: "line"
        }), "\n", createVNode(_components.span, {
          className: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#FF7B72"
            },
            children: "func"
          }), createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: " "
          }), createVNode(_components.span, {
            style: {
              color: "#D2A8FF"
            },
            children: "handler"
          }), createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: "(w http.ResponseWriter, r "
          }), createVNode(_components.span, {
            style: {
              color: "#FF7B72"
            },
            children: "*"
          }), createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: "http.Request) {"
          })]
        }), "\n", createVNode(_components.span, {
          className: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: "    fmt."
          }), createVNode(_components.span, {
            style: {
              color: "#79C0FF"
            },
            children: "Fprintf"
          }), createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: "(w, "
          }), createVNode(_components.span, {
            style: {
              color: "#A5D6FF"
            },
            children: "\"Hi there, I love "
          }), createVNode(_components.span, {
            style: {
              color: "#79C0FF"
            },
            children: "%s"
          }), createVNode(_components.span, {
            style: {
              color: "#A5D6FF"
            },
            children: "!\""
          }), createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: ", r.URL.Path["
          }), createVNode(_components.span, {
            style: {
              color: "#79C0FF"
            },
            children: "1"
          }), createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: ":])"
          })]
        }), "\n", createVNode(_components.span, {
          className: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: "}"
          })
        }), "\n", createVNode(_components.span, {
          className: "line"
        }), "\n", createVNode(_components.span, {
          className: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#FF7B72"
            },
            children: "func"
          }), createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: " "
          }), createVNode(_components.span, {
            style: {
              color: "#D2A8FF"
            },
            children: "main"
          }), createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: "() {"
          })]
        }), "\n", createVNode(_components.span, {
          className: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: "    http."
          }), createVNode(_components.span, {
            style: {
              color: "#79C0FF"
            },
            children: "HandleFunc"
          }), createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: "("
          }), createVNode(_components.span, {
            style: {
              color: "#A5D6FF"
            },
            children: "\"/\""
          }), createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: ", handler)"
          })]
        }), "\n", createVNode(_components.span, {
          className: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: "    http."
          }), createVNode(_components.span, {
            style: {
              color: "#79C0FF"
            },
            children: "ListenAndServe"
          }), createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: "("
          }), createVNode(_components.span, {
            style: {
              color: "#A5D6FF"
            },
            children: "\":8080\""
          }), createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: ", "
          }), createVNode(_components.span, {
            style: {
              color: "#79C0FF"
            },
            children: "nil"
          }), createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: ")"
          })]
        }), "\n", createVNode(_components.span, {
          className: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: "}"
          })
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: "Ex amet id ex aliquip id do laborum excepteur exercitation elit sint commodo occaecat nostrud est. Nostrud pariatur esse veniam laborum non sint magna sit laboris minim in id. Aliqua pariatur pariatur excepteur adipisicing irure culpa consequat commodo et ex id ad."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.a, {
        href: "#top",
        children: "[Top]"
      })
    }), "\n", createVNode(_components.h2, {
      id: "inline-elements",
      children: [createVNode("a", {
        name: "Inline"
      }), "Inline elements"]
    }), "\n", createVNode(_components.p, {
      children: ["Sint ea anim ipsum ad commodo cupidatat do ", createVNode(_components.strong, {
        children: "exercitation"
      }), " incididunt et minim ad labore sunt. Minim deserunt labore laboris velit nulla incididunt ipsum nulla. Ullamco ad laborum ea qui et anim in laboris exercitation tempor sit officia laborum reprehenderit culpa velit quis. ", createVNode(_components.strong, {
        children: "Consequat commodo"
      }), " reprehenderit duis ", createVNode(_components.a, {
        href: "#!",
        children: "irure"
      }), " esse esse exercitation minim enim Lorem dolore duis irure. Nisi Lorem reprehenderit ea amet excepteur dolor excepteur magna labore proident voluptate ipsum. Reprehenderit ex esse deserunt aliqua ea officia mollit Lorem nulla magna enim. Et ad ipsum labore enim ipsum ", createVNode(_components.strong, {
        children: "cupidatat consequat"
      }), ". Commodo non ea cupidatat magna deserunt dolore ipsum velit nulla elit veniam nulla eiusmod proident officia."]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "https://images.unsplash.com/photo-1471128466710-c26ff0d26143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2MDc4MTk3Mw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
        alt: "Super wide"
      })
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.em, {
        children: "Proident sit veniam in est proident officia adipisicing"
      }), " ea tempor cillum non cillum velit deserunt. Voluptate laborum incididunt sit consectetur Lorem irure incididunt voluptate nostrud. Commodo ut eiusmod tempor cupidatat esse enim minim ex anim consequat. Mollit sint culpa qui laboris quis consectetur ad sint esse. Amet anim anim minim ullamco et duis non irure. Sit tempor adipisicing ea laboris ", createVNode(_components.code, {
        children: "culpa ex duis sint"
      }), " anim aute reprehenderit id eu ea. Aute ", createVNode(_components.a, {
        href: "#!",
        children: "excepteur proident"
      }), " Lorem minim adipisicing nostrud mollit ad ut voluptate do nulla esse occaecat aliqua sint anim."]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "https://placekitten.com/480/400",
        alt: "Not so big"
      })
    }), "\n", createVNode(_components.p, {
      children: ["Incididunt in culpa cupidatat mollit cillum qui proident sit. In cillum aliquip incididunt voluptate magna amet cupidatat cillum pariatur sint aliqua est ", createVNode(_components.em, {
        children: ["enim ", createVNode(_components.strong, {
          children: "anim"
        }), " voluptate"]
      }), ". Magna aliquip proident incididunt id duis pariatur eiusmod incididunt commodo culpa dolore sit. Culpa do nostrud elit ad exercitation anim pariatur non minim nisi ", createVNode(_components.strong, {
        children: ["adipisicing sunt ", createVNode(_components.em, {
          children: "officia"
        })]
      }), ". Do deserunt magna mollit Lorem commodo ipsum do cupidatat mollit enim ut elit veniam ea voluptate."]
    }), "\n", createVNode(_components.p, {
      children: ["Reprehenderit non eu quis in ad elit esse qui aute id ", createVNode(_components.a, {
        href: "#!",
        children: "incididunt"
      }), " dolore cillum. Esse laboris consequat dolor anim exercitation tempor aliqua deserunt velit magna laboris. Culpa culpa minim duis amet mollit do quis amet commodo nulla irure."]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.a, {
        href: "#top",
        children: "[Top]"
      })
    }), "\n", createVNode(_components.h2, {
      id: "mdx",
      children: "MDX"
    }), "\n", createVNode(_components.pre, {
      className: "astro-code",
      style: {
        backgroundColor: "#0d1117",
        overflowX: "auto"
      },
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          className: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#FF7B72"
            },
            children: "---"
          })
        }), "\n", createVNode(_components.span, {
          className: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#FFA657"
            },
            children: "publishDate"
          }), createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: ": "
          }), createVNode(_components.span, {
            style: {
              color: "#A5D6FF"
            },
            children: "'Aug 02 2022'"
          })]
        }), "\n", createVNode(_components.span, {
          className: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#FFA657"
            },
            children: "title"
          }), createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: ": "
          }), createVNode(_components.span, {
            style: {
              color: "#A5D6FF"
            },
            children: "'Markdown elements demo post'"
          })]
        }), "\n", createVNode(_components.span, {
          className: "line",
          children: createVNode(_components.span, {
            style: {
              color: "#FF7B72"
            },
            children: "---"
          })
        }), "\n", createVNode(_components.span, {
          className: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#FF7B72"
            },
            children: "import"
          }), createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: " Logo "
          }), createVNode(_components.span, {
            style: {
              color: "#FF7B72"
            },
            children: "from"
          }), createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: " "
          }), createVNode(_components.span, {
            style: {
              color: "#A5D6FF"
            },
            children: "\"@components/ui/button.astro\""
          }), createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: ";"
          })]
        }), "\n", createVNode(_components.span, {
          className: "line"
        }), "\n", createVNode(_components.span, {
          className: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: "## "
          }), createVNode(_components.span, {
            style: {
              color: "#79C0FF"
            },
            children: "MDX"
          })]
        }), "\n", createVNode(_components.span, {
          className: "line"
        }), "\n", createVNode(_components.span, {
          className: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: "<"
          }), createVNode(_components.span, {
            style: {
              color: "#7EE787"
            },
            children: "Button"
          }), createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: ">Click</"
          }), createVNode(_components.span, {
            style: {
              color: "#7EE787"
            },
            children: "Button"
          }), createVNode(_components.span, {
            style: {
              color: "#C9D1D9"
            },
            children: ">"
          })]
        })]
      })
    }), "\n", createVNode("div", {
      children: createVNode($$Button, {
        children: "Click Me"
      })
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.a, {
        href: "#top",
        children: "[Top]"
      })
    })]
  });
}
function MDXContent(props = {}) {
  return createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  });
}
__astro_tag_component__(getHeadings, "astro:jsx");
__astro_tag_component__(MDXContent, "astro:jsx");
MDXContent[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
const url = "/docs/blog/kitchensink";
const file = "C:/code/dreamoment/website/src/pages/blog/kitchensink.mdx";
function rawContent() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content = MDXContent;

const _page7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  frontmatter,
  getHeadings,
  default: MDXContent,
  url,
  file,
  rawContent,
  compiledContent,
  Content
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro("C:/code/dreamoment/website/src/pages/blog.astro", "", "file:///C:/code/dreamoment/website/");
const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Blog;
  const posts = (await Astro2.glob(/* #__PURE__ */ Object.assign({"./blog/complete-guide-fullstack-development.md": () => Promise.resolve().then(() => _page4),"./blog/essential-data-structures-algorithms.md": () => Promise.resolve().then(() => _page5),"./blog/how-to-become-frontend-master.md": () => Promise.resolve().then(() => _page6),"./blog/kitchensink.mdx": () => Promise.resolve().then(() => _page7)}), () => "./blog/*.{md,mdx}")).sort(
    (a, b) => new Date(b.frontmatter.publishDate).valueOf() - new Date(a.frontmatter.publishDate).valueOf()
  );
  console.log(posts[0].frontmatter.image);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog" }, { "default": () => renderTemplate`${renderComponent($$result, "Container", $$Container, {}, { "default": () => renderTemplate`${renderComponent($$result, "Sectionhead", $$Sectionhead, {}, { "desc": () => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "slot": "desc" }, { "default": () => renderTemplate`We write about building startups and thoughts going on our mind.` })}`, "title": () => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "slot": "title" }, { "default": () => renderTemplate`Our Blog` })}` })}${maybeRenderHead($$result)}<main class="mt-16">
      <ul class="grid gap-16 max-w-4xl mx-auto">
        ${posts.map((post) => renderTemplate`<li>
              <a${addAttribute(post.url, "href")}>
                <div class="grid md:grid-cols-2 gap-5 md:gap-10 items-center">
                  <div>
                    ${renderComponent($$result, "Image", $$Image, { "src": post.frontmatter.image, "alt": "Thumbnail", "width": 600, "format": "avif", "aspectRatio": "16:9", "class": "w-full rounded-md" })}
                  </div>
                  <div>
                    <span class="text-blue-400 uppercase tracking-wider text-sm font-medium">
                      ${post.frontmatter.category}
                    </span>

                    <h2 class="text-3xl font-semibold leading-snug tracking-tight mt-1 ">
                      ${post.frontmatter.title}
                    </h2>

                    <div class="flex gap-2 mt-3">
                      <span class="text-gray-400">
                        ${post.frontmatter.author}
                      </span>
                      <span class="text-gray-400">• </span>
                      <time class="text-gray-400"${addAttribute(post.frontmatter.publishDate, "datetime")}>
                        ${getFormattedDate(post.frontmatter.publishDate)}
                      </time>
                    </div>
                  </div>
                </div>
              </a>
            </li>`)}
      </ul>
    </main>` })}` })}`;
}, "C:/code/dreamoment/website/src/pages/blog.astro");

const $$file = "C:/code/dreamoment/website/src/pages/blog.astro";
const $$url = "/docs/blog";

const _page8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const pageMap = new Map([["src/pages/index.astro", _page0],["src/pages/contact.astro", _page1],["src/pages/pricing.astro", _page2],["src/pages/about.astro", _page3],["src/pages/blog/complete-guide-fullstack-development.md", _page4],["src/pages/blog/essential-data-structures-algorithms.md", _page5],["src/pages/blog/how-to-become-frontend-master.md", _page6],["src/pages/blog/kitchensink.mdx", _page7],["src/pages/blog.astro", _page8],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),];

export { BaseSSRService as B, isRemoteImage as i, pageMap, renderers };
