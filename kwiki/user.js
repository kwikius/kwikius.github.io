//user.js - user cookie (js1.2)

function User(document)
{ 
	this.$document	= document;
	this.$name 	= "user_settings";
	this.$expires	= new Date(new Date().getTime()+240*3600000);
	this.$path	= '/';
	this.$domain 	= null;
	this.$secure 	= false;
}

function _User_store()
{
	var Userval= "";
	for (var prop in this) {
		if (( prop.charAt(0) == '$') || (typeof this[prop]=='function')) continue;
		Userval+= (Userval !="")?'&':'';
		Userval+= prop + ':' + escape(this[prop]);
	}
	var User = this.$name + '=' + Userval;
	User +=this.$expires?';expires='+this.$expires.toGMTString():'';
	User +=this.$path?';path='+this.$path:'';
	User +=this.$domain?';domain='+this.$domain:'';
	User +=this.$secure?';secure='+this.$secure:'';
	this.$document.cookie = User;
}

function _User_load()
{
	var allUsers; 
	if (( allUsers = this.$document.cookie)  == "") return false;
	var start,end; 
	if ((start= allUsers.indexOf(this.$name +'='))== -1) return false;
	start+= this.$name.length+1;
	if ((end = allUsers.indexOf(';',start)) == -1)  end = allUsers.length;
	var a = (allUsers.substring(start,end)).split('&');
	for (var i = 0;i < a.length;i++) a[i] = a[i].split(':');
	for (var i = 0;i < a.length;i++) this[a[i][0]]= unescape(a[i][1]);
	return true;
}
function _User_remove()
{
	var User = this.$name+'=';
	if (this.$path) User +='; path='+this.$path;
	if (this.$domain) User +='; domain='+this.$domain;
	User +=';expires=Fri, 02-Jan-1970 00:00:00 GMT';
	this.$document.cookie = User;
}
	new User();
	User.prototype.store = _User_store;
	User.prototype.load = _User_load;
	User.prototype.remove = _User_remove;





