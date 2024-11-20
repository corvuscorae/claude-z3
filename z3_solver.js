import { init } from "z3-solver";

export async function solveConstraintsFromJson(constraintJson) {
  // Initialize Z3
  const { Context } = await init();
  const z3 = new Context('main');
  const solver = new z3.Solver();
  
  // Dynamically create Z3 variables
  const variables = {};
  for (const [, variable] of Object.entries(constraintJson.variables)) {
    if (variable.type.toLowerCase() === 'real') {
      variables[variable.name] = z3.Real.const(variable.name);
    }
  }
  
  // Dynamically add constraints
  for (const constraint of constraintJson.constraints) {
    // Parse the constraint expression
    let expr;
    switch (constraint.type) {
      case 'bound':
        // Extract variable and value from expression
        const match = constraint.expression.match(/(\w+)\s*(>=|<=|==|<|>)\s*(\d+(\.\d+)?)/);
        if (match) {
          const [, varName, operator, value] = match;
          const z3Var = variables[varName];
          
          switch (operator) {
            case '>=': expr = z3Var.ge(Number(value)); break;
            case '<=': expr = z3Var.le(Number(value)); break;
            case '>':  expr = z3Var.gt(Number(value)); break;
            case '<':  expr = z3Var.lt(Number(value)); break;
            case '==': expr = z3Var.eq(Number(value)); break;
          }
        }
        break;
      case 'parametric':
        // More complex constraints could be added here
        break;
    }
    
    if (expr) {
      solver.add(expr);
    }
  }
  
  return getSolution(solver, Object.entries(variables))
}

async function getSolution(solver, variables){
    // Check if constraints are satisfiable
    const result = await solver.check();
  
    if (result === 'sat') {
      // Get model and extract values
      const model = solver.model();
      const solution = {};
      
      for (const [varName, z3Var] of variables) {
        solution[varName] = Number(model.eval(z3Var).toString());
      }
      
      return solution;
    } else {
      throw new Error('No solution found');
    }
}

