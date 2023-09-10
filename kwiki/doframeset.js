//doframeset.js - create a frameset based on user preferences
// left or right side menu stored in cookie
/*
main: main doc
main_id: name of main doc
side: side doc
side_id: id of side doc
sidewidth: width of side document frame
*/
function doframeset(document,main,main_id,side,side_id,sidewidth)
{/* create frameset with menu side according to cookie */
	var user = new User(document);
	if (!user.load() | !user.side) {
		user.side = 'right';
	}
	
	var left_doc, right_doc;
	var left_doc_name, right_doc_name;
	var frameset_tag = '<frameset cols =';
	if (user.side =='left') {
		frameset_tag += '"'+ sidewidth + ',*"';
		left_doc = side,left_doc_name = side_id;
		right_doc = main,right_doc_name = main_id;
	}
	else {
		frameset_tag += '"*,'+sidewidth+'"';
		left_doc = main,left_doc_name = main_id;
		right_doc = side, right_doc_name = side_id;
	}
	frameset_tag +='border = 0>';
	document.write( frameset_tag +
			' <frame frameborder=0 src="'+left_doc+'"name='+left_doc_name+'>',
			'<frame frameborder=0 src="'+right_doc+'"name='+right_doc_name+'>',
			'<noframes><body>Sorry this Document requires a Frame capable Browser.<br>',
			'Try upgrading to IE4 or Navigator 4<\/body><\/noframes><\/frameset>');
}
