import BinarySearchTree from './BinarySearchTree'

let binarySearchTree;
beforeEach(() => {
  binarySearchTree = new BinarySearchTree([3, 2, 5, 4, 7]);
});

describe("test BinarySearchTree object method", () => {
  test("insert and search", () => {
    binarySearchTree.insert(0);
    expect(binarySearchTree.search(0)).toBeTruthy();
  });

  test("getHeight", () => {
    expect(binarySearchTree.getHeight()).toBe(3);
  });

  test("getMax & getMin", () => {
    expect(binarySearchTree.getMax().value).toBe(7);
    expect(binarySearchTree.getMin().value).toBe(2);
  });

  test("getNodeCount", () => {
    expect(binarySearchTree.getNodeCount()).toBe(5);
  });

  test("preOrderTraverse", () => {
    var result = [];
    var pushFn = function(res) {
      result.push(res);
    };
    binarySearchTree.preOrderTraverse(pushFn);
    expect(result).toEqual([3, 2, 5, 4, 7]);
  });

  test("postOrderTraverse", () => {
    var result = [];
    var pushFn = function(res) {
      result.push(res);
    };
    binarySearchTree.postOrderTraverse(pushFn);
    expect(result).toEqual([2, 4, 7, 5, 3]);
  });

  test("inOrderTraverse", () => {
    var result = [];
    var pushFn = function(res) {
      result.push(res);
    };
    binarySearchTree.inOrderTraverse(pushFn);
    expect(result).toEqual([2, 3, 4, 5, 7]);
  });

  test("searchNodeNoRecursion", () => {
    expect(
      BinarySearchTree.searchNodeNoRecursion(binarySearchTree.root, 7)
    ).toBeTruthy();
    expect(
      BinarySearchTree.searchNodeNoRecursion(binarySearchTree.root, 10)
    ).toBeNull();
  });
  test("removeNodeBySearch", () => {
    expect(binarySearchTree.search(3)).toBeTruthy();
    BinarySearchTree.removeNodeBySearch(binarySearchTree.root, 3);
    expect(binarySearchTree.search(3)).toBeFalsy();
  });
  test("removeNodeBySearch 7", () => {
    expect(binarySearchTree.search(7)).toBeTruthy();
    BinarySearchTree.removeNodeBySearch(binarySearchTree.root, 7);
    expect(binarySearchTree.search(7)).toBeFalsy();
  });
  test("breadthFirstTraverse", () => {
    var result = [];
    var pushFn = function(res) {
      result.push(res.value);
    };
    binarySearchTree.breadthFirstTraverse(pushFn);
    expect(result).toEqual([3, 2, 5, 4, 7]);
  });
});
