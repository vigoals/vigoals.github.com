function expansion(name)
{
	var t = document.getElementsByName(name);
	var o=t[0]
	var s = o.innerHTML;
	var p = document.createElement("span");
	var n = document.createElement("a");
	p.innerHTML = s.substring(0,500);
	n.innerHTML = s.length > 100 ? "...更多" : "";
	n.href = name+".html";
	n.className="expansion";
	o.innerHTML = "";
	o.appendChild(p);
	p.appendChild(n);
}
