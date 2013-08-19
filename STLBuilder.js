
/**
 * A Three.js geometry-to-STL converter.
 *
 * Inspired by
 *  http://buildaweso.me/project/2013/2/25/converting-threejs-objects-to-stl-files
 *
 * @author Ikaros Kappler
 * @date 2013-08-14
 * @version 1.0.0
 **/

function saveSTL( geometry, filename ){

    if( !filename )
	filename = "extrusion.stl";
    
    var stlString = buildSTL( geometry );  
    var blob = new Blob([stlString], {type: 'text/plain'});
    saveAs(blob, filename);
    
}

function buildSTL( geometry ) {

    var vertices = geometry.vertices;
    // Warning!
    // The faces may be Face4 and not Face3!
    var tris     = geometry.faces;
    
    // Use an array as StringBuffer (concatenation is extremely slow in IE6).
    var stl = [];
    stl.push( "solid pixel\n" );
    for(var i = 0; i < tris.length; i++) {

	stl.push( " facet normal "+stringifyVector( tris[i].normal )+"\n");
	stl.push("  outer loop\n");
	stl.push("   " + stringifyVertex( vertices[ tris[i].a ] ) );
	stl.push("   " + stringifyVertex( vertices[ tris[i].b ] ) );
	stl.push("   " + stringifyVertex( vertices[ tris[i].c ] ) );
	stl.push("  endloop \n");
	stl.push(" endfacet \n");
	
	// Is the facet a Face4 instance?
	/*
	if( tris[i].d ) {
	    stl += (" facet normal "+stringifyVector( tris[i].normal )+"\n");
	    stl += ("  outer loop\n");
	    stl += "   " + stringifyVertex( vertices[ tris[i].a ] );
	    stl += "   " + stringifyVertex( vertices[ tris[i].b ] );
	    stl += "   " + stringifyVertex( vertices[ tris[i].c ] );
	    stl += ("  endloop \n");
	    stl += (" endfacet \n");
	}
	*/
    }
    stl.push("endsolid");
		
    // Convert array to string
    return stl.join("");
}



function stringifyVector(vec){
  return ""+vec.x+" "+vec.y+" "+vec.z;
}

function stringifyVertex(vec){
  return "vertex "+stringifyVector(vec)+" \n";
}