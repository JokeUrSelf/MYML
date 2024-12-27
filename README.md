
```ts
(
  attr1
  attr2
  attr3
)

Box
attr: "some text"
attr: property
  ComponentName 
  attr: "some text"
  attr: property

    ComponentName 
    attr: "some text"
    attr: property
      @node1: "child $prop1"

      @node2: ComponentName
      attr: "some text"
      attr: property

        @node2: ComponentName
          @node1: "child $prop1"

      @node3: Box

    Box
    attr: "some text"
    attr: property
      @node1: "child string"
    
    Box
    attr: "some text"
    attr: property

    ComponentName
      @node1: "child string"
    
    Box

    Box
```
```
indent         ::= "  ";
newline        ::= "\n";
tag            ::= pascalCaseWord;
value          ::= any;
attribute      ::= camelCaseWord ":" value;
children       ::= (newline indent (tag | node))*;
node           ::= "@" camelCaseWord ":" value;
```