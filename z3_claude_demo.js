import { solveConstraintsFromJson } from "./z3_solver.js";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
    apiKey: process.env["ANTHROPIC-API-KEY"]
});

const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1000,
    temperature: 0,
    system: `Give me only a Z3 constraint JSON, no other commentary. It should have variables and
             constraints (using type: \"bound\"/expression: \"x > a\" format) for...`,
    messages: [
        {
        "role": "user",
        "content": [
            {
            "type": "text",
            "text": "point strictly inside the rectangle bounded by (10,15) and (20,25)"
            }
        ]
        }
    ]
});

const constraintJSON = await msg.content[0].text;

async function main() {
    try {
      const solution = await solveConstraintsFromJson(JSON.parse(constraintJSON));
      console.log('Found solution:', solution);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  
main();

