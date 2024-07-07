// Swap function.
function swap(el1, el2) {
	let temp = el1.style.height;
	el1.style.height = el2.style.height;
	el2.style.height = temp;
}

let out = document.getElementById("sortout");

// button disable funnction
function disableSortingBtn() {
	document.getElementById("bubbleSort").disabled = true;
	document.getElementById("insertionSort").disabled = true;
	document.getElementById("mergeSort").disabled = true;
	document.getElementById("quickSort").disabled = true;
	document.getElementById("selectionSort").disabled = true;
}

// button enable funnction
function enableSortingBtn() {
	document.getElementById("bubbleSort").disabled = false;
	document.getElementById("insertionSort").disabled = false;
	document.getElementById("mergeSort").disabled = false;
	document.getElementById("quickSort").disabled = false;
	document.getElementById("selectionSort").disabled = false;
}

// Disables size 
function disableSizeSlider() {
	document.getElementById("arraysize").disabled = true;
}

// Enables size 
function enableSizeSlider() {
	document.getElementById("arraysize").disabled = false;
}

// Disables newArray 
function disableNewArrayBtn() {
	document.getElementById("newarray").disabled = true;
}

// Enables newArray 
function enableNewArrayBtn() {
	document.getElementById("newarray").disabled = false;
}

// Used in async function so that we can so animations of sorting, takes input time in ms (1000 = 1s)
function waitforme(milisec) {
	return new Promise(resolve => {
		setTimeout(() => { resolve('') }, milisec);
	})
}


let arraySize = document.getElementById('arraysize');

arraySize.addEventListener('input', function () {
	createNewArray(parseInt(arraySize.value));
});

let delay = 250;

//speed of transition
let delayElement = document.getElementById('speed');

delayElement.addEventListener('input', function () {
	delay = 350 - parseInt(delayElement.value);
});

let array = [];
createNewArray();

function createNewArray(noOfBars = 20) {
	deleteChild();
	array = [];
	for (let i = 0; i < noOfBars; i++) {
		array.push(Math.floor(Math.random() * 225) + 1);
	}
	const bars = document.getElementById('bars');
	for (let i = 0; i < noOfBars; i++) {
		console.log("loop")
		const bar = document.createElement("div");
		bar.style.height = `${array[i] * 2}px`;
		bar.classList.add('bar');
		bar.classList.add('flex-item');
		bar.classList.add(`barNo${i}`);
		bars.appendChild(bar);
	}
}

function deleteChild() {
	const bar = document.getElementById("bars");
	bar.innerHTML = '';
}

const newArray = document.getElementById("newarray");
newArray.addEventListener("click", function () {
	enableSortingBtn();
	enableSizeSlider();
	createNewArray(arraySize.value);
});

// SORTING ALGORITHMS  //

// BUBBLE SORT START  //

async function bubble() {
	const ele = document.getElementsByClassName("bar");
	for (let i = 0; i < ele.length - 1; i++) {
		for (let j = 0; j < ele.length - i - 1; j++) {
			ele[j].style.background = 'blue';
			ele[j + 1].style.background = 'blue';
			if (parseInt(ele[j].style.height) > parseInt(ele[j + 1].style.height)) {
				await waitforme(delay);
				swap(ele[j], ele[j + 1]);
			}
			ele[j].style.background = 'cyan';
			ele[j + 1].style.background = 'cyan';
		}
		ele[ele.length - 1 - i].style.background = 'green';
	}
	ele[0].style.background = 'green';
}

const bubSortbtn = document.getElementById("bubbleSort");
bubSortbtn.addEventListener('click', async function () {
	disableSortingBtn();
	disableSizeSlider();
	disableNewArrayBtn();
	out.style.display = "block";
	out.innerHTML = "Performing Bubble Sort";
	await bubble();
	out.style.display = "none";
	out.innerHTML = "";
	enableSortingBtn();
	enableSizeSlider();
	enableNewArrayBtn();
});

// BUBBLE SORT END //

// -----------------------------------------------------------

//  SELECTION SORT START  //

async function selection() {
	const ele = document.getElementsByClassName("bar");
	for (let i = 0; i < ele.length; i++) {
		let min_index = i;
		ele[i].style.background = 'blue';
		for (let j = i + 1; j < ele.length; j++) {
			ele[j].style.background = 'red';
			await waitforme(delay);
			if (parseInt(ele[j].style.height) < parseInt(ele[min_index].style.height)) {
				if (min_index !== i) {
					ele[min_index].style.background = 'cyan';
				}
				min_index = j;
			}
			else {
				ele[j].style.background = 'cyan';
			}
		}
		await waitforme(delay);
		swap(ele[min_index], ele[i]);
		ele[min_index].style.background = 'cyan';
		ele[i].style.background = 'green';
	}
}

const selectionSortbtn = document.getElementById("selectionSort");
selectionSortbtn.addEventListener('click', async function () {
	disableSortingBtn();
	disableSizeSlider();
	disableNewArrayBtn();
	out.style.display = "block";
	out.innerHTML = "Performing Selection Sort";
	await selection();
	out.style.display = "none";
	out.innerHTML = "";
	enableSortingBtn();
	enableSizeSlider();
	enableNewArrayBtn();
});

//  SELECTION SORT END  //

// ----------------------------------------------------

//  INSERTION SORT START  //

async function insertion() {
	const ele = document.getElementsByClassName("bar");
	ele[0].style.background = 'green';
	for (let i = 1; i < ele.length; i++) {
		let j = i - 1;
		let key = ele[i].style.height;
		ele[i].style.background = 'blue';

		await waitforme(delay);

		while (j >= 0 && (parseInt(ele[j].style.height) > parseInt(key))) {
			ele[j].style.background = 'blue';
			ele[j + 1].style.height = ele[j].style.height;
			j--;

			await waitforme(delay);

			for (let k = i; k >= 0; k--) {
				ele[k].style.background = 'green';
			}
		}
		ele[j + 1].style.height = key;
		ele[i].style.background = 'green';
	}
}

