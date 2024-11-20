# Anthropic API (Claude) for Z3 constraint solving
This demo provides example code for how to use Anthropic API to generate a Z3 constraint JSON that can be used by z3-solver.

### How to use
1. You will need to set ANTHROPIC_API_KEY to a valid key. You can get a key by going to your Anthropic account [dashboard](https://console.anthropic.com/dashboard) > Get API keys. 
    - In Terminal, run `setx ANTHROPIC_API_KEY "your-api-key-here"`
        - you may need to refresh your IDE for Node.js to gain access to this variable.
    - NOTE: if you don't want to use setx, you can instead initialize `anthropic` in z3_claude_demo.js with `apikey: "your-api-key-here"`. Just bear in mind that your API key is sensitive information.
2. In terminal, run `node z3_claude_demo.js`

### Next
- [ ] Make an interface allowing the user to type in constraints and generate new solutions.
- [ ] Add functionality to generate solution sets
- [ ] ...