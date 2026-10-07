import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source = readFileSync(new URL('../app/contact/submission.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { providerAccepted } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);

test('accepts only explicit provider confirmation', () => {
  for (const success of [true, 'true']) assert.equal(providerAccepted({ success }), true);
  for (const success of [false, 'false', 'yes', 1, {}, null, undefined]) assert.equal(providerAccepted({ success }), false);
  for (const value of [null, undefined, 'true', [], {}]) assert.equal(providerAccepted(value), false);
});
