// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The transformation first applies scale, then rotation, and finally translation.
// The given rotation value is in degrees.

function multiplyMatrix(A, B) {
	let result = Array(0,0,0,0,0,0,0,0,0);
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			for(let k=0; k < 3; k++) {
				result[i+j*3] += A[i+k*3] * B[k+j*3];
			}
		}
	}
	return result;
}

function GetTransform( positionX, positionY, rotation, scale )
{


	let rad = rotation * Math.PI/180;
	let matrix_begin = Array(1, 0, 0, 0, 1, 0, 0, 0, 1);
	let matrix_scale = Array(scale, 0, 0, 0, scale, 0, 0, 0, 1);
	let matrix_rotation = Array(Math.cos(rad), Math.sin(rad), 0, -Math.sin(rad), Math.cos(rad), 0, 0, 0, 1);
	let matrix_translation = Array(1, 0, 0, 0, 1, 0, positionX, positionY, 1);
	console.log(matrix_translation);

	let result_scale = multiplyMatrix(matrix_scale, matrix_begin);
    let result_rotation = multiplyMatrix(matrix_rotation, result_scale);
    let result_translation = multiplyMatrix(matrix_translation, result_rotation);

	return result_translation;
	
}

// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The arguments are transformation matrices in the same format.
// The returned transformation first applies trans1 and then trans2.
function ApplyTransform( trans1, trans2 ) {
	return multiplyMatrix(trans2, trans1);
}