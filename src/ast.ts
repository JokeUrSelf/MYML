import { TokenTypes } from "@src/TokenTypes.ts";

const INDENTATION = 2;

class Node<T> {
  private data?: T;
  private children: Array<Node<T>> = [];

  addChild() {
    const child = new Node<T>()
    this.children.push(child);
    return child;
  }

  getData() {
    return this.data;
  }

  setData(data?: T) {
    this.data = data
  }
}

// Program
//     Parameters
//         ParameterAttributeDeclaration
//         ParameterTagNodeDeclaration
//     TagInitialization
//     TagInvocation

//     AttributeDeclaration
//     AttributeAssignment

//     TagNodeDeclaration
//     TagNodeAssignment

function factualTokenToNode(token: Token, depth: number) {
  return {...token, depth } 
}

export function ast(
  tokens: Token[],
  node: Node<Token> = new Node<Token>(),
  depth: number = 0,
) {
  const token = tokens.shift();
  if (token === undefined) return node;

  if (token.type === TokenTypes.Whitespace) {
    const lastNonNewline = token.value.lastIndexOf("\n") + 1;
    const nextDepth = (token.value.length - lastNonNewline) / INDENTATION >> 0;

    if (depth < nextDepth) {
      return ast(tokens, node.addChild(), nextDepth);
    }

    if (depth-1 > nextDepth) {
      tokens.unshift({
        value: " ".repeat((depth-1) * INDENTATION),
        type: TokenTypes.Whitespace,
      });
    }

    return ast(tokens, node, nextDepth);
  }

  node.setData(factualTokenToNode(token, depth));
  return node
}

/*

function ast() 
    parent = new Node()
    for each token

        if token = "[":
            parent = parent.children[-1]
        if token = "]":
            parent = parent.parent
        else:
            parent.addChild(new Node(token))
*/