import React, { Component } from "react";
import { hierarchy, tree, selection } from "d3";
import "./App.css";

const treeData = {
  value: 4,
  left: {
    value: 2,
    left: {
      value: 1
    },
    right: {
      value: 3
    }
  },
  right: {
    value: 6,
    right: {
      value: 7,
    }
  }
};

class App extends Component {
  drawVerticalTree(treeData) {
    const margin = { top: 40, right: 120, bottom: 20, left: 120 };
    const width = 960 - margin.right - margin.left;
    const height = 300 - margin.top - margin.bottom;

    const treemap = tree().size([width, height]);
    let nodes = hierarchy(treeData, d => {
      if (d.left || d.right) return [d.left || {}, d.right || {}];
      return [];
    });
    nodes = treemap(nodes);

    const svg = selection("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // adds the links between the nodes
    g.selectAll(".link")
      .data(
        nodes
          .descendants()
          .slice(1)
          .filter(e => Object.keys(e.data).length)
      )
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        d => `
      M ${d.x}, ${d.y}
      L ${d.parent.x} ${d.parent.y}
      `
      );
    const node = g
      .selectAll(".node")
      .data(() => nodes.descendants().filter(e => Object.keys(e.data).length))
      .enter()
      .append("g")
      .attr("class", () => "node")
      .attr("transform", d => "translate(" + d.x + "," + d.y + ")");
    // .on("click", handleNodeClick);

    // adds the circle to the node
    node.append("circle").attr("r", 15);

    // adds the text to the node
    node
      .append("text")
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(d => d.data.value);
  }

  render() {
    this.drawVerticalTree(treeData);
    return (
      <div className="App">
        <p className="App-intro" style={{ paddingLeft: '13px' }}>Take what you can, give nothing back</p>
      </div>
    );
  }
}

export default App;
