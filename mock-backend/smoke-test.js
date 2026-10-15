const { spawn } = require('node:child_process');
const { copyFile, mkdtemp, rm } = require('node:fs/promises');
const { tmpdir } = require('node:os');
const path = require('node:path');

const port = 3199;
const baseUrl = `http://127.0.0.1:${port}`;

async function waitForServer(process) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (process.exitCode !== null) throw new Error(`Server exited with code ${process.exitCode}`);
    try {
      const response = await fetch(`${baseUrl}/students`);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error('Server did not start');
}

async function main() {
  const directory = await mkdtemp(path.join(tmpdir(), 'student-manager-'));
  const database = path.join(directory, 'db.json');
  await copyFile(path.join(__dirname, 'db.json'), database);

  const server = spawn(process.execPath, [path.join(__dirname, 'server.js')], {
    env: { ...process.env, DB_FILE: database, PORT: String(port) },
    stdio: 'ignore',
  });

  try {
    await waitForServer(server);
    const students = await fetch(`${baseUrl}/students`).then((response) => response.json());
    if (!Array.isArray(students) || students.length < 3) throw new Error('GET /students failed');

    const matches = await fetch(`${baseUrl}/students?search=SV001`).then((response) => response.json());
    if (matches.length !== 1 || matches[0].mssv !== 'SV001') throw new Error('Search failed');

    const createdResponse = await fetch(`${baseUrl}/students`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Phạm Minh Đức Hoàng Long', mssv: 'SV004', email: 'long@example.com', address: '' }),
    });
    if (!createdResponse.ok) throw new Error('POST /students failed');
    const created = await createdResponse.json();

    const deleted = await fetch(`${baseUrl}/students/${created.id}`, { method: 'DELETE' });
    if (!deleted.ok) throw new Error('DELETE /students/:id failed');

    console.log('Mock API smoke test passed');
  } finally {
    server.kill();
    await rm(directory, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
