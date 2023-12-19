import { build } from 'esbuild'
import { dirname, join } from 'path'
import { test } from 'uvu'
import { equal } from 'uvu/assert'
import { app_ctx } from '../ctx/index.js'
import { cssjs_esbuild_plugin_, var__css__replace } from './index.js'
test.after.each(()=>{
	app_ctx.s.app.clear()
})
test('var__css__replace', ()=>{
	equal(var__css__replace(
		`div { color: var(--color); font-size: var(--font-size); }`,
		{ '--color': 'red' },
		{ '--font-size': '16px' }
	),
	`div { color: red; font-size: 16px; }`)
})
test('cssjs_esbuild_plugin_', async ()=>{
	// stdin config does not with onLoad
	// see https://github.com/evanw/esbuild/issues/720
	const result = await build({
		entryPoints: [join(dirname(new URL(import.meta.url).pathname), '../_fixtures/index.css.ts')],
		plugins: [cssjs_esbuild_plugin_()],
		write: false,
	})
	equal(result.outputFiles.map(outputFile=>new TextDecoder().decode(outputFile.contents)), [
		`div {
  color: var(--color);
  font-size: var(--font-size);
}
`
	])
})
test.run()
