// https://leetcode.com/problems/detect-cycles-in-2d-grid/

// Given a 2D array of characters grid of size m x n, you need to find if there exists any cycle consisting of the same value in grid.
//
// A cycle is a path of length 4 or more in the grid that starts and ends at the same cell. From a given cell, you can move to one of the cells adjacent to it - in one of the four directions (up, down, left, or right), if it has the same value of the current cell.
//
// Also, you cannot move to the cell that you visited in your last move. For example, the cycle (1, 1) -> (1, 2) -> (1, 1) is invalid because from (1, 2) we visited (1, 1) which was the last visited cell.
//
// Return true if any cycle of the same value exists in grid, otherwise, return false.

// containsCycle :: [[String]] -> Boolean
const containsCycle = grid => {
    const [m, n] = [grid.length, grid[0].length];
    const visited = {};

    const dfs = (node_i, node_j, parent_i = '*', parent_j = '*') => {
        // we have a cycle
        if(visited[node_i + '-' + node_j]) return true;
        visited[node_i + '-' + node_j] = true;

        const possibleDirections = [
            [node_i - 1, node_j],
            [node_i + 1, node_j],
            [node_i, node_j + 1],
            [node_i, node_j - 1]
        ];
        for(let [i, j] of possibleDirections) {
            // is in bounds
            if(0 <= i && i < m && 0 <= j && j < n) {
                if(
                    // has same value as node, is in cycle
                    grid[node_i][node_j] === grid[i][j] &&
                    // not visiting parent again, avoid loops
                    (i + '-' + j) !== (parent_i + '-' + parent_j)
                ) {
                    if(dfs(i, j, node_i, node_j)) return true;
                }
            }
        }
        return false;
    }

    let found = false;
    f1:for(let i = 0; i < m; i++) {
        for(let j = 0; j < n; j++) {
            if(visited[i + '-' + j]) continue;
            if(dfs(i, j)) {
                found = true;
                break f1;
            }
        }
    }
    return found;
};