const inSortbtn = document.getElementById("insertionSort");
inSortbtn.addEventListener('click', async function () {
	disableSortingBtn();
	disableSizeSlider();
	disableNewArrayBtn();
	out.style.display = "block";
	out.innerHTML = "Performing Insertion Sort";
	await insertion();
	out.style.display = "none";
	out.innerHTML = "";
	enableSortingBtn();
	enableSizeSlider();
	enableNewArrayBtn();
});


//  INSERTION SORT END  //

//-----------------------------------------------------

//  MERGE SORT START  //


//let delay = 30;
async function merge(ele, low, mid, high) {

	const n1 = mid - low + 1;
	const n2 = high - mid;
	let left = new Array(n1);
	let right = new Array(n2);

	for (let i = 0; i < n1; i++) {
		await waitforme(delay);

		ele[low + i].style.background = 'orange';
		left[i] = ele[low + i].style.height;
	}
	for (let i = 0; i < n2; i++) {
		await waitforme(delay);

		ele[mid + 1 + i].style.background = 'yellow';
		right[i] = ele[mid + 1 + i].style.height;
	}
	await waitforme(delay);
	let i = 0, j = 0, k = low;
	while (i < n1 && j < n2) {
		await waitforme(delay);
		if (parseInt(left[i]) <= parseInt(right[j])) {
			// color
			if ((n1 + n2) === ele.length) {
				ele[k].style.background = 'green';
			}
			else {
				ele[k].style.background = 'lightgreen';
			}

			ele[k].style.height = left[i];
			i++;
			k++;
		}
		else {

			// color
			if ((n1 + n2) === ele.length) {
				ele[k].style.background = 'green';
			}
			else {
				ele[k].style.background = 'lightgreen';
			}
			ele[k].style.height = right[j];
			j++;
			k++;
		}
	}
	while (i < n1) {
		await waitforme(delay);

		// color
		if ((n1 + n2) === ele.length) {
			ele[k].style.background = 'green';
		}
		else {
			ele[k].style.background = 'lightgreen';
		}
		ele[k].style.height = left[i];
		i++;
		k++;
	}
	while (j < n2) {
		await waitforme(delay);

		// color
		if ((n1 + n2) === ele.length) {
			ele[k].style.background = 'green';
		}
		else {
			ele[k].style.background = 'lightgreen';
		}
		ele[k].style.height = right[j];
		j++;
		k++;
	}
}

async function mergeSort(ele, l, r) {
	if (l >= r) {
		return;
	}
	const m = l + Math.floor((r - l) / 2);

	await mergeSort(ele, l, m);
	await mergeSort(ele, m + 1, r);
	await merge(ele, l, m, r);
}

const mergeSortbtn = document.getElementById("mergeSort");
mergeSortbtn.addEventListener('click', async function () {
	let ele = document.querySelectorAll('.bar');
	let l = 0;
	let r = parseInt(ele.length) - 1;
	disableSortingBtn();
	disableSizeSlider();
	disableNewArrayBtn();
	out.style.display = "block";
	out.innerHTML = "Performing Merge Sort";
	await mergeSort(ele, l, r);
	out.style.display = "none";
	out.innerHTML = "";
	enableSortingBtn();
	enableSizeSlider();
	enableNewArrayBtn();
});

//  MERGE SORT END  //

//-------------------------------------------------------

//  QUICK SORT START  //

async function partitionLomuto(ele, l, r) {

	let i = l - 1;
	// color pivot element
	ele[r].style.background = 'red';
	for (let j = l; j <= r - 1; j++) {
		// color current element
		ele[j].style.background = 'yellow';
		// pauseChamp
		await waitforme(delay);
		if (parseInt(ele[j].style.height) < parseInt(ele[r].style.height)) {
			i++;
			swap(ele[i], ele[j]);
			// color 
			ele[i].style.background = 'orange';
			if (i != j) ele[j].style.background = 'orange';
			// pauseChamp
			await waitforme(delay);
		}
		else {
			// color if not less than pivot
			ele[j].style.background = 'pink';
		}
	}
	i++;
	// pauseChamp
	await waitforme(delay);
	swap(ele[i], ele[r]); // pivot height one
	// color
	ele[r].style.background = 'pink';
	ele[i].style.background = 'green';
	// pauseChamp
	await waitforme(delay);
	// color
	for (let k = 0; k < ele.length; k++) {
		if (ele[k].style.background != 'green')
			ele[k].style.background = 'cyan';
	}
	return i;
}

async function quickSort(ele, l, r) {
	if (l < r) {
		let pivot_index = await partitionLomuto(ele, l, r);
		await quickSort(ele, l, pivot_index - 1);
		await quickSort(ele, pivot_index + 1, r);
	}
	else {
		if (l >= 0 && r >= 0 && l < ele.length && r < ele.length) {
			ele[r].style.background = 'green';
			ele[l].style.background = 'green';
		}
	}
}

const quickSortbtn = document.getElementById("quickSort");
quickSortbtn.addEventListener('click', async function () {
	let ele = document.querySelectorAll('.bar');
	let l = 0;
	let r = ele.length - 1;
	disableSortingBtn();
	disableSizeSlider();
	disableNewArrayBtn();
	out.style.display = "block";
	out.innerHTML = "Performing Quick Sort";
	await quickSort(ele, l, r);
	out.style.display = "none";
	out.innerHTML = "";
	enableSortingBtn();
	enableSizeSlider();
	enableNewArrayBtn();
});

//  QUICK SORT END  //
