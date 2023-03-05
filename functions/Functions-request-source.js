// This example shows how to make a call to an open API (no authentication required)
// to retrieve asset price from a symbol(e.g., ETH) to another symbol (e.g., USD)

// CryptoCompare API https://min-api.cryptocompare.com/documentation?key=Price&cat=multipleSymbolsFullPriceEndpoint

// Refer to https://github.com/smartcontractkit/functions-hardhat-starter-kit#javascript-code

// Arguments can be provided when a request is initated on-chain and used in the request source code as shown below
// TODO: Fetch Material price by quality through http GET
const COST_OF_MATERIAL = 20;
const txid = args[0];

// make HTTP request
const url = `https://arweave.net/${txid}`;
console.log(`HTTP GET Request to ${url}`);

// construct the HTTP Request object. See: https://github.com/smartcontractkit/functions-hardhat-starter-kit#javascript-code
// params used for URL query parameters
// Example of query: https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD
const arweaveFileRequest = Functions.makeHttpRequest({
  url: url,
  responseType: 'arraybuffer'
})

// Execute the API request (Promise)
// Note 2 MB limitation from Arweave Files
const arweaveFileResponse = await arweaveFileRequest
if (arweaveFileResponse.error) {
  console.error(arweaveFileResponse.error)
  throw Error("Request failed")
}

const stlFile = arweaveFileResponse["data"]
if (stlFile.Response === "Error") {
  console.error(stlFile.Message)
  throw Error(`Functional error. Read message: ${stlFile.Message}`)
}

// Vertex
function Vertex (v1,v2,v3) {
	this.v1 = Number(v1);
	this.v2 = Number(v2);
	this.v3 = Number(v3);
}

// Vertex Holder
function VertexHolder (vertex1,vertex2,vertex3) {
	this.vert1 = vertex1;
	this.vert2 = vertex2;
	this.vert3 = vertex3;
}

// transforming a Node.js Buffer into a V8 array buffer
function _toArrayBuffer (buffer) {
	var 
	ab = new ArrayBuffer(buffer.length),
	view = new Uint8Array(ab);
	
	for (var i = 0; i < buffer.length; ++i) {
		view[i] = buffer[i];
	}
	return ab;
}

// calculation of the triangle volume
// source: http://stackoverflow.com/questions/6518404/how-do-i-calculate-the-volume-of-an-object-stored-in-stl-files
function _triangleVolume (vertexHolder) {
	var 
	v321 = Number(vertexHolder.vert3.v1 * vertexHolder.vert2.v2 * vertexHolder.vert1.v3),
	v231 = Number(vertexHolder.vert2.v1 * vertexHolder.vert3.v2 * vertexHolder.vert1.v3),
	v312 = Number(vertexHolder.vert3.v1 * vertexHolder.vert1.v2 * vertexHolder.vert2.v3),
	v132 = Number(vertexHolder.vert1.v1 * vertexHolder.vert3.v2 * vertexHolder.vert2.v3),
	v213 = Number(vertexHolder.vert2.v1 * vertexHolder.vert1.v2 * vertexHolder.vert3.v3),
	v123 = Number(vertexHolder.vert1.v1 * vertexHolder.vert2.v2 * vertexHolder.vert3.v3);
  // 
	return Number(1.0/6.0)*(-v321 + v231 + v312 - v132 - v213 + v123);
}

function _boundingBox (vertexes) {
  if (vertexes.length === 0) return [0,0,0]
  
  var minx = Infinity,  maxx = -Infinity,  miny = Infinity,  maxy = -Infinity,  minz = Infinity,  maxz = -Infinity;
  var tminx = Infinity, tmaxx = -Infinity, tminy = Infinity, tmaxy = -Infinity, tminz = Infinity, tmaxz = -Infinity;

  vertexes.forEach(function(vertexHolder) {
    tminx = Math.min(vertexHolder.vert1.v1, vertexHolder.vert2.v1, vertexHolder.vert3.v1)
    minx  = tminx < minx ? tminx : minx
    tmaxx = Math.max(vertexHolder.vert1.v1, vertexHolder.vert2.v1, vertexHolder.vert3.v1)
    maxx  = tmaxx > maxx ? tmaxx : maxx


    tminy = Math.min(vertexHolder.vert1.v2, vertexHolder.vert2.v2, vertexHolder.vert3.v2)
    miny  = tminy < miny ? tminy : miny
    tmaxy = Math.max(vertexHolder.vert1.v2, vertexHolder.vert2.v2, vertexHolder.vert3.v2)
    maxy  = tmaxy > maxy ? tmaxy : maxy


    tminz = Math.min(vertexHolder.vert1.v3, vertexHolder.vert2.v3, vertexHolder.vert3.v3)
    minz  = tminz < minz ? tminz : minz
    tmaxz = Math.max(vertexHolder.vert1.v3, vertexHolder.vert2.v3, vertexHolder.vert3.v3)
    maxz  = tmaxz > maxz ? tmaxz : maxz
  });

  return [maxx - minx, maxy - miny, maxz - minz];
}

