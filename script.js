let currentLevel = 1;
let score = 0;
let attempts = 0;
let levelAttempts = 0;

const levels = [
  {
    title: "Level 1: Fix the Array Loop",
    description: "Fix the loop condition to avoid index out of bounds error",
    code: `int arr[5] = {2, 4, 6, 8, 10};
int sum = 0;
for(int i = 0; i <= 5; i++){
    sum = sum + arr[i];
}`,
    array: [2, 4, 6, 8, 10],
    checkSolution: (code) => {
      if (code.includes("i <= 5") || code.includes("i<=5")) {
        return { correct: false, message: "❌ Index out of bounds! Array has 5 elements (index 0-4), but loop tries to access index 5." };
      }
      if (code.includes("i < 5") || code.includes("i<5")) {
        return { correct: true, message: "✅ Perfect! The loop now correctly iterates from index 0 to 4. Sum = 30" };
      }
      return { correct: false, message: "❌ Loop condition is incorrect. Hint: Arrays with 5 elements have valid indices 0 to 4." };
    },
    hint: "💡 Array indices start at 0. If an array has 5 elements, valid indices are 0, 1, 2, 3, 4. Use < instead of <=",
    expectedSum: 30
  },
  {
    title: "Level 2: Find Maximum Element",
    description: "Complete the code to find the maximum element in the array",
    code: `int arr[6] = {12, 45, 7, 23, 67, 34};
int max = arr[0];
for(int i = 1; i < 6; i++){
    // Add your comparison logic here
    
}`,
    array: [12, 45, 7, 23, 67, 34],
    checkSolution: (code) => {
      if (code.includes("if") && (code.includes("arr[i] > max") || code.includes("arr[i]>max"))) {
        if (code.includes("max = arr[i]") || code.includes("max=arr[i]")) {
          return { correct: true, message: "✅ Excellent! Maximum element found: 67" };
        }
        return { correct: false, message: "❌ Comparison is correct, but you need to update 'max' with the new value." };
      }
      return { correct: false, message: "❌ Add an if statement to compare arr[i] with max." };
    },
    hint: "💡 Compare each element with the current max. If arr[i] is greater, update max to arr[i].",
    expectedMax: 67
  },
  {
    title: "Level 3: Reverse Array Logic",
    description: "Fix the array reversal algorithm",
    code: `int arr[5] = {10, 20, 30, 40, 50};
int n = 5;
for(int i = 0; i < n; i++){
    int temp = arr[i];
    arr[i] = arr[n - i - 1];
    arr[n - i - 1] = temp;
}`,
    array: [10, 20, 30, 40, 50],
    checkSolution: (code) => {
      if (code.includes("i < n/2") || code.includes("i<n/2") || code.includes("i < 2") || code.includes("i<2")) {
        return { correct: true, message: "✅ Great! Array reversed correctly: [50, 40, 30, 20, 10]" };
      }
      return { correct: false, message: "❌ The loop is swapping elements twice, returning to original. How many swaps are needed?" };
    },
    hint: "💡 When reversing an array, you only need to swap the first half with the second half. Think: n/2",
    expectedReversed: [50, 40, 30, 20, 10]
  },
  {
    title: "Level 4: Binary Search Bug",
    description: "Fix the infinite loop in binary search",
    code: `int arr[7] = {2, 5, 8, 12, 16, 23, 38};
int target = 23;
int left = 0, right = 6;
while(left <= right){
    int mid = (left + right) / 2;
    if(arr[mid] == target){
        // Found!
        break;
    }
    else if(arr[mid] < target){
        left = mid;
    }
    else{
        right = mid;
    }
}`,
    array: [2, 5, 8, 12, 16, 23, 38],
    checkSolution: (code) => {
      const hasMidPlus1 = code.includes("left = mid + 1") || code.includes("left=mid+1");
      const hasMidMinus1 = code.includes("right = mid - 1") || code.includes("right=mid-1");
      
      if (hasMidPlus1 && hasMidMinus1) {
        return { correct: true, message: "✅ Perfect! Binary search works correctly. Element found at index 5." };
      }
      if (!hasMidPlus1 && !hasMidMinus1) {
        return { correct: false, message: "❌ Infinite loop detected! left and right never converge." };
      }
      return { correct: false, message: "⚠️ Partially correct. Update both left and right with +1 and -1 respectively." };
    },
    hint: "💡 When moving left or right pointers, add/subtract 1 to avoid checking the same mid value repeatedly.",
    expectedIndex: 5
  },
  {
    title: "Level 5: Bubble Sort Optimization",
    description: "Complete the bubble sort to work correctly",
    code: `int arr[5] = {64, 34, 25, 12, 22};
int n = 5;
for(int i = 0; i < n-1; i++){
    for(int j = 0; j < n-i-1; j++){
        // Add comparison and swap logic
        
    }
}`,
    array: [64, 34, 25, 12, 22],
    checkSolution: (code) => {
      const hasComparison = code.includes("arr[j] > arr[j+1]") || code.includes("arr[j]>arr[j+1]");
      const hasSwap = code.includes("temp") && code.includes("arr[j+1]");
      
      if (hasComparison && hasSwap) {
        return { correct: true, message: "✅ Excellent! Array sorted: [12, 22, 25, 34, 64]" };
      }
      if (hasComparison && !hasSwap) {
        return { correct: false, message: "⚠️ Comparison found, but elements aren't being swapped." };
      }
      return { correct: false, message: "❌ Add logic to compare adjacent elements and swap if needed." };
    },
    hint: "💡 Compare arr[j] with arr[j+1]. If arr[j] > arr[j+1], swap them using a temporary variable.",
    expectedSorted: [12, 22, 25, 34, 64]
  }
];

