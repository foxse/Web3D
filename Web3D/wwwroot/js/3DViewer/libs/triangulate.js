var lodash = _;
// var poly2tri = require("poly2tri");
// var PNLTRI = require("pnltri");
// var earcut = require("earcut");
//var libtess = require("libtess");
//var points3dto2d = require("points-3d-to-2d");

// TODO: Support holes
// https://github.com/r3mi/poly2tri.js#usage
// https://github.com/jahting/pnltri.js#usage

// Points: [[x,y,x], [...]]
var triangulateLibtess = function(points) {
  var points2D = points3dto2d(lodash.clone(points)).points;
  var faces = triangulate([points2D]);

  return faces;
};

var tessy = (function initTesselator() {
  // Function called for each vertex of tesselator output
  function vertexCallback(data, polyVertArray) {
    // console.log(data[0], data[1]);
    polyVertArray[polyVertArray.length] = data[0];
    polyVertArray[polyVertArray.length] = data[1];
  }

  function begincallback(type) {
    if (type !== libtess.primitiveType.GL_TRIANGLES) {
      throw new Error("Expected TRIANGLES but got type: " + type);
    }
  }

  function errorcallback(errno) {
    throw new Error("Error number: " + errno);
  }

  // Callback for when segments intersect and must be split
  function combinecallback(coords, data, weight) {
    // console.log("combine callback");
    return [coords[0], coords[1], coords[2]];
  }

  function edgeCallback(flag) {
    // Don't really care about the flag, but need no-strip/no-fan behavior
    // console.log("edge flag: " + flag);
  }

  var tessy = new libtess.GluTesselator();
  // tessy.gluTessProperty(libtess.gluEnum.GLU_TESS_WINDING_RULE, libtess.windingRule.GLU_TESS_WINDING_POSITIVE);
  tessy.gluTessCallback(libtess.gluEnum.GLU_TESS_VERTEX_DATA, vertexCallback);
  tessy.gluTessCallback(libtess.gluEnum.GLU_TESS_BEGIN, begincallback);
  tessy.gluTessCallback(libtess.gluEnum.GLU_TESS_ERROR, errorcallback);
  tessy.gluTessCallback(libtess.gluEnum.GLU_TESS_COMBINE, combinecallback);
  tessy.gluTessCallback(libtess.gluEnum.GLU_TESS_EDGE_FLAG, edgeCallback);

  // tessy.gluTessProperty(libtess.gluEnum.GLU_TESS_BOUNDARY_ONLY, true);

  return tessy;
})();

function triangulate(contours) {
  // libtess will take 3d verts and flatten to a plane for tesselation
  // since only doing 2d tesselation here, provide z=1 normal to skip
  // iterating over verts only to get the same answer.
  // comment out to test normal-generation code
  tessy.gluTessNormal(0, 0, 1);

  var triangleVerts = [];
  tessy.gluTessBeginPolygon(triangleVerts);

  for (var i = 0; i < contours.length; i++) {
    tessy.gluTessBeginContour();

    var contour = contours[i];

    for (var j = 0; j < contour.length; j++) {
      var coords = [contour[j][0], contour[j][1], 0];
      tessy.gluTessVertex(coords, coords);
    }

    tessy.gluTessEndContour();
  }

  tessy.gluTessEndPolygon();

  var vertexIndexes = {};

  // TODO: There must be a more robust way to find the face index using libtess

  lodash.each(lodash.flatten(contours), function(vertex, index) {
    vertexIndexes[vertex.toString()] = index;
  });

  // Map face vertices to indexes
  // 6 per chuck as coordinates are flattened (3 groups of 2 coords)
  var faces = lodash.map(lodash.chunk(triangleVerts, 6), function(triVerts) {
    return [vertexIndexes[[triVerts[0], triVerts[1]].toString()], vertexIndexes[[triVerts[2], triVerts[3]].toString()], vertexIndexes[[triVerts[4], triVerts[5]].toString()]];
  });

  return faces;
}

// This ignores colinear edges and so the final output often contains errors as
// it's not suitable for representing 3D geometry.
//
// Points: [[x,y,x], [...]]
// var triangulateEarcut = function(points) {
//   var points2D = points3dto2d(lodash.clone(points)).points;
//   var faces = lodash.chunk(earcut(lodash.flatten(points2D)), 3);
//   return faces;
// };

// This often errors out (or logs to console) ERR add_segment, etc.
//
// Points: [[x,y,x], [...]]
var triangulatePnlTri = function(points) {
  var triangulator = new PNLTRI.Triangulator();

  var cPoints = lodash.clone(points);
  var cPoints2D = points3dto2d(cPoints);

  var contour2D = lodash.map(cPoints2D.points, function(point) {
    var point2D = {
      x: point[0],
      y: point[1]
    };

    return point2D;
  });

  var faces = triangulator.triangulate_polygon([contour2D]);

  return faces;
};

// This completely fails in situations with colinear edges and other common
// geometry
//
// Points: [[x,y,x], [...]]
// var triangulatePoly2Tri = function(points) {
//   var cPoints = lodash.clone(points);
//
//   // Remove last vertex if same as first as poly2tri doesn"t like repeated vertices
//   if (lodash.isEqual(cPoints[0], cPoints[cPoints.length - 1])) {
//     cPoints.pop();
//   }
//
//   // Convert to 2D coordinates based on dominant axis
//   // Dominant axis is the one the points are least variable on (most flat)
//   // var contour2D = lodash.map(cPoints, function(point) {
//   //   var pointArr = lodash.filter(point, function(coord, index) {
//   //     return (index != dominantAxisIndex);
//   //   });
//   //
//   //   var point2D = {
//   //     x: pointArr[0],
//   //     y: pointArr[1]
//   //   };
//   //
//   //   return point2D;
//   // });
//
//   var contour2D = lodash.map(points3dto2d(cPoints).points, function(point) {
//     var point2D = {
//       x: point[0],
//       y: point[1]
//     };
//
//     return point2D;
//   });
//
//   var swctx = new poly2tri.SweepContext(lodash.flatten(contour2D));
//
//   swctx.triangulate();
//   var triangles = swctx.getTriangles();
//
//   var faces = [];
//
//   lodash.each(triangles, function(triangle) {
//     var faceIndexes = [];
//     var triPoints = triangle.getPoints();
//
//     lodash.each(triPoints, function(triPoint) {
//       faceIndexes.push(lodash.findIndex(contour2D, function(point) {
//         return (point.x === triPoint.x && point.y === triPoint.y);
//       }));
//     });
//
//     // TODO: Check face normal matches / is within tolerance of polygon normal
//     // - If not, reverse vertex order
//
//     faces.push(faceIndexes);
//   });
//
//   return faces;
// };

//module.exports = triangulateLibtess;
