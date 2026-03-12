#!/usr/bin/env node

/**
 * Direct import test for MCP Browser Server
 */

import { spawn } from 'child_process';

console.log('Starting MCP Browser Server (direct test)...\n');

// Start the server
const server = spawn('node', ['--input-type=module'], {
  stdio: ['pipe', 'pipe', 'inherit']
});

// Inline the server code to bypass the import.meta.url check
const serverCode = `
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { BrowserManager } from './dist/browser/manager.js';
import { ToolExecutor } from './dist/tools/executor.js';
import { navigationTools } from './dist/tools/navigation.js';
import { interactionTools } from './dist/tools/interaction.js';
import { contentTools } from './dist/tools/content.js';
import { visualTools } from './dist/tools/visual.js';
import { advancedTools } from './dist/tools/advanced.js';

const serverInstance = new Server(
  { name: 'mcp-browser-server', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

const browserManager = new BrowserManager(true);
const toolExecutor = new ToolExecutor(browserManager);

serverInstance.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [...navigationTools, ...interactionTools, ...contentTools, ...visualTools, ...advancedTools]
  };
});

serverInstance.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const result = await toolExecutor.execute(name, args || {});
  return {
    content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
  };
});

console.error('MCP Browser Server starting...');
const transport = new StdioServerTransport();
await serverInstance.connect(transport);
console.error('MCP Browser Server started!');
console.error('Available tools: ' + (navigationTools.length + interactionTools.length + contentTools.length + visualTools.length + advancedTools.length));
`;

server.stdin.write(serverCode);

const responses = [];

server.stdout.on('data', (data) => {
  const text = data.toString();
  const lines = text.split('\n').filter(line => line.trim());
  for (const line of lines) {
    try {
      const response = JSON.parse(line);
      responses.push(response);
      console.log('\n✓ Response:', JSON.stringify(response, null, 2));
    } catch (e) {
      console.log('  Output:', line);
    }
  }
});

server.on('exit', (code) => {
  console.log(`\n\n=== Test Complete ===`);
  console.log(`Responses received: ${responses.length}`);

  const toolsResponse = responses.find(r => r.result?.tools);
  if (toolsResponse) {
    console.log(`\n✓ SUCCESS: ${toolsResponse.result.tools.length} tools available!`);
    console.log('\nSample tools:');
    toolsResponse.result.tools.slice(0, 5).forEach((t, i) => {
      console.log(`  ${i + 1}. ${t.name}`);
    });
  } else {
    console.log('\n✗ No tools response received');
  }

  process.exit(code);
});

// Send request after delay
setTimeout(() => {
  console.log('\n=== Sending tools/list request ===\n');
  const request = JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/list',
    params: {}
  }) + '\n';
  server.stdin.write(request);

  setTimeout(() => {
    server.stdin.end();
  }, 2000);
}, 1000);
