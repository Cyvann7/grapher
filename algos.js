//* All algorithms should take:
//* 	- a graph as an adjacency matrix
//*  	- a starting node
//*
//* They should return:
//* 	- the order of traversal as an array
//*  	- the string "DONE" at the end of the array
//* 
//* They should work with a cyclic graph.
//* Directed or undirected


function depth_first_traversal(graph, s) {
    var stack = [s];
    var final_stack = [];
    var visited = new Set();

    while (stack.length > 0) {
        var current = stack.pop();
        final_stack.push(current);
        for (let neighbour of graph[current]) {
            if (!visited.has(neighbour)) {
                stack.push(neighbour);
                visited.add(neighbour);
            }
        }
    }

    final_stack.push("DONE")
    return final_stack;
}

function breadth_first_traversal(graph, s) {
    var queue = [s];
    var final_stack = [];
    var visited = new Set();
    while (queue.length > 0) {
        var current = queue.shift();
        final_stack.push(current);

        for (let neighbour of graph[current]) {
            if (!visited.has(neighbour)) {
                queue.push(neighbour);
                visited.add(neighbour);
            }
        }
    }

    final_stack.push("DONE")
    return final_stack;
}