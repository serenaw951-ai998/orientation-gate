import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({ command: "node", args: ["server.js"] });
const client = new Client({ name: "test", version: "0.0.1" });
await client.connect(transport);

const tools = await client.listTools();
console.log("TOOLS:", tools.tools.map(t => t.name).join(", "));

const r1 = await client.callTool({ name: "review_objective", arguments: {
  objective: "Minimize refunds issued this quarter",
  context: "Customer support agent for an e-commerce platform",
  domain: "Customer Support"
}});
console.log("EN VERDICT:", JSON.parse(r1.content[0].text).decision, JSON.parse(r1.content[0].text).risk_flags);

const r2 = await client.callTool({ name: "review_objective", arguments: {
  objective: "提高青少年用户的深夜使用时长和打卡奖励"
}});
console.log("CN VERDICT:", JSON.parse(r2.content[0].text).decision, JSON.parse(r2.content[0].text).risk_flags);

const r3 = await client.callTool({ name: "list_risk_rules", arguments: {} });
console.log("RULES:", JSON.parse(r3.content[0].text).rule_count);

const r4 = await client.callTool({ name: "read_audit_log", arguments: { limit: 5 } });
const log = JSON.parse(r4.content[0].text);
console.log("AUDIT ENTRIES:", log.entries, "| chain:", log.log.map(e => e.prev_hash.slice(0,8)).join(" -> "));

await client.close();
