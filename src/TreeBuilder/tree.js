import { TreeNodeModel } from './TreeNodeModel.js'
import { TreeHelper } from './TreeHelper.js'

// Create nodes for each label in the tree
const node_O = new TreeNodeModel('O')
const node_E = new TreeNodeModel('E', node_O)
const node_F = new TreeNodeModel('F', node_O)
const node_N = new TreeNodeModel('N', node_O)
const node_A = new TreeNodeModel('A', node_E)
const node_D = new TreeNodeModel('D', node_E)
const node_G = new TreeNodeModel('G', node_N)
const node_M = new TreeNodeModel('M', node_N)
const node_B = new TreeNodeModel('B', node_D)
const node_C = new TreeNodeModel('C', node_D)
const node_H = new TreeNodeModel('H', node_M)
const node_I = new TreeNodeModel('I', node_M)
const node_J = new TreeNodeModel('J', node_M)
const node_K = new TreeNodeModel('K', node_M)
const node_L = new TreeNodeModel('L', node_M)

// Construct the tree by assigning children to each node
node_O.children.push(node_E, node_F, node_N)
node_E.children.push(node_A, node_D)
node_N.children.push(node_G, node_M)
node_D.children.push(node_B, node_C)
node_M.children.push(node_H, node_I, node_J, node_K, node_L)

// Calculate the coordinates of the tree
TreeHelper.calculateNodePositions(node_O)

// Function to print the tree with coordinates
function printTree(node, indent = 0) {
  console.log(
    ' '.repeat(indent) + node.item + ' (' + node.x + ',' + node.y + ')'
  )
  node.children.forEach((child) => printTree(child, indent + 2))
}

// Print the tree to check the coordinates
printTree(node_O)
