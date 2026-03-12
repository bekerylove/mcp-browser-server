#!/usr/bin/env node

/**
 * Test script for MCP Browser Server
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serverPath = join(__dirname, 'dist', 'index.js');

console.log('Starting MCP Browser Server test...\n');

// Start the server with separate stdio streams
const server = spawn('node', [serverPath], {
  stdio: ['pipe', 'pipe', 'pipe']
});

let requestId = 1;
const responses = [];
let stderrOutput = '';

server.stdout.on('data', (data) => {
  const text = data.toString();
  console.log('STDOUT:', text);
  const lines = text.split('\n').filter(line => line.trim());
  for (const line of lines) {
    try {
      const response = JSON.parse(line);
      responses.push(response);
      console.log('\n✓ Parsed JSON-RPC response');
    } catch (e) {
      console.log('  (not JSON)');
    }
  }
});

server.stderr.on('data', (data) => {
  stderrOutput += data.toString();
  console.log('STDERR:', data.toString());
});

server.on('error', (error) => {
  console.error('Server error:', error);
});

server.on('exit', (code) => {
  console.log(`\n\n=== Server exited with code ${code} ===`);
  console.log(`\nTotal JSON-RPC responses: ${responses.length}`);

  // Check if we got the tools list
  const toolsResponse = responses.find(r => r.result?.tools);
  if (toolsResponse) {
    console.log(`\n✓ SUCCESS: ${toolsResponse.result.tools.length} tools available!\n`);
    console.log('Sample tools:');
    toolsResponse.result.tools.slice(0, 10).forEach(tool => {
      console.log(`  • ${tool.name}`);
    });

    if (toolsResponse.result.tools.length > 10) {
      console.log(`  ... and ${toolsResponse.result.tools.length - 10} more`);
    }
  } else {
    console.log('\n✗ No tools response received');
  }

  if (stderrOutput.includes('started')) {
    console.log('\n✓ Server started successfully');
  }

  process.exit(code);
});

// Wait for server to start, then send request
setTimeout(() => {
  console.log('\n=== Sending tools/list request ===\n');

  const listToolsRequest = {
    jsonrpc: '2.0',
    id: requestId++,
    method: 'tools/list',
    params: {}
  };

  const requestStr = JSON.stringify(listToolsRequest) + '\n';
  console.log('Sending:', requestStr);
  server.stdin.write(requestStr);

  // Give server time to respond, then exit
  setTimeout(() => {
    console.log('\n=== Closing connection ===\n');
    server.stdin.end();
  }, 3000);
}, 1000);
