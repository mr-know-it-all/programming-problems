// Given two strings s1 and s2, write a function to return true if s2 contains the permutation of s1. In other words, one of the first string's permutations is the substring of the second string.

// SOLUTION 1:
// this is almost identical to the problem from the previous day (Find All Anagrams in a String)
// TODO: find a faster solution

// checkInclusion :: (String, String) -> Boolean
const checkInclusion = (word, string) => {
    const wordLen = word.length;
    const stringLen = string.length;

    const hash = Array.from({ length: 26 }, () => 0);
    for(let i = 0; i < wordLen; i++) hash[word.charCodeAt(i) - 97]++;

    // for every possible anagram stating from index i
    forEveryPossibleIndex:
    for(let i = 0; i + wordLen <= stringLen; i++) {
        // make a local copy of the characters hash
        const localHash = hash.slice();

        // check if all characters in this window (i -> wordSize) are in hash
        const wordLimit = i + wordLen;
        for(let j = i; j < wordLimit; j++) {
            const char = string.charCodeAt(j) - 97;
            // if a character is missing it means this is not a valid starting index
            if(localHash[char] === 0) continue forEveryPossibleIndex;
            localHash[char] -= 1;
        }

        return true;
    }

    return false;
};
