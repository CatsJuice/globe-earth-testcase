const scriptCache = new Set<string>()

export function useScriptSync(src: string) {
  if (scriptCache.has(src))
    return Promise.resolve(src)

  // TODO: 同时加载多个脚本时，会有问题
  scriptCache.add(src)
  const script = document.createElement('script')
  script.src = src
  script.async = true
  document.body.appendChild(script)
  return new Promise((resolve, reject) => {
    script.onload = () => resolve(src)
    script.onerror = () => reject(src)
  })
}
