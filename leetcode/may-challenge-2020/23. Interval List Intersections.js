// Given two lists of closed intervals, each list of intervals is pairwise disjoint and in sorted order.

// Return the intersection of these two interval lists.

// (Formally, a closed interval [a, b] (with a <= b) denotes the set of real numbers x with a <= x <= b.  The intersection of two closed intervals is a set of real numbers that is either empty, or can be represented as a closed interval.  For example, the intersection of [1, 3] and [2, 4] is [2, 3].)

// SOLUTION 1:

// intervalIntersection :: ([[Number]], [[Number]]) -> [[Number]]
const intervalIntersection = function(A, B) {
    let result = [];

    for(let i = 0; i < A.length; i++) {
        let [l, r] = A[i];

        for(let j = 0; j < B.length; j++) {
            let [ll, rr] = B[j];
            let intersection = null;

            if(r === ll) {
                intersection = [r, ll];
            } else if(l === rr) {
                intersection = [l, rr];
            } else if(ll < r && l < rr) {
                intersection = [Math.max(ll, l), Math.min(r, rr)];
            }

            intersection && result.push(intersection)
        }
    }

    return result;
};

// SOLUTION 2:

// intervalIntersection :: ([[Number]], [[Number]]) -> [[Number]]
const intervalIntersection = function(A, B) {
    let result = [];

    let a = 0;
    let b = 0;

    while(a < A.length && b < B.length) {
        const maxLeft = Math.max(A[a][0], B[b][0]);
        const minRight = Math.min(A[a][1], B[b][1]);

        if(maxLeft <= minRight) result.push([maxLeft, minRight]);

        if(minRight === A[a][1]) a++;
        else b++;
    }

    return result;
};
