import { flushSync } from 'svelte';
import { test } from '../../test';

/** @type {Array<{ name: string }>} */
let values = [];

/** @type {Array<Array<{ name: string }>>} */
let selected_array = [];

export default test({
	before_test() {
		values = [{ name: 'Alpha' }, { name: 'Beta' }, { name: 'Gamma' }];
		selected_array = [[values[1]], [], [values[2]]];
	},

	get props() {
		return { values, selected_array };
	},

	html: `
		<div>
			<label>
				<input type="checkbox" value="[object Object]"> Alpha
			</label>

			<label>
				<input type="checkbox" value="[object Object]"> Beta
			</label>

			<label>
				<input type="checkbox" value="[object Object]"> Gamma
			</label>

			<p>Beta</p>
		</div>
		<div>
			<label>
				<input type="checkbox" value="[object Object]"> Alpha
			</label>

			<label>
				<input type="checkbox" value="[object Object]"> Beta
			</label>

			<label>
				<input type="checkbox" value="[object Object]"> Gamma
			</label>

			<p></p>
		</div>
		<div>
			<label>
				<input type="checkbox" value="[object Object]"> Alpha
			</label>

			<label>
				<input type="checkbox" value="[object Object]"> Beta
			</label>

			<label>
				<input type="checkbox" value="[object Object]"> Gamma
			</label>

			<p>Gamma</p>
		</div>
	`,
	ssrHtml: `
		<div>
			<label>
				<input type="checkbox" value="[object Object]"> Alpha
			</label>

			<label>
				<input type="checkbox" value="[object Object]" checked> Beta
			</label>

			<label>
				<input type="checkbox" value="[object Object]"> Gamma
			</label>

			<p>Beta</p>
		</div>
		<div>
			<label>
				<input type="checkbox" value="[object Object]"> Alpha
			</label>

			<label>
				<input type="checkbox" value="[object Object]"> Beta
			</label>

			<label>
				<input type="checkbox" value="[object Object]"> Gamma
			</label>

			<p></p>
		</div>
		<div>
			<label>
				<input type="checkbox" value="[object Object]"> Alpha
			</label>

			<label>
				<input type="checkbox" value="[object Object]"> Beta
			</label>

			<label>
				<input type="checkbox" value="[object Object]" checked> Gamma
			</label>

			<p>Gamma</p>
		</div>
	`,
	test({ assert, component, target, window }) {
		const inputs = target.querySelectorAll('input');

		assert.equal(inputs[0].checked, false);
		assert.equal(inputs[1].checked, true);
		assert.equal(inputs[2].checked, false);
		assert.equal(inputs[3].checked, false);
		assert.equal(inputs[4].checked, false);
		assert.equal(inputs[5].checked, false);
		assert.equal(inputs[6].checked, false);
		assert.equal(inputs[7].checked, false);
		assert.equal(inputs[8].checked, true);

		const event = new window.Event('change');

		inputs[0].checked = true;
		inputs[0].dispatchEvent(event);
		flushSync();

		assert.htmlEqual(
			target.innerHTML,
			`
			<div>
				<label>
					<input type="checkbox" value="[object Object]"> Alpha
				</label>

				<label>
					<input type="checkbox" value="[object Object]"> Beta
				</label>

				<label>
					<input type="checkbox" value="[object Object]"> Gamma
				</label>

				<p>Alpha, Beta</p>
			</div>
			<div>
				<label>
					<input type="checkbox" value="[object Object]"> Alpha
				</label>

				<label>
					<input type="checkbox" value="[object Object]"> Beta
				</label>

				<label>
					<input type="checkbox" value="[object Object]"> Gamma
				</label>

				<p></p>
			</div>
			<div>
				<label>
					<input type="checkbox" value="[object Object]"> Alpha
				</label>

				<label>
					<input type="checkbox" value="[object Object]"> Beta
				</label>

				<label>
					<input type="checkbox" value="[object Object]"> Gamma
				</label>

				<p>Gamma</p>
			</div>
		`
		);
		inputs[3].checked = true;
		inputs[3].dispatchEvent(event);
		flushSync();

		assert.htmlEqual(
			target.innerHTML,
			`
			<div>
				<label>
					<input type="checkbox" value="[object Object]"> Alpha
				</label>

				<label>
					<input type="checkbox" value="[object Object]"> Beta
				</label>

				<label>
					<input type="checkbox" value="[object Object]"> Gamma
				</label>

				<p>Alpha, Beta</p>
			</div>
			<div>
				<label>
					<input type="checkbox" value="[object Object]"> Alpha
				</label>

				<label>
					<input type="checkbox" value="[object Object]"> Beta
				</label>

				<label>
					<input type="checkbox" value="[object Object]"> Gamma
				</label>

				<p>Alpha</p>
			</div>
			<div>
				<label>
					<input type="checkbox" value="[object Object]"> Alpha
				</label>

				<label>
					<input type="checkbox" value="[object Object]"> Beta
				</label>

				<label>
					<input type="checkbox" value="[object Object]"> Gamma
				</label>

				<p>Gamma</p>
			</div>
		`
		);

		inputs[8].checked = false;
		inputs[8].dispatchEvent(event);
		flushSync();

		assert.htmlEqual(
			target.innerHTML,
			`
			<div>
				<label>
					<input type="checkbox" value="[object Object]"> Alpha
				</label>

				<label>
					<input type="checkbox" value="[object Object]"> Beta
				</label>

				<label>
					<input type="checkbox" value="[object Object]"> Gamma
				</label>

				<p>Alpha, Beta</p>
			</div>
			<div>
				<label>
					<input type="checkbox" value="[object Object]"> Alpha
				</label>

				<label>
					<input type="checkbox" value="[object Object]"> Beta
				</label>

				<label>
					<input type="checkbox" value="[object Object]"> Gamma
				</label>

				<p>Alpha</p>
			</div>
			<div>
				<label>
					<input type="checkbox" value="[object Object]"> Alpha
				</label>

				<label>
					<input type="checkbox" value="[object Object]"> Beta
				</label>

				<label>
					<input type="checkbox" value="[object Object]"> Gamma
				</label>

				<p></p>
			</div>
		`
		);

		component.selected_array = [[component.values[1], component.values[2]], [component.values[2]]];

		assert.equal(inputs[0].checked, false);
		assert.equal(inputs[1].checked, true);
		assert.equal(inputs[2].checked, true);
		assert.equal(inputs[3].checked, false);
		assert.equal(inputs[4].checked, false);
		assert.equal(inputs[5].checked, true);

		assert.htmlEqual(
			target.innerHTML,
			`
			<div>
				<label>
					<input type="checkbox" value="[object Object]"> Alpha
				</label>

				<label>
					<input type="checkbox" value="[object Object]"> Beta
				</label>

				<label>
					<input type="checkbox" value="[object Object]"> Gamma
				</label>

				<p>Beta, Gamma</p>
			</div>
			<div>
				<label>
					<input type="checkbox" value="[object Object]"> Alpha
				</label>

				<label>
					<input type="checkbox" value="[object Object]"> Beta
				</label>

				<label>
					<input type="checkbox" value="[object Object]"> Gamma
				</label>

				<p>Gamma</p>
			</div>
		`
		);
	}
});
