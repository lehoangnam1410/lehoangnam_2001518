
// giải soduko
function SudokuSolver() {
	var puzzle_table = [];
	//check điều kiện thỏa mãn
	function check_candidate(num, row, col) {
		for (var i = 0; i < 9; i++) {
			var b_index = ((Math.floor(row / 3) * 3) + Math.floor(i / 3)) * 9 + (Math.floor(col / 3) * 3) + (i % 3);
			if (num == puzzle_table[(row * 9) + i] ||
				num == puzzle_table[col + (i * 9)] ||
				num == puzzle_table[b_index]) {
				return false;
			}
		}
		return true;
	}
	// tìm vị trị ô trống
	function get_candidate(index) {
		if (index >= puzzle_table.length) {
			return true;
		} else if (puzzle_table[index] != 0) {
			return get_candidate(index + 1);
		}

		for (var i = 1; i <= 9; i++) {
			if (check_candidate(i, Math.floor(index / 9), index % 9)) {
				puzzle_table[index] = i;
				if (get_candidate(index + 1)) {
					return true;
				}
			}
		}

		puzzle_table[index] = 0;
		return false;
	}
	// chia theo nhóm
	function chunk_in_groups(arr) {
		var result = [];
		for (var i = 0; i < arr.length; i += 9) {
			result.push(arr.slice(i, i + 9));
		}
		return result;
	}
 
	this.solve = function (puzzle, options) {
		options = options || {};
		var result = options.result || 'string';
		puzzle_table = puzzle.split('').map(function (v) { return isNaN(v) ? 0 : +v });

		if (puzzle.length !== 81) return 'Puzzle is not valid.'
		return !get_candidate(0) ? 'No solution found.' : result === 'chunks' ? chunk_in_groups(puzzle_table) : result === 'array' ? puzzle_table : puzzle_table.join('');
	}
}

if (typeof exports !== 'undefined') {
	if (typeof module !== 'undefined' && module.exports) {
		exports = module.exports = SudokuSolver;
	}
	exports.SudokuSolver = SudokuSolver;
} else {
	window.SudokuSolver = SudokuSolver;
}