// parsing an STL ASCII string
function _parseSTLString (stl) {
	var totalVol = 0;
	// yes, this is the regular expression, matching the vertexes
	// it was kind of tricky but it is fast and does the job
	var vertexes = stl.match(/facet\s+normal\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+outer\s+loop\s+vertex\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+vertex\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+vertex\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+endloop\s+endfacet/g);

  var preVertexHolder;
  var verteces = Array(vertexes.length)
	vertexes.forEach(function (vert, i) {
		preVertexHolder = new VertexHolder();
		vert.match(/vertex\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s/g).forEach(function (vertex, i) {
			var tempVertex	= vertex.replace('vertex', '').match(/[-+]?[0-9]*\.?[0-9]+/g);
			var preVertex	= new Vertex(tempVertex[0],tempVertex[1],tempVertex[2]);
			preVertexHolder['vert'+(i+1)] = preVertex;
		});
		var partVolume = _triangleVolume(preVertexHolder);
		totalVol += Number(partVolume);
    verteces[i] = preVertexHolder
	})

	var volumeTotal = Math.abs(totalVol)/1000;
	return {
		volume: volumeTotal, 		    // cubic cm
		weight: volumeTotal * 1.04,	// gm
    boundingBox: _boundingBox(verteces),
	}
}

// parsing an STL Binary File
// (borrowed some code from here: https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/STLLoader.js)
function _parseSTLBinary (buf) {
	buf = _toArrayBuffer(buf);

	var 
	headerLength	= 80,
	dataOffset		= 84,
	faceLength		= 12*4 + 2,
	le = true; // is little-endian

	var 
	dvTriangleCount	= new DataView(buf, headerLength, 4),
	numTriangles	= dvTriangleCount.getUint32(0, le),
	totalVol		= 0;

  var verteces = Array(numTriangles)
	for (var i = 0; i < numTriangles; i++) {
		var 
		dv			= new DataView(buf, dataOffset + i*faceLength, faceLength),
		normal		= new Vertex(dv.getFloat32(0, le), dv.getFloat32(4, le), dv.getFloat32(8, le)),
		vertHolder	= new VertexHolder();
		for(var v = 3; v < 12; v+=3) {
			var vert = new Vertex(dv.getFloat32(v*4, le), dv.getFloat32((v+1)*4, le), dv.getFloat32( (v+2)*4, le ) );
			vertHolder['vert'+(v/3)] = vert;
		}
		totalVol += _triangleVolume(vertHolder);
    verteces[i] = vertHolder;
	}

	var volumeTotal = Math.abs(totalVol)/1000;
	return {
		volume: volumeTotal,		    // cubic cm
		weight: volumeTotal * 1.04,	// gm
    boundingBox: _boundingBox(verteces),
	}
}

// NodeStl
// =======
// > var stl = NodeStl(__dirname + '/myCool.stl');
// > console.log(stl.volume + 'cm^3');
// > console.log(stl.weight + 'gm');
function NodeStl(buf) {
  // Decoded Base64 String
	var isAscii = true;
	
	for (var i=0, len=buf.length; i<len; i++) {
		if (buf[i] > 127) { isAscii=false; break; }
	}

	if (isAscii)
		return _parseSTLString(buf.toString());
	else
		return _parseSTLBinary(buf);
}

console.log(NodeStl(stlFile));

// Solidity doesn't support decimals so multiply by 100 and round to the nearest integer
// Use Functions.encodeUint256 to encode an unsigned integer to a Buffer
return Functions.encodeUint256(Math.round(NodeStl(stlFile).volume * COST_OF_MATERIAL * 100));
