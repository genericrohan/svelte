import { flushSync } from 'svelte';
import { test } from '../../test';

export default test({
	get props() {
		return { x: 'initial' };
	},

	html: `
		<p>x: initial</p>
		<button class="foo">foo</button>
		<p>foo x: initial</p>
		<button class="bar">bar</button>
		<p>bar x: initial</p>
		<button class="baz">baz</button>
		<p>baz x: initial</p>
	`,

	test({ assert, component, target, window }) {
		const click = new window.MouseEvent('click', { bubbles: true });
		const buttons = [...target.querySelectorAll('button')];

		buttons[0].dispatchEvent(click);
		flushSync();

		assert.equal(component.x, 'p');
		assert.htmlEqual(
			target.innerHTML,
			`
			<p>x: p</p>
			<button class="foo">foo</button>
			<p>foo x: p</p>
			<button class="bar">bar</button>
			<p>bar x: p</p>
			<button class="baz">baz</button>
			<p>baz x: p</p>
		`
		);

		buttons[1].dispatchEvent(click);
		flushSync();

		assert.equal(component.x, 'q');
		assert.htmlEqual(
			target.innerHTML,
			`
			<p>x: q</p>
			<button class="foo">foo</button>
			<p>foo x: q</p>
			<button class="bar">bar</button>
			<p>bar x: q</p>
			<button class="baz">baz</button>
			<p>baz x: q</p>
		`
		);

		buttons[2].dispatchEvent(click);
		flushSync();

		assert.equal(component.x, 'r');
		assert.htmlEqual(
			target.innerHTML,
			`
			<p>x: r</p>
			<button class="foo">foo</button>
			<p>foo x: r</p>
			<button class="bar">bar</button>
			<p>bar x: r</p>
			<button class="baz">baz</button>
			<p>baz x: r</p>
		`
		);
	}
});