// Initialize the game
function init() {
  loadLevel(currentLevel);
  updateStats();
  updateProgress();
}

// Load a specific level
function loadLevel(levelNum) {
  const level = levels[levelNum - 1];
  document.getElementById("level-title").textContent = level.title;
  document.getElementById("level-description").textContent = level.description;
  document.getElementById("code").value = level.code;
  document.getElementById("feedback").textContent = "";
  document.getElementById("feedback").className = "";
  document.getElementById("hint-box").classList.remove("show");
  document.getElementById("next-btn").disabled = true;
  levelAttempts = 0;
  renderArray();
  clearVariables();
}

// Render array visualization
function renderArray(activeIndex = -1, errorIndex = -1) {
  const level = levels[currentLevel - 1];
  const container = document.getElementById("array");
  container.innerHTML = "";

  level.array.forEach((val, idx) => {
    const box = document.createElement("div");
    box.className = "box";
    if (idx === activeIndex) box.classList.add("active");
    if (idx === errorIndex) box.classList.add("error");
    
    const indexLabel = document.createElement("div");
    indexLabel.className = "box-index";
    indexLabel.textContent = `[${idx}]`;
    box.appendChild(indexLabel);
    
    const valueSpan = document.createElement("span");
    valueSpan.textContent = val;
    box.appendChild(valueSpan);
    
    container.appendChild(box);
  });
}

// Show variables
function showVariables(vars) {
  const container = document.getElementById("variables");
  container.innerHTML = "<strong>Variables:</strong><br>";
  for (let key in vars) {
    const varItem = document.createElement("div");
    varItem.className = "variable-item";
    varItem.textContent = `${key} = ${vars[key]}`;
    container.appendChild(varItem);
  }
}

// Clear variables
function clearVariables() {
  document.getElementById("variables").innerHTML = "";
}

// Animate loop execution
function animateLoop(level, callback) {
  let i = 0;
  const interval = setInterval(() => {
    if (i < level.array.length) {
      renderArray(i);
      
      if (level === levels[0]) { // Level 1: Sum
        const sum = level.array.slice(0, i + 1).reduce((a, b) => a + b, 0);
        showVariables({ i: i, sum: sum });
      } else if (level === levels[1]) { // Level 2: Max
        const currentMax = Math.max(...level.array.slice(0, i + 1));
        showVariables({ i: i, max: currentMax });
      }
      
      i++;
    } else {
      clearInterval(interval);
      renderArray();
      if (callback) callback();
    }
  }, 600);
}

// Run code
function runCode() {
  attempts++;
  levelAttempts++;
  const code = document.getElementById("code").value;
  const level = levels[currentLevel - 1];
  const feedback = document.getElementById("feedback");
  
  const result = level.checkSolution(code);
  
  feedback.textContent = result.message;
  feedback.className = result.correct ? "success" : "error";
  
  if (result.correct) {
    // Calculate score based on attempts
    const levelScore = Math.max(100 - (levelAttempts - 1) * 10, 50);
    score += levelScore;
    
    // Animate the solution
    animateLoop(level, () => {
      document.getElementById("next-btn").disabled = false;
    });
  } else {
    // Show error animation
    if (currentLevel === 1 && code.includes("i <= 5")) {
      renderArray(-1, 5); // Show error at non-existent index
    }
  }
  
  updateStats();
}

// Show hint
function showHint() {
  const level = levels[currentLevel - 1];
  const hintBox = document.getElementById("hint-box");
  hintBox.textContent = level.hint;
  hintBox.classList.toggle("show");
}

// Reset level
function resetLevel() {
  loadLevel(currentLevel);
}

// Next level
function nextLevel() {
  if (currentLevel < levels.length) {
    currentLevel++;
    loadLevel(currentLevel);
    updateStats();
    updateProgress();
  } else {
    // Game completed
    const feedback = document.getElementById("feedback");
    feedback.textContent = `🎉 Congratulations! You've completed all levels! Final Score: ${score}`;
    feedback.className = "success";
    document.getElementById("next-btn").disabled = true;
  }
}

// Update statistics
function updateStats() {
  document.getElementById("current-level").textContent = currentLevel;
  document.getElementById("score").textContent = score;
  document.getElementById("attempts").textContent = attempts;
}

// Update progress bar
function updateProgress() {
  const progress = (currentLevel / levels.length) * 100;
  document.getElementById("progress").style.width = `${progress}%`;
}

// Initialize game on load
window.onload = init;
