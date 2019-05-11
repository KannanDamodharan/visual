var MODULE = (function(algorithm) {

   algorithm.findPower = function(p, num, tabVal) {
      if(Math.pow(2,tabVal)<= p+Math.pow(2, num-1)){
         return algorithm.successor(tabVal,p,num)+ Math.pow(2,tabVal)
      }
      else if(p+Math.pow(2, num-1)<Math.pow(2,tabVal)){
           return algorithm.successor(tabVal,p,num);
      }
      else {
        return algorithm.successor(tabVal,p,num);
      }
   }

    function findVals(num,k) {
        if(Math.pow(2,tabVal)<= p+Math.pow(2, num-1)){
            return algorithm.successor(num,k,num)+ Math.pow(2,tabVal)
        }
        else if(p+Math.pow(2, num-1)< Math.pow(2,tabVal)){
            return algorithm.successor(tabVal,p,num);
        }
        else{
            return algorithm.successor(tabVal,p,num);
        }
    }
    return algorithm;
})(MODULE || {});
