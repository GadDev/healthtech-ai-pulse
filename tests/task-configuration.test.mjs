import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('proposed task request stays identical to its reviewed repository prompt', () => {
  const task = JSON.parse(readFileSync('docs/editorial/task-configuration.json', 'utf8'));
  const prompt = readFileSync('docs/editorial/SCHEDULED_TASK_PROMPT.md', 'utf8').trimEnd();
  assert.equal(task.request.prompt, prompt);
  assert.equal(task.request.title, 'HealthTech AI Pulse Orchestrator');
  assert.equal(task.request.default_timezone, 'Europe/Luxembourg');
});
