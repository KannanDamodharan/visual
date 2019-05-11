

var MODULE = (function(algorithm) {

    algorithm.network = [];
    var colors = ['#D2581A','#E35B15','#F25D10','#D9452B','#EA3111','#D9452B','#FB2E09'];

    algorithm.successor = function(numTbl, p,i) {
        var tem;
        var t1;
        tem=0;
        if(i==0){
            t1= p;
        }
        else if(i!=0){
            t1= (p + Math.pow(2, i- 1)) % Math.pow(2, numTbl);
        }
        else {
            t1= (p+ Math.pow(2, i)) % Math.pow(2, numTbl);
        }
        while(algorithm.network[tem]<t1){
            if(tem>=0 && t1>=0){
                tem++;
                if(tem===algorithm.network.length){
                    return algorithm.network[0];
                }
                else if(t1<=0){
                    return algorithm.network[0];
                }
            }
        }
        return  algorithm.network[tem];
    }

    function getPos(svg, val){
        if(svg!=null && val!=null){
            var x1,transform;
            x1 = svg.createSVGPoint();
            x1.y = val.getAttribute("cy");
            x1.x = val.getAttribute("cx");
            transform = val.getCTM();
            if(x1!=null){
                return x1.matrixTransform(transform);
            }
            else{
                return null;
            }
        }
        return null;
    }

    algorithm.getDiagram = function() {
        var rad, height,padding,pathfinder, path, pathFind,peers, circle, radius,tblVal, selectedNode,svg, emptySvg, tem,n, numTbl, i, tem,circles,peerVal;

        padding = 47;
        algorithm.network=[];
        tblVal= document.getElementById("tblVal");
        peerVal  = document.getElementById("tblVal");
        selectedNode = document.getElementById("nodesUsed");
        svg = document.getElementById('hashTable');


        numTbl = parseInt(tblVal.options[tblVal.selectedIndex].value, 10);
        peers = selectedNode.getElementsByClassName('peer');

        if(numTbl>=0){
            for(i = 0; i< Math.pow(2, numTbl); i++) {
                if(!peers[i].classList.contains('null')){
                    if (!peers[i].classList.contains('inactive') || peers[i].classList.contains('active')) {
                        algorithm.network.push(i);
                    }
                }
            }
        }

        var maxVal =Math.pow(2,numTbl)- 1;
        var xlink = 'http://www.w3.org/1999/xlink';
        var svgLink = 'http://www.w3.org/2000/svg';
        document.getElementById('lookupNode').setAttribute('max', maxVal);
        document.getElementById('startNode').setAttribute('max', maxVal);

        emptySvg = svg.cloneNode(false);
        document.getElementById('designHelper').removeChild(svg);
        document.getElementById('designHelper').appendChild(emptySvg);
        height  = 650;
        rad   = 650;
        if(emptySvg!=null){
            svg = emptySvg;
        }
        if(svg!=null){
            svg.setAttribute('xmlns:xlink', xlink);
            svg.setAttribute('rad', rad);
            svg.setAttribute('height', height);
        }

        circle = document.createElementNS(svgLink, 'circle');
        radius = rad/ 2 - (padding* 2);
        circle.setAttribute('cx', rad/2);
        circle.setAttribute('cy', height/2);
        circle.setAttribute('r',radius);
        circle.setAttribute('stroke', 'brown');
        circle.setAttribute('fill', 'white');

        svg.appendChild(circle);
        var x = svgLink;
        var y = svgLink;
        var z = svgLink;
        var g= 'g';
        if(x!=null && y!=null && z!=null){
            pathfinder  = document.createElementNS(x,g);
            path = document.createElementNS(y,g);
            pathFind = document.createElementNS(z,g);
        }

        if(pathfinder!=null){
            pathfinder.setAttribute('transform', "translate(" + rad/2 + "," + height/2 + ")");
            pathfinder.setAttribute('class', 'chord-dht-peers');
            pathfinder.setAttribute('id', 'chord_dht_peers');
        }
        if(path!=null){
            path.setAttribute('id', 'pathData');
        }
        if(pathFind!=null){
            pathFind.setAttribute('class', 'chord-dht-peers');
        }

        svg.appendChild(path);
        svg.appendChild(pathfinder);
        svg.appendChild(pathFind);

        n = Math.pow(2, numTbl);
        tem = 0;

        circles= [];
        for(i = 0; i< n; i++) {
            circle = document.createElementNS(svgLink, 'circle');
            circle.setAttribute('r', '20');
            circle.setAttribute('stroke-rad', '0');
            circle.setAttribute('data-index', i);

            if(algorithm.network.indexOf(i) != -1 && circle!=null) {
                circle.setAttribute('fill', colors[i% colors.length]);
                tem = tem+ (360/algorithm.network.length);
                pathfinder.appendChild(circle);
                circle.setAttribute('cx', 0);
                circle.setAttribute('cy',-radius);
                circle.setAttribute('transform', 'rotate(' + tem + ')');
                circle.setAttribute('data-index', i);
            }
            circles.push(circle);
        }

        for (i = 0; i < algorithm.network.length; i++) {
            var peer = algorithm.network[i];
            var circle = circles[peer];
            var pos1 = getPos(svg, circles[peer]);

            for(tem= 0; tem< numTbl; tem++) {
                var snode = algorithm.successor(numTbl, algorithm.network[i], tem+ 1, algorithm.network);
                var pos2 = getPos(svg, circles[snode]);
                var link  ='http://www.w3.org/2000/svg';
                var p = document.createElementNS(link, 'path');
                if(p!=null){
                    p.setAttribute("d","M" +pos1.x + " " + pos1.y + " " + pos2.x + " " + pos2.y);
                    p.setAttribute("stroke", colors[peer % colors.length]);
                    p.setAttribute('opacity','0.05');
                    p.setAttribute("stroke-rad", "2");
                    p.setAttribute("class", peer);
                    p.setAttribute('id', peer + '_' + snode);
                }
                else{
                    p = document.createElementNS(link, 'path');
                }
                if(path!=null){
                    path.appendChild(p);
                }
            }

            var link1='http://www.w3.org/2000/svg';
            var txt = 'text';
            var label = document.createElementNS(link1, txt);
            if(label!=null){
                label.textContent = peer;
            }
            if(pathFind!=null){
                pathFind.appendChild(label);
            }
            if(label!=null){
                label.setAttribute('x', pos1.x);
                label.setAttribute('y', pos1.y);
                label.setAttribute('data-index', peer);
            }

            label.addEventListener('mouseover' , function(inp){algorithm.onMouseover(inp,numTbl)});
            circle.addEventListener('mouseover', function(inp){algorithm.onMouseover(inp,numTbl)});
            circle.addEventListener('mouseout', algorithm.onmousemove);
        }
    }
        algorithm.getNodes = function () {
            var selectedNode,tblVal,peer,num,i;
            if(document!=null){
                tblVal = document.getElementById("tblVal");
                selectedNode= document.getElementById("nodesUsed");
            }
            num = parseInt(tblVal.options[tblVal.selectedIndex].value, 10);
            while(selectedNode.firstChild){
                if(selectedNode.firstChild!=null){
                    selectedNode.removeChild(selectedNode.firstChild);
                }
            }

            for(i= 0; i< Math.pow(2,num); i++){
                if(num>=0 && Math.pow(2,num)>0){
                    var node ='peer';
                    var cls = 'class';
                    var turnon = 'click';
                    peer= document.createElement("div");
                    peer.textContent= i;
                    peer.setAttribute(cls, node);
                    selectedNode.appendChild(peer);
                    peer.addEventListener(turnon,function(inp){
                    inp.target.classList.toggle('inactive');
                    algorithm.getDiagram();});
                }
            }
        }
    algorithm.getNodes();
    algorithm.getDiagram();
    return algorithm;
})(MODULE || {});
