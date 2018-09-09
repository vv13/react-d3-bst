import React, { Component } from "react";
import { hierarchy, tree, selection } from "d3";
import "./App.css";
import BinarySearchTree from "./logic/BinarySearchTree";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bst: null,
      inputData: "",
      outputStr: ""
    };
  }

  preOrderTraverse() {
    let str = "";
    this.state.bst.preOrderTraverse(nodeValue => (str += nodeValue + ' '));
    this.setState({
      outputStr: str
    });
  }

  postOrderTraverse() {
    let str = "";
    this.state.bst.postOrderTraverse(nodeValue => (str += nodeValue + ' '));
    this.setState({
      outputStr: str
    });
  }

  inOrderTraverse() {
    let str = "";
    this.state.bst.inOrderTraverse(nodeValue => (str += nodeValue + ' '));
    this.setState({
      outputStr: str
    });
  }
  clearBst() {
    document
      .querySelectorAll(".bstVm")
      .forEach(e => e.parentNode.removeChild(e));
    this.state.bst.clear();
  }

  drawVerticalTree(treeData) {
    document
      .querySelectorAll(".bstVm")
      .forEach(e => e.parentNode.removeChild(e));
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
      .attr("class", "bstVm")
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

  changeInputData(value) {
    this.setState({
      inputData: value
    });
  }

  submitInputData() {
    if (!this.state.inputData) {
      alert("请输入数据");
      return;
    }
    const splitNodes = [];
    this.state.inputData.split(",").forEach(data => {
      if (data && !Number.isNaN(+data)) splitNodes.push(+data);
    });
    this.state.bst.insertNodes(splitNodes);
    this.drawVerticalTree(this.state.bst.root);
    this.setState({
      inputData: ""
    });
  }

  componentDidMount() {
    const bstTree = new BinarySearchTree([4, 2, 1, 5, 8, 3]);
    this.setState({
      bst: bstTree
    });
    this.drawVerticalTree(bstTree.root);
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro" style={{ paddingLeft: "13px" }}>
          Take what you can, give nothing back
        </p>
        <div className="toolbar">
          <div className="toolbarLine">
            <button onClick={() => this.clearBst()}>清空数据</button>
          </div>
          <div className="toolbarLine">
            <input
              type="text"
              placeholder="以,隔开数字"
              value={this.state.inputData}
              onChange={evt => this.changeInputData(evt.target.value)}
            />
            <button onClick={() => this.submitInputData()}>插入节点</button>
          </div>
          <div className="toolbarLine">
            <button onClick={() => this.preOrderTraverse()}>前序遍历</button>
            <button onClick={() => this.inOrderTraverse()}>中序遍历</button>
            <button onClick={() => this.postOrderTraverse()}>后序遍历</button>
          </div>
        </div>
        <div className="fillData">
          {this.state.outputStr}
          {this.state.outputStr && (
            <span
              style={{ paddingLeft: "10px", cursor: "pointer" }}
              onClick={() => this.setState({ outputStr: "" })}
            >
              x
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default App;
