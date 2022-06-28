//init canvas

const canvas = document.getElementById('canvas');
const width = canvas.width = window.innerWidth - 60;
const height = canvas.height = window.innerHeight - 120;
const ctx = canvas.getContext('2d');

const backgroundColor = "#16111b";
const foregroundColor = "#e0e0e0";
const outlineColor = "#555555";

const pi = Math.PI;
const pi2 = 2 * pi

function openTab(evt, tabname) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabname).style.display = "block";
    evt.currentTarget.className += " active";
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, width, height);

var node1 = new Node(80, 100, "A");
var node2 = new Node(160, 200, "B");
var edge1 = new Edge(node1, node2, 0);
var back = false;
var back2 = true;

function adjlist_to_node_objects(g) {
    var nodelist = [];
    var edgelist = [];
    var nodeposx = 50;
    var nodeposy = 50;
    for (var node in g) {
        nodelist.push(new Node(nodeposx, nodeposy, node, g[node]));
        nodeposx += 100;
        if ((nodeposx - 50) % 150 == 0) {
            nodeposy += 100;
            nodeposx = 50;
        }
    }
    ("NODES:", nodelist);

    for (var n in nodelist) {
        node = nodelist[n];
        for (var ne in node.neighbours) {
            neighbour = node.neighbours[ne];
            var from = node;
            var to;
            for (var ni in nodelist) {
                if (nodelist[ni].value == neighbour) {
                    to = nodelist[ni];
                    break;
                }
            }

            var weight = 0;
            var edge = new Edge(from, to, weight)

            edgelist.push(edge);
        }
    }

    ("EDGES:", edgelist);
    return [nodelist, edgelist];
}

var graph = {
    "A": ["B", "C"],
    "B": ["F"],
    "C": ["D", "E"],
    "D": [],
    "E": [],
    "F": [],
}

var graph_objects = adjlist_to_node_objects(graph);
var nodelist = graph_objects[0];
var edgelist = graph_objects[1];
("Starting Draw");

result = []
ri = 0;

function draw() {
    console.log("Drawing");
    window.requestAnimationFrame(draw);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '3vw Recursive, sans-serif';

    for (let e in edgelist) {
        edge = edgelist[e];
        edge.draw();
    }
    for (let n in nodelist) {
        node = nodelist[n];
        node.draw();
    }
    if (result.length > 0) {
        ri++;
        console.log(ri, result != []);
        sleep(1000);
        for (let n in nodelist) {
            node = nodelist[n];
            if (node.value == result[ri]) {
                node.color = "#ff0000";
            }
        }
    }
}

var selected_node = false;
var clickednode = [];


//depth first trbaversal
function depth_first_traversal(graph, s) {
    var c = 0;
    var stack = [s];
    var final_stack = [];
    while (stack.length > 0) {
        var current = stack.pop();
        final_stack.push(current);
        for (let neighbour of graph[current]) {
            stack.push(neighbour)
            c++;
        }
        if (c > 10000) {
            window.alert("Graph was cyclic, or has too many edges.");
            break;
        }
    }
    return final_stack;
}

draw();