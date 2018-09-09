function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

function BinarySearchTree(arrs) {
  this.root = null;
  if (arrs) this.insertNodes(arrs)
}

// 插入节点
BinarySearchTree.prototype.insert = function(value) {
  var newNode = new Node(value);
  if (this.root === null) {
    this.root = newNode;
  } else {
    BinarySearchTree.insertNode(this.root, newNode);
  }
}

// 清空树数据
BinarySearchTree.prototype.clear = function(arrs) {
  this.root = null
}

BinarySearchTree.prototype.insertNodes = function(arrs) {
  if (arrs instanceof Array) {
    arrs.forEach(item => this.insert(item));
  }
};;

// 中序遍历
BinarySearchTree.prototype.inOrderTraverse = function(cb) {
  BinarySearchTree.inOrderTraverseNode(this.root, cb);
};
BinarySearchTree.inOrderTraverseNode = function(node, cb) {
  if (node === null) return;
  BinarySearchTree.inOrderTraverseNode(node.left, cb);
  cb(node.value);
  BinarySearchTree.inOrderTraverseNode(node.right, cb);
};

// 前序遍历
BinarySearchTree.prototype.preOrderTraverse = function(cb) {
  BinarySearchTree.preOrderTraverseNode(this.root, cb);
};
BinarySearchTree.preOrderTraverseNode = function(node, cb) {
  if (node === null) return;
  cb(node.value);
  BinarySearchTree.preOrderTraverseNode(node.left, cb);
  BinarySearchTree.preOrderTraverseNode(node.right, cb);
};

// 后序遍历
BinarySearchTree.prototype.postOrderTraverse = function(cb) {
  BinarySearchTree.postOrderTraverseNode(this.root, cb);
};
BinarySearchTree.postOrderTraverseNode = function(node, cb) {
  if (node === null) return;
  BinarySearchTree.postOrderTraverseNode(node.left, cb);
  BinarySearchTree.postOrderTraverseNode(node.right, cb);
  cb(node.value);
};

BinarySearchTree.prototype.breadthFirstTraverse = function(cb) {
  BinarySearchTree.breadthFirstTraverseNode(this.root, cb);
};

BinarySearchTree.breadthFirstTraverseNode = function(node, cb) {
  var queue = [node];
  var popNode = null;
  while (queue.length) {
    popNode = queue.shift();
    if (!popNode) break;

    cb(popNode);
    if (popNode.left) {
      queue.push(popNode.left);
    }
    if (popNode.right) {
      queue.push(popNode.right);
    }
  }
};

// 获取节点数目
BinarySearchTree.prototype.getNodeCount = function() {
  return BinarySearchTree.calcNodeCount(this.root);
};

// 最小值
BinarySearchTree.prototype.getMin = function(cb) {
  var minNode = this.root;
  while (minNode.left) {
    minNode = minNode.left;
  }
  return minNode;
};

// 最大值
BinarySearchTree.prototype.getMax = function(cb) {
  var maxNode = this.root;
  while (maxNode.right) {
    maxNode = maxNode.right;
  }
  return maxNode;
};

// 搜索指定值
BinarySearchTree.prototype.search = function(value) {
  return BinarySearchTree.searchNode(this.root, value);
};

// 删除指定值
BinarySearchTree.prototype.remove = function(value) {
  this.root = BinarySearchTree.removeNode(this.root, value);
};

// 获取树的高度
BinarySearchTree.prototype.getHeight = function() {
  return BinarySearchTree.getNodeHeight(this.root);
};

// 获取节点高度
BinarySearchTree.getNodeHeight = function(node) {
  var height = heightNode(node);
  function heightNode(node) {
    if (node === null) {
      return 0;
    } else {
      return Math.max(heightNode(node.left), heightNode(node.right)) + 1;
    }
  }
  return height;
};

// 统计节点个数
BinarySearchTree.calcNodeCount = function(node) {
  if (node == null) return 0;
  return (
    1 +
    BinarySearchTree.calcNodeCount(node.left) +
    BinarySearchTree.calcNodeCount(node.right)
  );
};

// 插入节点
BinarySearchTree.insertNode = function(node, newNode) {
  if (node.value > newNode.value) {
    if (node.left === null) {
      node.left = newNode;
    } else {
      BinarySearchTree.insertNode(node.left, newNode);
    }
  } else {
    if (node.right === null) {
      node.right = newNode;
    } else {
      BinarySearchTree.insertNode(node.right, newNode);
    }
  }
};

// 搜索节点
BinarySearchTree.searchNode = function(node, value) {
  if (node === null) {
    return null;
  } else if (node.value === value) {
    return node;
  } else if (node.value < value) {
    return BinarySearchTree.searchNode(node.right, value);
  } else {
    return BinarySearchTree.searchNode(node.left, value);
  }
};

BinarySearchTree.searchNodeNoRecursion = function(node, value) {
  var result = null;
  while (node) {
    if (node.value === value) {
      result = node;
      break;
    } else if (node.value < value) {
      node = node.right;
    } else {
      node = node.left;
    }
  }
  return result;
};

BinarySearchTree.removeNodeBySearch = function(node, value) {
  var searchNode = node;
  var parent = null;
  var arrow = null;
  while (searchNode) {
    if (searchNode.value === value) {
      break;
    } else if (node.value < value) {
      parent = node;
      searchNode = searchNode.right;
      arrow = "right";
    } else {
      parent = searchNode;
      searchNode = searchNode.left;
      arrow = "left";
    }
  }
  if (!searchNode) return node;
  if (searchNode.left === null && searchNode.right === null) {
    parent[arrow] = null;
  } else if (searchNode.left === null) {
    parent[arrow] = searchNode.right;
  } else if (searchNode.right === null) {
    parent[arrow] = searchNode.left;
  } else {
    var minRightNode = searchNode.right;
    while (minRightNode !== null && minRightNode.left !== null) {
      minRightNode = minRightNode.left;
    }
    searchNode.value = minRightNode.value;
    searchNode.right = BinarySearchTree.removeNodeBySearch(
      searchNode.right,
      minRightNode.value
    );
  }
  return node;
};

BinarySearchTree.removeNode = function(node, value) {
  if (node === null) {
    return null;
  } else if (node.value < value) {
    node.right = BinarySearchTree.removeNode(node.right, value);
    return node;
  } else if (node.value > value) {
    node.left = BinarySearchTree.removeNode(node.left, value);
    return node;
  } else {
    if (node.left === null && node.right === null) {
      return null;
    } else if (node.left === null) {
      return node.right;
    } else if (node.right === null) {
      return node.left;
    } else {
      var minRightNode = node.right;
      while (minRightNode !== null && minRightNode.left !== null) {
        minRightNode = minRightNode.left;
      }
      node.value = minRightNode.value;
      node.right = BinarySearchTree.removeNode(node.right, minRightNode.value);
      return node;
    }
  }
};

export default BinarySearchTree;
