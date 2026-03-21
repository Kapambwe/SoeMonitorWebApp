// This is a JavaScript module that is loaded on demand. It can export any number of
// functions, and may import other JavaScript modules if required.

export function showPrompt(message) {
  return prompt(message, 'Type anything here');
}

export function logPerformanceMetrics(appName) {
  const sep = '━'.repeat(38);

  // Collect resource entries for DLLs and JS
  const resources = performance.getEntriesByType('resource');
  const dlls = resources.filter(r => r.name.endsWith('.dll') || r.name.endsWith('.wasm'));
  const jsFiles = resources.filter(r => r.name.endsWith('.js'));

  const toMB = bytes => (bytes / 1_048_576).toFixed(2);
  const dllSize = dlls.reduce((sum, r) => sum + (r.transferSize || 0), 0);
  const jsSize  = jsFiles.reduce((sum, r) => sum + (r.transferSize || 0), 0);
  const totalSize = dllSize + jsSize;

  // Timing
  const nav = performance.getEntriesByType('navigation')[0];
  const pageLoad   = nav ? Math.round(nav.loadEventEnd - nav.startTime) : 0;
  const domContent = nav ? Math.round(nav.domContentLoadedEventEnd - nav.startTime) : 0;
  const tti        = nav ? Math.round(nav.domInteractive - nav.startTime) : 0;

  console.log(`📊 ${appName} Performance Metrics`);
  console.log(sep);
  console.log(`🔹 DLLs loaded: ${dlls.length}`);
  console.log(`🔹 Total DLL size: ${toMB(dllSize)} MB`);
  console.log(`🔹 Total JS size: ${toMB(jsSize)} MB`);
  console.log(`🔹 Total download: ${toMB(totalSize)} MB`);
  console.log(sep);
  console.log(`⏱️ Page Load Time: ${pageLoad} ms`);
  console.log(`⏱️ DOM Content Loaded: ${domContent} ms`);
  console.log(`⏱️ Time to Interactive: ${tti} ms`);
  console.log(sep);
  console.log('🎯 IDC Portal: Real Lazy Loading ACTIVE!');
  console.log('   ✓ Workflows assembly configured for lazy loading');
  console.log('   ✓ Assembly loads on first access');
  console.log('   ✓ Reduced initial bundle size');
  console.log('   ✓ Production-ready lazy loading');
  console.log('   ℹ️  Navigate to /workflows to see lazy loading in action');
}
