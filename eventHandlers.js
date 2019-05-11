var MODULE = (function(algorithm) {
    algorithm.onMouseover = function(inp, numTbl){
        var lin1, links,table,tt,line, index,svg,i;
        if(inp!=null && numTbl!=null){
            tt= document.getElementById('tt');
            table= tt.querySelector('.table');
            svg = document.getElementById('hashTable');
            links= svg.getElementById('pathData');
        }
        if(links!=null && links.children!=null){
        for(i = 0; i< links.children.length; i++) {
            lin1= links.children[i];
            if(lin1.getAttribute('class')== inp.target.getAttribute('data-index')){
                lin1.setAttribute('opacity', '0.9');
            }
            if(lin1.getAttribute('class')!= inp.target.getAttribute('data-index')){
                lin1.setAttribute('opacity', '0.05');
            }
        }
        }

        while(table.firstChild) {
        if(table!=null){

                table.removeChild(table.firstChild);
            }
        }

        if(numTbl!=null){
        for(var i= 0; i< numTbl; i++){
            var a1 = Math.pow(2, i) % Math.pow(2, numTbl);
            var b1 = parseInt(inp.target.getAttribute('data-index'), 10);
            var c1 = 1+i;

            line = document.createElement('div');
            line.textContent = 'i'+c1 + '-> ' + 'successor('+ (b1 + a1) + ') = '+ algorithm.successor(numTbl, b1, c1, algorithm.network);
            table.appendChild(line);
        }
        }
        tt.style.opacity= '0.9';
    }

    algorithm.onmousemove= function(inp){
        document.getElementById('tt').style.opacity = '0';
    }

    function NoOfTblValChnge(inp){
        algorithm.getNodes();
        algorithm.getDiagram();
    }

    function findPath(inp){
        if(inp!=null){
        var nr, rn, nxt,searchDt, lookupNode, selectedNode, tblVal, cur,tem4, i, tem2, tem1, links, lin1,temp5, temp6,svg,numTbl, temp1;
        if(inp!=null){
            inp.stopPropagation();
            inp.preventDefault();
        }

        searchDt=document.getElementById('lookupNode');
        lookupNode= document.getElementById('startNode');
        tblVal= document.getElementById("tblVal");
        svg= document.getElementById('hashTable');
        
        tem1= parseInt(lookupNode.value, 10);
        tem2= parseInt(searchDt.value, 10);
        numTbl=parseInt(tblVal.options[tblVal.selectedIndex].value, 10);
        links = svg.getElementById('pathData');
        for(i= 0; i< links.children.length;i++) {
        if(links!=null){
            lin1= links.children[i];
            lin1.setAttribute('opacity', '0.05');
        }
        }
        nxt= algorithm.successor(numTbl, tem2, 0);

        temp1= tem2;
        for(var i=0; i< numTbl;i++) {
            if(tem1== nxt){
                break;
            }
            else{
                nr= tem1;
                tem2= temp1;
            }
            if(tem2>tem1) {
                tem2= tem2%Math.pow(2,numTbl);
            }
            else if(tem2<=tem1){
                tem2 +=Math.pow(2, numTbl);
            }
            if(tem2>=algorithm.findPower(tem1,numTbl,numTbl)) {
                tem1= algorithm.successor(numTbl, tem1,numTbl, algorithm.network);
            }
            else if(tem2< algorithm.findPower(tem1, 1, numTbl)){
                if(tem2>tem1){
                    tem1 =algorithm.successor(numTbl,tem1,1,algorithm.network);
                }
            }else {
                for(tem4=0; tem4<numTbl-1; tem4++){
                    temp5= algorithm.findPower(tem1,tem4+1, numTbl);
                    temp6= algorithm.findPower(tem1,tem4+2, numTbl);
                    if(tem2>= temp5 && temp6> tem2 && temp5>0 && temp6>0){
                        tem1= algorithm.successor(numTbl,tem1, tem4+1, algorithm.network);
                        break;
                    }
                    if(tem2 <temp6){
                        break;
                    }
                }

            }
            if(svg!=null){
               svg.getElementById(nr+'_' +tem1).setAttribute('opacity', '0.9');
            }
        }
        }
    }
    if(document!=null){
        document.getElementById("tblVal").addEventListener('change', NoOfTblValChnge);
        document.getElementById('startNode').addEventListener('input', startNode);
        document.getElementById("lookup_content").addEventListener('submit', findPath);
    }
    return algorithm;
})(MODULE || {});
