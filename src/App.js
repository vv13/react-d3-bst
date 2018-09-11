import React, { Component } from "react";
import { hierarchy, tree } from "d3";
import "./App.css";
import BinarySearchTree from "./logic/BinarySearchTree";

class App extends Component {
  bst = null;
  constructor(props) {
    super(props);
    this.state = {
      inputData: "",
      outputStr: "",
      nodes: [4, 2, 1, 5, 8, 3]
    };
  }

  preOrderTraverse() {
    let str = "";
    this.bst.preOrderTraverse(nodeValue => (str += nodeValue + " "));
    this.setState({
      outputStr: str
    });
  }

  postOrderTraverse() {
    let str = "";
    this.bst.postOrderTraverse(nodeValue => (str += nodeValue + " "));
    this.setState({
      outputStr: str
    });
  }

  inOrderTraverse() {
    let str = "";
    this.bst.inOrderTraverse(nodeValue => (str += nodeValue + " "));
    this.setState({
      outputStr: str
    });
  }

  clearBst() {
    this.setState({
      nodes: []
    });
    this.bst.clear();
  }

  drawVerticalTree(nodeArrs) {
    this.bst = new BinarySearchTree(nodeArrs);
    if (!this.bst.root) return <span />;

    const margin = { top: 40, right: 120, bottom: 20, left: 120 };
    const width = 960 - margin.right - margin.left;
    const height = 300 - margin.top - margin.bottom;

    const treemap = tree().size([width, height]);
    let nodes = hierarchy(this.bst.root, d => {
      if (d.left || d.right) return [d.left || {}, d.right || {}];
      return [];
    });
    nodes = treemap(nodes)
      .descendants()
      .filter(e => Object.keys(e.data).length);

    const genPaths = () => {
      return nodes.slice(1).map(data => (
        <path
          key={data.id}
          className="link"
          d={`
          M ${data.x}, ${data.y}
          L ${data.parent.x} ${data.parent.y}
        `}
        />
      ));
    };

    const genNodes = () => {
      return nodes.map(data => (
        <g
          className="node"
          key={data.id}
          transform={`translate(${data.x},${data.y})`}
        >
          <circle r="15" />
          <text dy=".35em" style={{ textAnchor: "middle" }}>
            {data.value}
          </text>
        </g>
      ));
    };

    return (
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g transform={`translate(${margin.left},${margin.top})`}>
          {genPaths()}
          {genNodes()}
        </g>
      </svg>
    );
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
    this.bst.insertNodes(splitNodes);
    this.setState({
      nodes: this.state.nodes.concat(splitNodes),
      inputData: ""
    });
  }

  render() {
    return (
      <div className="App">
        <div class="container">
          <div className="toolbar">
            <div className="toolbarLine">
              <input
                class="appInput"
                type="text"
                placeholder="以,隔开数字"
                value={this.state.inputData}
                onChange={evt => this.changeInputData(evt.target.value)}
              />
              <button onClick={() => this.submitInputData()}>插入节点</button>
              <button onClick={() => this.clearBst()}>清空数据</button>
            </div>
            <div className="toolbarLine">
              <button onClick={() => this.preOrderTraverse()}>前序遍历</button>
              <button onClick={() => this.inOrderTraverse()}>中序遍历</button>
              <button onClick={() => this.postOrderTraverse()}>后序遍历</button>
            </div>
          </div>
          <div class="appTree">{this.drawVerticalTree(this.state.nodes)}</div>
        </div>
        <div className="console">
          {this.state.outputStr}
          {this.state.outputStr && (
            <span
              style={{ paddingLeft: "10px", cursor: "pointer" }}
              onClick={() => this.setState({ outputStr: "" })}
            >
              清空数据
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default App;
