import {readLines} from '../utils';

export const Day23 = {
  async Part1Answer(filename: string) {
    const lines = await readLines(filename);
    const nodes = getNodes(lines);
    const groups = groupNodes(nodes);
    return groups.filter(groupStartsWithT).length;
  },
  async Part2Answer(filename: string) {
    const lines = await readLines(filename);
    return 0;
  },
};

type Node = {
  id: string;
  edges: string[];
};

function getNodes(input: string[]) {
  let nodes: Record<string, Node> = {};

  function addEdge(a: string, b: string) {
    // Initialize nodes if they don't exist
    if (!nodes[a]) {
      nodes[a] = {id: a, edges: []};
    }
    if (!nodes[b]) {
      nodes[b] = {id: b, edges: []};
    }

    // Add edges if they don't exist
    if (!nodes[a].edges.includes(b)) {
      nodes[a].edges.push(b);
    }
    if (!nodes[b].edges.includes(a)) {
      nodes[b].edges.push(a);
    }
  }

  input.forEach((line) => {
    const ids = line.split('-');
    addEdge(ids[0], ids[1]);
  });
  return nodes;
}

function groupNodes(graph: Record<string, Node>): string[] {
  const groupSet = new Set<string>();
  const nodes = Object.values(graph);

  nodes.forEach((node) => {
    node.edges.forEach((edge) => {
      // Find third node that is connected to both the current node and the edge connected to it
      const connections = nodes.filter((n) => n.edges.includes(node.id) && n.edges.includes(edge));

      connections.forEach((connection) => {
        // Third node found. Sort alphabetically and add to the set. This will avoid duplicate entries
        const group = [node.id, edge, connection.id].sort().join(',');
        groupSet.add(group);
      });
    });
  });

  return Array.from(groupSet);
}

function groupStartsWithT(group: string): boolean {
  const computers = group.split(',');
  return computers.some((c) => c.startsWith('t'));
}

// console.log(await Day23.Part1Answer('input.txt'));
